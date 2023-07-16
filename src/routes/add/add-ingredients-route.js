import { getIngredients } from '../../db/helpers/get-ingredients';
import { insertIngredient } from '../../db/helpers/insert-ingredient';

export const addIngredientsRoute = {
  path: '/ingredients',
  method: 'post',
  handler: async (req, res) => {
    const ingredient = req.body;
    await insertIngredient(ingredient);
    const updatedIngredients = await getIngredients();
    res.status(200);
    res.json(updatedIngredients);
  },
};
