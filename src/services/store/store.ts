import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from '../slice/ingredientsSlice';
import { feedsSlice } from '../slice/feedsSlice';
import { userSlice } from '../slice/userSlice';
import { orderBurgerSlice } from '../slice/orderBurgerSlice';
import { burgerConstructorSlice } from '../slice/burgerConstructorSlice';

const rootReducer = combineSlices({
  ingredientsReducer: ingredientsSlice.reducer,
  feedsReducer: feedsSlice.reducer,
  orderBurgerReducer: orderBurgerSlice.reducer,
  userReducer: userSlice.reducer,
  burgerConstructorReducer: burgerConstructorSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
