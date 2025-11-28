import { RootState } from '../store/store';

export const selectFeeds = (state: RootState) => state.feedsReducer.ordersData;
export const selectFeedsLoading = (state: RootState) =>
  state.feedsReducer.isLoading;
export const selectFeedsError = (state: RootState) => state.feedsReducer.error;
