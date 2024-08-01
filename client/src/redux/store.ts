import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import modalReducer from './slices/modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
