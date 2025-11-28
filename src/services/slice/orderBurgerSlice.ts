import { createSlice } from '@reduxjs/toolkit';
import {
  getOrders,
  orderBurger,
  getOrderByNumber
} from '../thunk/orderBurgerThunk';
import { TOrder } from '../../utils/types';

interface OrderState {
  isLoading: boolean;
  orders: TOrder[];
  orderDetails: TOrder | null;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  isLoading: false,
  orders: [],
  orderDetails: null,
  orderModalData: null,
  error: null
};

export const orderBurgerSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
      state.error = null;
    },
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      });
  }
});
export const { closeOrderModal, clearOrderDetails } = orderBurgerSlice.actions;
export default orderBurgerSlice.reducer;
