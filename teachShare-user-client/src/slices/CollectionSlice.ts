import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import type { Collection, CreateCollectionDto } from "../Models/Collection"
import type { RootState } from "../store"

const apiUrl = "http://localhost:5103/api/collection"

// יצירת Async Thunk לטעינת תיקיות שורש
export const fetchRootFolders = createAsyncThunk("collection/fetchRootFolders", async (userId: number) => {
  const response = await axios.get(`${apiUrl}/root/${userId}`)
  return response.data as Collection[]
})

// יצירת Async Thunk לטעינת תתי-תיקיות
export const fetchSubFolders = createAsyncThunk("collection/fetchSubFolders", async (parentId: number) => {
  const response = await axios.get(`${apiUrl}/sub/${parentId}`)
  return { parentId, subFolders: response.data as Collection[] }
})

// יצירת Async Thunk לטעינת כל התיקיות (לצורך תאימות לאחור)
export const fetchFolders = createAsyncThunk("collection/fetchFolders", async (_, { dispatch, getState }) => {
  const state = getState() as RootState
  const userId = state.auth.user?.id || 8 // דיפולט למשתמש 8 אם אין זיהוי
  const response = await dispatch(fetchRootFolders(userId))
  return response.payload as Collection[]
})

// יצירת Async Thunk ליצירת תיקייה חדשה
export const createFolder = createAsyncThunk("collection/createFolder", async (folderData: CreateCollectionDto) => {
  const response = await axios.post(`${apiUrl}`, folderData)
  return response.data as Collection
})

// יצירת Async Thunk לעדכון תיקייה
export interface UpdateFolderDto {
  id: number
  name: string
  description?: string
  iconType?: number
}

export const updateFolder = createAsyncThunk("collection/updateFolder", async (folderData: UpdateFolderDto) => {
  const response = await axios.put(`${apiUrl}/${folderData.id}`, folderData)
  return response.data as Collection
})

// חדש: יצירת Async Thunk למחיקת תיקייה
export const deleteFolder = createAsyncThunk("collection/deleteFolder", async (folderId: number) => {
  const response = await axios.put(`${apiUrl}/delete/${folderId}`)
  return response.data as Collection
})

interface CollectionState {
  rootFolders: Collection[]
  currentFolder: Collection | null
  breadcrumbs: Collection[]
  folderCache: { [key: number]: Collection[] } // מטמון לתיקיות שנטענו
  loading: boolean
  error: string | null
}

