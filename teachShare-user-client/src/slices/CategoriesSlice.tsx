import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

const apiUrl = "http://localhost:5103/api/category";

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get(apiUrl);
    return response.data as Array<{ id: number; name: string }>;
  }
);

interface CategoriesState {
  categories: Array<{ id: number; name: string }>;
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Array<{ id: number; name: string }>>) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'שגיאה בטעינת קטגוריות';
      });
  },
});

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.loading;

export default categoriesSlice.reducer;
