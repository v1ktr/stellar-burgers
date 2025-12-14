import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store/store';
import { selectUser } from '../../services/selector/userSelector';
import { selectBurgerConstructorData } from '../../services/selector/burgerConstructorSelector';
import {
  selectOrderBurgerIsLoading,
  selectOrderBurgerModalData
} from '../../services/selector/orderBurgerSelector';
import { closeOrderModal } from '../../services/slice/orderBurgerSlice';
import { clearConstructor } from '../../services/slice/burgerConstructorSlice';
import { orderBurger } from '../../services/thunk/orderBurgerThunk';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const constructorItems = useSelector(selectBurgerConstructorData);
  const orderRequest = useSelector(selectOrderBurgerIsLoading);
  const orderModalData = useSelector(selectOrderBurgerModalData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = constructorItems.ingredients.map((i) => i._id);
    const ingredients = [
      constructorItems.bun._id,
      ...ingredientIds,
      constructorItems.bun._id
    ];
    dispatch(orderBurger(ingredients))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };
  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
