import { addMealsRoute } from './add/add-meals-route';
import { addIngredientsRoute } from './add/add-ingredients-route';
import { deleteMealRoute } from './delete/delete-meal-route';
import { deleteIngredientRoute } from './delete/delete-ingredient-route';
import { getMealsRoute } from './get/get-meals-route';
import { getIngredientsRoute } from './get/get-ingredients-route';
import { getShoppingListRoute } from './get/get-shopping-list-route';
import { searchRecipesRoute } from './search-recipes-route';
export const routes = [
  addMealsRoute,
  addIngredientsRoute,
  deleteMealRoute,
  deleteIngredientRoute,
  getMealsRoute,
  getIngredientsRoute,
  getShoppingListRoute,
  searchRecipesRoute,
];
