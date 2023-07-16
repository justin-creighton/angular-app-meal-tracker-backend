import { getRecipes } from './get-recipes';
import { getMeals } from './get-meals';

export const getPopulatedMeals = async () => {
  const meals = await getMeals();
  const recipes = await getRecipes();

  const populatedMeals = meals.map((meal) => {
    return {
      ...meal,
      recipe: recipes.find((recipe) => recipe.id === meal.recipeId),
    };
  });

  return populatedMeals;
};
