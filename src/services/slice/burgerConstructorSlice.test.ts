import constructorReducer, {
  initialState,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

const Bun: TIngredient = {
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
};

const Bun2: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const Ingredient1: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

const Ingredient2: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  id: '643d69a5c3f7b9001cfa0942',
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
};

describe('Работа редьюсера конструктора', () => {
  test('Добавление булки', () => {
    const newState = constructorReducer(initialState, addBun(Bun));
    expect(newState.bun).toEqual(Bun);
  });

  test('Замена булки', () => {
    const stateWithBun = constructorReducer(initialState, addBun(Bun));
    const newState = constructorReducer(stateWithBun, addBun(Bun2));
    expect(newState.bun).toEqual(Bun2);
  });

  test('Добавление ингридиента', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(Ingredient1)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual(Ingredient1);
  });

  test('Удаление ингридиента', () => {
    const stateWithIng = {
      ...initialState,
      ingredients: [Ingredient1, Ingredient2]
    };
    const newState = constructorReducer(
      stateWithIng,
      removeIngredient('643d69a5c3f7b9001cfa093e')
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].id).toBe('643d69a5c3f7b9001cfa0942');
  });

  test('Перенос доступного для переноса ингридента выше', () => {
    const stateWithIng = {
      ...initialState,
      ingredients: [Ingredient1, Ingredient2]
    };
    const newState = constructorReducer(
      stateWithIng,
      moveIngredient({ index: 1, direction: 'up' })
    );
    expect(newState.ingredients[0]).toEqual(Ingredient2);
    expect(newState.ingredients[1]).toEqual(Ingredient1);
  });

  test('Перенос недоступного для переноса ингридента выше', () => {
    const stateWithIng = {
      ...initialState,
      ingredients: [Ingredient1, Ingredient2]
    };
    const newState = constructorReducer(
      stateWithIng,
      moveIngredient({ index: 0, direction: 'up' })
    );
    expect(newState.ingredients[0]).toEqual(Ingredient1);
    expect(newState.ingredients[1]).toEqual(Ingredient2);
  });

  test('Перенос доступного для переноса ингридента ниже', () => {
    const stateWithIng = {
      ...initialState,
      ingredients: [Ingredient1, Ingredient2]
    };
    const newState = constructorReducer(
      stateWithIng,
      moveIngredient({ index: 0, direction: 'down' })
    );
    expect(newState.ingredients[0]).toEqual(Ingredient2);
    expect(newState.ingredients[1]).toEqual(Ingredient1);
  });

  test('Перенос недоступного для переноса ингридента ниже', () => {
    const stateWithIng = {
      ...initialState,
      ingredients: [Ingredient1, Ingredient2]
    };
    const newState = constructorReducer(
      stateWithIng,
      moveIngredient({ index: 1, direction: 'down' })
    );
    expect(newState.ingredients[0]).toEqual(Ingredient1);
    expect(newState.ingredients[1]).toEqual(Ingredient2);
  });

  test('Очистка конструктора', () => {
    const fullState = {
      bun: Bun,
      ingredients: [Ingredient1, Ingredient2]
    };
    const newState = constructorReducer(fullState, clearConstructor());
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
