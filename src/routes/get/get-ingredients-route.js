import { getIngredients } from '../../db/helpers/get-ingredients';

export const getIngredientsRoute = {
  path: '/ingredients',
  method: 'get',
  handler: async (req, res) => {
    const ingredients = await getIngredients();
    res.status(200);
    res.json(ingredients);
  },
};
