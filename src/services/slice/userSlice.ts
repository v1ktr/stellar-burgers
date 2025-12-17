import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  logoutUser
} from '../thunk/userThunk';

export interface UserState {
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

export const initialState: UserState = {
  isAuthChecked: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    hideError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.error = action.error.message || 'Ошибка регистрации';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка смены пароля';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка смены пароля';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error =
          action.error.message || 'Не удалось получить данные пользователя';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось обновить данные';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка выхода';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = null;
        state.error = null;
      });
  }
});

export const { isAuthChecked, hideError } = userSlice.actions;

export default userSlice.reducer;
