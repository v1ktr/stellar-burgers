import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '../../utils/types';
import { getFeeds } from '../thunk/feedsThunk';

export interface FeedsState {
  ordersData: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  ordersData: null,
  isLoading: false,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        getFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.ordersData = action.payload;
          state.isLoading = false;
        }
      );
  }
});

export default feedsSlice.reducer;
