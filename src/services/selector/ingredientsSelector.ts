import { RootState } from '../store/store';

export const selectIngredients = (state: RootState) =>
  state.ingredientsReducer.items;
export const selectIngredientsIsLoading = (state: RootState) =>
  state.ingredientsReducer.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredientsReducer.error;
