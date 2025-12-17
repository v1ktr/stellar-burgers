import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '../thunk/ingredientsThunk';
import { TIngredient } from '../../utils/types';

export interface IngredientsState {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.items = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default ingredientsSlice.reducer;
