import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store/store';
import {
  selectIngredientsIsLoading,
  selectIngredientsError,
  selectIngredients
} from '../../services/selector/ingredientsSelector';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';

type IngredientDetailsProps = {
  isModal?: boolean;
};

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  isModal = false
}) => {
  const isLoading = useSelector(selectIngredientsIsLoading);
  const error = useSelector(selectIngredientsError);
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const { id } = useParams<{ id: string }>();
  const ingredientData =
    ingredients.find((ingredient) => ingredient._id === id) || null;

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка во время загрузки: {error}</div>;
  }

  if (!ingredientData && !isLoading) {
    return <div>Ингредиент не найден</div>;
  }

  return (
    <IngredientDetailsUI isModal={isModal} ingredientData={ingredientData!} />
  );
};
