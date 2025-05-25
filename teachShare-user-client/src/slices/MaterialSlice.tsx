import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { Material, MaterialDTO } from "../Models/Collection"
import type { RootState } from "../store"

const apiUrl = "http://localhost:5103/api/material"

// --- Async thunks ---

export const fetchMaterialsByFolder = createAsyncThunk("material/fetchByFolder", async (folderId: number) => {
  const response = await axios.get(`${apiUrl}/folder/${folderId}`)
  return response.data as Material[]
})

export const uploadFile = createAsyncThunk(
  "material/uploadFile",
  async (fileData: { file: File; folderId: number; userId: number }) => {
    const { file, folderId, userId } = fileData

    const presignedResponse = await axios.get(`${apiUrl}/presigned-url`, {
      params: {
        fileName: `${folderId}/${file.name}`,
        contentType: file.type,
      },
    })

    const presignedUrl = presignedResponse.data.url

    await axios.put(presignedUrl, file, {
      headers: { "Content-Type": file.type },
    })

    const fileInfo: MaterialDTO = {
      name: file.name,
      type: file.type.split("/").pop() || "file",
      size: file.size,
      collectionID: folderId,
      userId: userId,
      // awsUrl: `https://us-east-1.console.aws.amazon.com/s3/object/myteacherbubket.testpnoren.s3.amazonaws.com/${folderId}/${file.name}`,
      s3Key: `${folderId}/${file.name}`,
      createdDate: new Date().toISOString(),
      isPublic: false,
    }

    const response = await axios.post(`${apiUrl}/save-file-info`, fileInfo)
    return response.data as Material
  },
)

export const deleteFile = createAsyncThunk("material/deleteFile", async (fileId: number) => {
  await axios.delete(`${apiUrl}/${fileId}`)
  return fileId
})

// הוספת thunk למחיקה רכה
export const softDeleteFile = createAsyncThunk("material/softDeleteFile", async (fileId: number) => {
  const response = await axios.put(`${apiUrl}/delete/${fileId}`)
  return response.data as Material // API מחזיר את הקובץ המעודכן
})

// הוספת thunk לשחזור קובץ
export const restoreFile = createAsyncThunk("material/restoreFile", async (fileId: number) => {
  const response = await axios.put(`${apiUrl}/restore/${fileId}`)
  return response.data as Material
})

export const downloadFile = createAsyncThunk("material/downloadFile", async (s3Key: string) => {
  const response = await axios.get(`${apiUrl}/download-url`, {
    params: { fileName: s3Key },
  })
  return response.data.url
})

export const getViewFileUrl = createAsyncThunk("material/getViewFileUrl", async (s3Key: string) => {
  const response = await axios.get(`${apiUrl}/view-url`, {
    params: { fileName: s3Key },
  })
  return response.data.url
})

export const shareFile = createAsyncThunk(
  "material/shareFile",
  async (shareData: { fileId: number; isPublic: boolean; categoryId?: number }) => {
    const { fileId, isPublic, categoryId } = shareData
    const response = await axios.put(`${apiUrl}/share/${fileId}`, {
      isPublic,
      categoryId,
    })
    return response.data as Material
  },
)

