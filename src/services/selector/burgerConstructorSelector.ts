import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export const selectBurgerConstructorData = createSelector(
  [(state: RootState) => state.burgerConstructorReducer],
  (constructorState) => ({
    bun: constructorState.bun || null,
    ingredients: constructorState.ingredients || []
  })
);
