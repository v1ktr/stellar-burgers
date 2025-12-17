import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from '../slice/ingredientsSlice';
import { initialState as feedInitialState } from '../slice/feedsSlice';
import { initialState as orderInitialState } from '../slice/orderBurgerSlice';
import { initialState as userInitialState } from '../slice/userSlice';
import { initialState as burgerConstructorInitialState } from '../slice/burgerConstructorSlice';

describe('Проверка правильной настройки и работы rootReducer', () => {
  test('Возврат корректного начального состояния хранилища', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredientsReducer: ingredientsInitialState,
      feedsReducer: feedInitialState,
      orderBurgerReducer: orderInitialState,
      userReducer: userInitialState,
      burgerConstructorReducer: burgerConstructorInitialState
    });
  });
});
