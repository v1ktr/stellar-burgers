import { RootState } from '../store/store';

export const selectUserIsAuthChecked = (state: RootState) =>
  state.userReducer.isAuthChecked;
export const selectUserIsLoading = (state: RootState) =>
  state.userReducer.isLoading;
export const selectUser = (state: RootState) => state.userReducer.user;
export const selectUserError = (state: RootState) => state.userReducer.error;
