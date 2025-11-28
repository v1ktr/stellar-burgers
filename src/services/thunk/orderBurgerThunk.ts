import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const getOrders = createAsyncThunk<TOrder[]>(
  'order/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка при получении заказов'
      );
    }
  }
);

export const orderBurger = createAsyncThunk<TOrder, string[]>(
  'order/orderBurger',
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      if (response?.success) {
        return response.order;
      }
      return rejectWithValue('Не удалось создать заказ');
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка при создании заказа'
      );
    }
  }
);

export const getOrderByNumber = createAsyncThunk<TOrder, number>(
  'order/getOrderByNumber',
  async (number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      const order = response.orders[0];
      return order;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка при получении заказа'
      );
    }
  }
);