// הוספת thunk לשינוי שם קובץ
export const renameFile = createAsyncThunk(
  "material/renameFile",
  async (renameData: { id: number; newName: string }) => {
    const { id, newName } = renameData
    const response = await axios.put(`${apiUrl}/rename/${id}`, JSON.stringify(newName), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data as Material
  },
)

export const fetchMaterialsByCategory = createAsyncThunk("material/fetchByCategory", async (categoryId: number) => {
  const response = await axios.get(`${apiUrl}/material/by-category/${categoryId}`)
  return response.data as Material[]
})

// חדש: Thunk למחיקת כל הקבצים בתיקייה (לוגית)
export const deleteFilesByFolder = createAsyncThunk("material/deleteFilesByFolder", async (folderId: number) => {
  // הקריאה לשרת מתבצעת בתוך deleteFolder בקולקשן סלייס
  // כאן אנחנו רק מעדכנים את הסטייט ברידאקס
  return folderId
})

// --- Slice ---

interface MaterialState {
  materials: { [folderId: number]: Material[] }
  currentFiles: Material[]
  loading: boolean
  uploadProgress: number
  error: string | null
}

const initialState: MaterialState = {
  materials: {},
  currentFiles: [],
  loading: false,
  uploadProgress: 0,
  error: null,
}

const materialSlice = createSlice({
  name: "material",
  initialState,
  reducers: {
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload
    },
    clearUploadProgress: (state) => {
      state.uploadProgress = 0
    },
    setCurrentFiles: (state, action: PayloadAction<Material[]>) => {
      state.currentFiles = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterialsByFolder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMaterialsByFolder.fulfilled, (state, action) => {
        const folderId = action.meta.arg
        state.materials[folderId] = action.payload
        state.currentFiles = action.payload
        state.loading = false
      })
      .addCase(fetchMaterialsByFolder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "שגיאה בטעינת קבצים"
      })

      .addCase(uploadFile.pending, (state) => {
        state.loading = true
        state.error = null
        state.uploadProgress = 0
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        const newFile = action.payload
        const folderId = newFile.collectionID

        if (!state.materials[folderId]) {
          state.materials[folderId] = []
        }

        state.materials[folderId].push(newFile)

        if (state.currentFiles.some((file) => file.collectionID === folderId)) {
          state.currentFiles.push(newFile)
        }

        state.loading = false
        state.uploadProgress = 100
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "שגיאה בהעלאת קובץ"
        state.uploadProgress = 0
      })

      .addCase(deleteFile.fulfilled, (state, action) => {
        const fileId = action.payload
        Object.keys(state.materials).forEach((folderId) => {
          state.materials[+folderId] = state.materials[+folderId].filter((file) => file.id !== fileId)
        })
        state.currentFiles = state.currentFiles.filter((file) => file.id !== fileId)
      })

      .addCase(shareFile.fulfilled, (state, action) => {
        const updatedFile = action.payload

        Object.keys(state.materials).forEach((folderId) => {
          const folderIdNum = +folderId
          const fileIndex = state.materials[folderIdNum].findIndex((file) => file.id === updatedFile.id)
          if (fileIndex !== -1) {
            state.materials[folderIdNum][fileIndex] = updatedFile
          }
        })

        const currentFileIndex = state.currentFiles.findIndex((file) => file.id === updatedFile.id)
        if (currentFileIndex !== -1) {
          state.currentFiles[currentFileIndex] = updatedFile
        }
      })

      // הוספת טיפול בשינוי שם קובץ
      .addCase(renameFile.fulfilled, (state, action) => {
        const updatedFile = action.payload

        Object.keys(state.materials).forEach((folderId) => {
          const folderIdNum = +folderId
          const fileIndex = state.materials[folderIdNum].findIndex((file) => file.id === updatedFile.id)
          if (fileIndex !== -1) {
            state.materials[folderIdNum][fileIndex] = updatedFile
          }
        })

        const currentFileIndex = state.currentFiles.findIndex((file) => file.id === updatedFile.id)
        if (currentFileIndex !== -1) {
          state.currentFiles[currentFileIndex] = updatedFile
        }
      })

      // הוספת טיפול במחיקה רכה
      .addCase(softDeleteFile.fulfilled, (state, action) => {
        const updatedFile = action.payload

        // עדכון הקובץ בכל המקומות הרלוונטיים
        Object.keys(state.materials).forEach((folderId) => {
          const folderIdNum = +folderId
          const fileIndex = state.materials[folderIdNum].findIndex((file) => file.id === updatedFile.id)
          if (fileIndex !== -1) {
            state.materials[folderIdNum][fileIndex] = updatedFile
          }
        })

        // עדכון ברשימת הקבצים הנוכחית
        const currentFileIndex = state.currentFiles.findIndex((file) => file.id === updatedFile.id)
        if (currentFileIndex !== -1) {
          state.currentFiles[currentFileIndex] = updatedFile
        }
      })

      // הוספת טיפול בשחזור קובץ
      .addCase(restoreFile.fulfilled, (state, action) => {
        const updatedFile = action.payload

        // עדכון הקובץ בכל המקומות הרלוונטיים
        Object.keys(state.materials).forEach((folderId) => {
          const folderIdNum = +folderId
          const fileIndex = state.materials[folderIdNum].findIndex((file) => file.id === updatedFile.id)
          if (fileIndex !== -1) {
            state.materials[folderIdNum][fileIndex] = updatedFile
          }
        })

        // עדכון ברשימת הקבצים הנוכחית
        const currentFileIndex = state.currentFiles.findIndex((file) => file.id === updatedFile.id)
        if (currentFileIndex !== -1) {
          state.currentFiles[currentFileIndex] = updatedFile
        }
      })

      // חדש: טיפול במחיקת קבצים של תיקייה
      .addCase(deleteFilesByFolder.fulfilled, (state, action) => {
        const folderId = action.payload

        // מחיקת הקבצים מהתיקייה שנמחקה
        if (state.materials[folderId]) {
          delete state.materials[folderId]
        }

        // מחיקת הקבצים מהתצוגה הנוכחית אם הם שייכים לתיקייה שנמחקה
        state.currentFiles = state.currentFiles.filter((file) => file.collectionID !== folderId)
      })
  },
})

// --- Selectors ---
export const selectMaterialsByFolder = (state: RootState, folderId: number) => state.material.materials[folderId] || []
export const selectCurrentFiles = (state: RootState) => state.material.currentFiles
export const selectMaterialLoading = (state: RootState) => state.material.loading
export const selectUploadProgress = (state: RootState) => state.material.uploadProgress

// --- Actions + Reducer export ---
export const { setUploadProgress, clearUploadProgress, setCurrentFiles } = materialSlice.actions
export default materialSlice.reducer
