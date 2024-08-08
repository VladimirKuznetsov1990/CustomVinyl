import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../../services/authService';
import type { UserLoginType, UserSignUpType } from '../../../types/userTypes';
import type { ApiError } from '../../../types/errorTypes';

export const signUpThunk = createAsyncThunk('auth/signUp', async (formData: UserSignUpType, { rejectWithValue }) => {
  try {
    const data = await authService.signUp(formData);
    return data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(apiError.response.data.message || 'Registration failed');
  }
});

export const loginThunk = createAsyncThunk('auth/login', async (formData: UserLoginType, { rejectWithValue }) => {
  try {
    const data = await authService.login(formData);
    return data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(apiError.response.data.message || 'Login failed: Invalid email or password');
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  const data = await authService.logout();
  return data;
});

export const checkUserThunk = createAsyncThunk('auth/checkUser', async () => {
  const data = await authService.check();
  return data;
});
