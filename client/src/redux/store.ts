import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import modalReducer from './slices/modal/modalSlice';
import formatVinylReducer from './slices/formatVinyl/formatVinylSlice';
import orderReducer from './slices/order/orderSlice';
import trackListReducer from './slices/trackList/trackListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    format: formatVinylReducer,
    order: orderReducer,
    trackList: trackListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
