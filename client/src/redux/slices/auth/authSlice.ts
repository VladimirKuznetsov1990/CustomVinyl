import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserStateType } from '../../../types/userTypes';
import { checkUserThunk, loginThunk, logoutThunk, signUpThunk } from './authThunks';

type UserState = {
  accessToken: string;
  userStatus: UserStateType;
};

const initialState: UserState = { accessToken: '', userStatus: { status: 'fetching' }};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<UserState['accessToken']>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userStatus = { ...action.payload.user, status: 'logged' };
      })
      .addCase(signUpThunk.rejected, (state) => {
        state.accessToken = '';
        state.userStatus = { status: 'guest' };
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userStatus = { ...action.payload.user, status: 'logged' };
      })
      .addCase(loginThunk.rejected, (state) => {
        state.accessToken = '';
        state.userStatus = { status: 'guest' };
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = '';
        state.userStatus = { status: 'guest' };
      })
      .addCase(checkUserThunk.pending, (state) => {
        state.userStatus = { status: 'fetching' };
      })
      .addCase(checkUserThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userStatus = { ...action.payload.user, status: 'logged' };
      })
      .addCase(checkUserThunk.rejected, (state) => {
        state.accessToken = '';
        state.userStatus = { status: 'guest' };
      });
  },
});

export default authSlice.reducer;
