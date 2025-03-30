import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Material, MaterialDTO } from '../Models/Collection';
import { RootState } from '../store';

const apiUrl = "http://localhost:5103/api/material";

// טעינת קבצים של תיקייה
export const fetchMaterialsByFolder = createAsyncThunk(
  'material/fetchByFolder',
  async (folderId: number) => {
    const response = await axios.get(`${apiUrl}/folder/${folderId}`);
    return response.data as Material[];
  }
);

// העלאת קובץ
export const uploadFile = createAsyncThunk(
  'material/uploadFile',
  async (fileData: { file: File, folderId: number, userId: number }) => {
    const { file, folderId, userId } = fileData;
    
    // 1. קבלת presigned URL מהשרת
    const presignedResponse = await axios.get(`${apiUrl}/presigned-url`, {
      params: {
        fileName: `${folderId}/${file.name}`,
        contentType: file.type
      }
    });

    const presignedUrl = presignedResponse.data.url;

    // 2. העלאת הקובץ ישירות ל-S3
    await axios.put(presignedUrl, file, {
      headers: { 'Content-Type': file.type }
    });

    // 3. שמירת מידע על הקובץ במסד הנתונים
    const fileInfo: MaterialDTO = {
      name: file.name,
      type: file.type.split('/').pop() || 'file',
      size: file.size,
      collectionID: folderId,
      userId: userId,
      awsUrl: `https://us-east-1.console.aws.amazon.com/s3/object/myteacherbubket.testpnoren.s3.amazonaws.com/${folderId}/${file.name}`,
      s3Key: `${folderId}/${file.name}`,
      createdDate: new Date().toISOString()
    };

    const response = await axios.post(`${apiUrl}/save-file-info`, fileInfo);
    return response.data as Material;
  }
);

// מחיקת קובץ
export const deleteFile = createAsyncThunk(
  'material/deleteFile',
  async (fileId: number) => {
    await axios.delete(`${apiUrl}/${fileId}`);
    return fileId;
  }
);

// הורדת קובץ
export const downloadFile = createAsyncThunk(
  'material/downloadFile',
  async (s3Key: string) => {
    // 1. קבלת ה-Presigned URL להורדה מהשרת
    const response = await axios.get(`${apiUrl}/download-url`, {
      params: {
        fileName: s3Key // השתמש במפתח של הקובץ
      }
    });

    const downloadUrl = response.data.url;
    console.log(downloadUrl);

    // 2. החזרת ה-URL להורדה
    return downloadUrl;
  }
);

// צפייה בקובץ
export const getViewFileUrl = createAsyncThunk(
  'material/getViewFileUrl',
  async (s3Key: string) => {
    // קבלת ה-Presigned URL לצפייה מהשרת
    const response = await axios.get(`${apiUrl}/view-url`, {
      params: {
        fileName: s3Key
      }
    });

    const viewUrl = response.data.url;
    return viewUrl;
  }
);

interface MaterialState {
  materials: { [folderId: number]: Material[] }; // מיפוי של קבצים לפי ID של תיקייה
  currentFiles: Material[];
  loading: boolean;
  uploadProgress: number;
  error: string | null;
}

const initialState: MaterialState = {
  materials: {},
  currentFiles: [],
  loading: false,
  uploadProgress: 0,
  error: null
};

const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    clearUploadProgress: (state) => {
      state.uploadProgress = 0;
    },
    setCurrentFiles: (state, action: PayloadAction<Material[]>) => {
      state.currentFiles = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // טיפול בטעינת קבצים
      .addCase(fetchMaterialsByFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterialsByFolder.fulfilled, (state, action) => {
        const folderId = action.meta.arg;
        state.materials[folderId] = action.payload;
        state.currentFiles = action.payload;
        state.loading = false;
      })
      .addCase(fetchMaterialsByFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'שגיאה בטעינת קבצים';
      })
      
      // טיפול בהעלאת קבצים
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadProgress = 0;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        const newFile = action.payload;
        const folderId = newFile.collectionID;
        
        if (!state.materials[folderId]) {
          state.materials[folderId] = [];
        }
        
        state.materials[folderId].push(newFile);
        
        // עדכון רשימת הקבצים הנוכחית אם רלוונטי
        if (state.currentFiles.some(file => file.collectionID === folderId)) {
          state.currentFiles.push(newFile);
        }
        
        state.loading = false;
        state.uploadProgress = 100;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'שגיאה בהעלאת קובץ';
        state.uploadProgress = 0;
      })
      
      // טיפול במחיקת קבצים
      .addCase(deleteFile.fulfilled, (state, action) => {
        const fileId = action.payload;
        
        // עדכון כל התיקיות
        Object.keys(state.materials).forEach(folderId => {
          state.materials[Number(folderId)] = state.materials[Number(folderId)]
            .filter(file => file.id !== fileId);
        });
        
        // עדכון הקבצים הנוכחיים
        state.currentFiles = state.currentFiles.filter(file => file.id !== fileId);
      });
  }
});

// ייצוא selectors
export const selectMaterialsByFolder = (state: RootState, folderId: number) => 
  state.material.materials[folderId] || [];
export const selectCurrentFiles = (state: RootState) => state.material.currentFiles;
export const selectMaterialLoading = (state: RootState) => state.material.loading;
export const selectUploadProgress = (state: RootState) => state.material.uploadProgress;

export const { setUploadProgress, clearUploadProgress, setCurrentFiles } = materialSlice.actions;
export default materialSlice.reducer;