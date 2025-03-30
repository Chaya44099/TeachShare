// store.ts (מתוקן)
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import collectionReducer from './slices/CollectionSlice';

import materialReducer from './slices/MaterialSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
    material: materialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;