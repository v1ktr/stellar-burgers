import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store/store';
import {
  selectFeeds,
  selectFeedsLoading,
  selectFeedsError
} from '../../services/selector/feedsSelector';
import { getFeeds } from '../../services/thunk/feedsThunk';
import { TIngredient } from '@utils-types';
import { selectIngredients } from '../../services/selector/ingredientsSelector';
import { getIngredients } from '../../services/thunk/ingredientsThunk';

export const Feed: FC = () => {
  const feedsData = useSelector(selectFeeds);
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const isLoading = useSelector(selectFeedsLoading);
  const error = useSelector(selectFeedsError);
  const orders: TOrder[] = feedsData?.orders || [];
  const dispatch = useDispatch();
  useEffect(() => {
    if (!feedsData) {
      dispatch(getFeeds());
    }
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, feedsData]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка во время загрузки: {error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
