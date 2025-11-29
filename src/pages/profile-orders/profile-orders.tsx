import { ProfileOrdersUI } from '@ui-pages';
import { TOrder, TIngredient } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store/store';
import { getOrders } from '../../services/thunk/orderBurgerThunk';
import { selectOrderBurgerOrders } from '../../services/selector/orderBurgerSelector';
import { selectIngredients } from '../../services/selector/ingredientsSelector';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrderBurgerOrders);
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
