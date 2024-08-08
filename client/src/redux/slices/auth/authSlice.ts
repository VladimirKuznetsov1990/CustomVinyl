import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserStateType } from '../../../types/userTypes';
import { checkUserThunk, loginThunk, logoutThunk, signUpThunk } from './authThunks';

type UserState = {
  accessToken: string;
  userStatus: UserStateType;
  error: string | null;
};

const initialState: UserState = { accessToken: '', userStatus: { status: 'fetching' }, error: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<UserState['accessToken']>) => {
      state.accessToken = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userStatus = { ...action.payload.user, status: 'logged' };
        state.error = null;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.accessToken = '';
        state.userStatus = { status: 'guest' };
        state.error = action.payload as string || 'Registration failed';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userStatus = { ...action.payload.user, status: 'logged' };
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.accessToken = '';
        state.userStatus = { status: 'guest' };
        state.error = action.payload as string || 'Login failed: Invalid email or password';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = '';
        state.userStatus = { status: 'guest' };
        state.error = null;
      })
      .addCase(checkUserThunk.pending, (state) => {
        state.userStatus = { status: 'fetching' };
        state.error = null;
      })
      .addCase(checkUserThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userStatus = { ...action.payload.user, status: 'logged' };
        state.error = null;
      })
      .addCase(checkUserThunk.rejected, (state) => {
        state.accessToken = '';
        state.userStatus = { status: 'guest' };
        state.error = null;
      });
  },
});

export const { setAccessToken, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
