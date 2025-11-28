import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store/store';
import {
  selectIngredientsIsLoading,
  selectIngredientsError,
  selectIngredients
} from '../../services/selector/ingredientsSelector';
import { getIngredients } from '../../services/thunk/ingredientsThunk';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIngredientsIsLoading);
  const error = useSelector(selectIngredientsError);
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const { id } = useParams<{ id: string }>();
  const ingredientData =
    ingredients.find((ingredient) => ingredient._id === id) || null;

  useEffect(() => {
    if (id && ingredients.length === 0 && !isLoading && !error) {
      dispatch(getIngredients());
    }
  }, [id, ingredients.length, isLoading, error, dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка во время загрузки: {error}</div>;
  }

  if (!ingredientData && !isLoading) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData!} />;
};
