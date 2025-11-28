import { RootState } from '../store/store';

export const selectOrderBurgerIsLoading = (state: RootState) =>
  state.orderBurgerReducer.isLoading;
export const selectOrderBurgerOrders = (state: RootState) =>
  state.orderBurgerReducer.orders;
export const selectOrderBurgerDetails = (state: RootState) =>
  state.orderBurgerReducer.orderDetails;
export const selectOrderBurgerModalData = (state: RootState) =>
  state.orderBurgerReducer.orderModalData;
export const selectOrderBurgerError = (state: RootState) =>
  state.orderBurgerReducer.error;
