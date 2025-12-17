import ingredientsReducer, { initialState } from './ingredientsSlice';
import { getIngredients } from '../thunk/ingredientsThunk';
import { TIngredient } from '../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

describe('Обработка редьюсером экшенов', () => {
  test('Экшен начала запроса', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action as any);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Экшен успешного выполнения запроса', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action as any);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.items).toEqual(mockIngredients);
  });

  test('Экшен ошибки запроса', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = {
      type: getIngredients.rejected.type,
      payload: errorMessage
    };
    const state = ingredientsReducer(initialState, action as any);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.items).toEqual([]);
  });
});
