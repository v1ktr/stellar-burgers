import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TAuthResponse,
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { name: string; password: string; email: string }) => {
    const response: TAuthResponse = await registerUserApi(userData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: { password: string; email: string }) => {
    const response: TAuthResponse = await loginUserApi(userData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    userData: Partial<{ email: string; password: string; name: string }>
  ) => {
    const response = await updateUserApi(userData);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return null;
});

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (userData: { email: string }) => {
    const response = await forgotPasswordApi(userData);
    return response;
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (userData: { password: string; token: string }) => {
    const response = await resetPasswordApi(userData);
    return response;
  }
);
