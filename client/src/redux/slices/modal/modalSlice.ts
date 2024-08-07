import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  [key: string]: boolean | null
  signUp: boolean;
  login: boolean;
  authRequired: boolean;
  orderSuccess: boolean;
  address: boolean;
};

const initialState: ModalState = {
  signUp: false,
  login: false,
  authRequired: false,
  orderSuccess: false,
  address: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<{ modalType: string }>) {
      state[action.payload.modalType] = true;
    },
    closeModal(state, action: PayloadAction<string>) {
      state[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