const initialState: CollectionState = {
  rootFolders: [],
  currentFolder: null,
  breadcrumbs: [],
  folderCache: {},
  loading: false,
  error: null,
}

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    navigateToFolder: (state, action: PayloadAction<Collection>) => {
      state.currentFolder = action.payload
      state.breadcrumbs.push(action.payload)
    },
    navigateBack: (state) => {
      if (state.breadcrumbs.length > 0) {
        state.breadcrumbs.pop()
        state.currentFolder = state.breadcrumbs.length > 0 ? state.breadcrumbs[state.breadcrumbs.length - 1] : null
      }
    },
    navigateToRoot: (state) => {
      state.currentFolder = null
      state.breadcrumbs = []
    },
    updateFolderStructure: (state, action: PayloadAction<Collection[]>) => {
      // עדכון מבנה התיקיות (למשל לאחר מחיקה או שינוי)
      const updatedStructure = action.payload
      state.rootFolders = updatedStructure
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRootFolders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRootFolders.fulfilled, (state, action) => {
        state.rootFolders = action.payload
        state.loading = false
      })
      .addCase(fetchRootFolders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "שגיאה בטעינת תיקיות שורש"
      })
      .addCase(fetchSubFolders.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSubFolders.fulfilled, (state, action) => {
        const { parentId, subFolders } = action.payload

        // שמירת תתי-התיקיות במטמון
        state.folderCache[parentId] = subFolders

        // עדכון התיקייה הנוכחית אם אנחנו נמצאים בה
        if (state.currentFolder && state.currentFolder.id === parentId) {
          state.currentFolder = {
            ...state.currentFolder,
            subCollections: subFolders,
          }
        }

        // עדכון תיקיות שורש אם הפריט הוא תיקיית שורש
        state.rootFolders = state.rootFolders.map((folder) =>
          folder.id === parentId ? { ...folder, subCollections: subFolders } : folder,
        )

        // עדכון פירורי הלחם אם התיקייה נמצאת בהם
        state.breadcrumbs = state.breadcrumbs.map((folder) =>
          folder.id === parentId ? { ...folder, subCollections: subFolders } : folder,
        )

        state.loading = false
      })
      .addCase(fetchSubFolders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "שגיאה בטעינת תתי-תיקיות"
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        const newFolder = action.payload
        if (newFolder.parentCollectionId) {
          // הוספת תת-תיקייה לתיקייה הנוכחית
          if (state.currentFolder && state.currentFolder.id === newFolder.parentCollectionId) {
            if (!state.currentFolder.subCollections) {
              state.currentFolder.subCollections = []
            }
            state.currentFolder.subCollections.push(newFolder)
          }

          // עדכון המטמון
          if (state.folderCache[newFolder.parentCollectionId]) {
            state.folderCache[newFolder.parentCollectionId].push(newFolder)
          }

          // עדכון תיקיות שורש אם התיקייה ההורה היא תיקיית שורש
          state.rootFolders = state.rootFolders.map((folder) => {
            if (folder.id === newFolder.parentCollectionId) {
              if (!folder.subCollections) {
                folder.subCollections = []
              }
              return {
                ...folder,
                subCollections: [...folder.subCollections, newFolder],
              }
            }
            return folder
          })

          // עדכון פירורי הלחם אם התיקייה ההורה נמצאת בהם
          state.breadcrumbs = state.breadcrumbs.map((folder) => {
            if (folder.id === newFolder.parentCollectionId) {
              if (!folder.subCollections) {
                folder.subCollections = []
              }
              return {
                ...folder,
                subCollections: [...folder.subCollections, newFolder],
              }
            }
            return folder
          })
        } else {
          // הוספת תיקייה לשורש
          state.rootFolders.push(newFolder)
        }
      })
      .addCase(updateFolder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateFolder.fulfilled, (state, action) => {
        const updatedFolder = action.payload

        // פונקציה עזר לעדכון תיקייה ברשימה
        const updateFolderInList = (folders: Collection[] | undefined): boolean => {
          if (!folders) return false

          const index = folders.findIndex((folder) => folder.id === updatedFolder.id)
          if (index !== -1) {
            folders[index] = { ...folders[index], ...updatedFolder }
            return true
          }
          return false
        }

        // עדכון בתיקיות השורש
        updateFolderInList(state.rootFolders)

        // עדכון בתיקייה הנוכחית אם היא התיקייה שעודכנה
        if (state.currentFolder && state.currentFolder.id === updatedFolder.id) {
          state.currentFolder = { ...state.currentFolder, ...updatedFolder }
        }

        // עדכון בתתי-התיקיות של התיקייה הנוכחית
        if (state.currentFolder && state.currentFolder.subCollections) {
          updateFolderInList(state.currentFolder.subCollections)
        }

        // עדכון בפירורי הלחם
        state.breadcrumbs = state.breadcrumbs.map((folder) =>
          folder.id === updatedFolder.id ? { ...folder, ...updatedFolder } : folder,
        )

        // עדכון במטמון
        Object.keys(state.folderCache).forEach((key) => {
          updateFolderInList(state.folderCache[Number.parseInt(key)])
        })

        state.loading = false
      })
      .addCase(updateFolder.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "שגיאה בעדכון התיקייה"
      })
      // חדש: טיפול במחיקת תיקייה
      .addCase(deleteFolder.fulfilled, (state, action) => {
        const deletedFolder = action.payload

        // עדכון תיקיות שורש אם התיקייה שנמחקה היא תיקיית שורש
        state.rootFolders = state.rootFolders.filter((folder) => folder.id !== deletedFolder.id)

        // עדכון תיקיות במטמון
        Object.keys(state.folderCache).forEach((parentId) => {
          state.folderCache[+parentId] = state.folderCache[+parentId].filter((folder) => folder.id !== deletedFolder.id)
        })

        // עדכון התיקייה הנוכחית אם צריך
        if (state.currentFolder && state.currentFolder.id === deletedFolder.id) {
          // אם התיקייה הנוכחית היא זו שנמחקה, נחזור לתיקייה הקודמת
          if (state.breadcrumbs.length > 1) {
            state.currentFolder = state.breadcrumbs[state.breadcrumbs.length - 2]
            state.breadcrumbs.pop()
          } else {
            state.currentFolder = null
            state.breadcrumbs = []
          }
        }

        // עדכון תתי-תיקיות בתיקייה הנוכחית אם צריך
        if (state.currentFolder && state.currentFolder.subCollections) {
          state.currentFolder.subCollections = state.currentFolder.subCollections.filter(
            (folder) => folder.id !== deletedFolder.id,
          )
        }

        // עדכון פירורי לחם אם צריך
        const breadcrumbIndex = state.breadcrumbs.findIndex((folder) => folder.id === deletedFolder.id)
        if (breadcrumbIndex !== -1) {
          state.breadcrumbs = state.breadcrumbs.slice(0, breadcrumbIndex)
          if (breadcrumbIndex > 0) {
            state.currentFolder = state.breadcrumbs[breadcrumbIndex - 1]
          } else {
            state.currentFolder = null
          }
        }
      })
  },
})

// ייצוא selectors
export const selectRootFolders = (state: RootState) => state.collection.rootFolders
export const selectCurrentFolder = (state: RootState) => state.collection.currentFolder
export const selectBreadcrumbs = (state: RootState) => state.collection.breadcrumbs
export const selectLoading = (state: RootState) => state.collection.loading
export const selectFolderCache = (state: RootState) => state.collection.folderCache

export const { navigateToFolder, navigateBack, navigateToRoot, updateFolderStructure } = collectionSlice.actions
export default collectionSlice.reducer
