import { deleteIngredient } from '../../db/helpers/delete-ingredient';
import { getIngredients } from '../../db/helpers//get-ingredients';

export const deleteIngredientRoute = {
  path: '/ingredients/:name',
  method: 'delete',
  handler: async (req, res) => {
    const { name } = req.params;
    await deleteIngredient(name);
    const updatedIngredients = await getIngredients();
    res.status(200);
    res.json(updatedIngredients);
  },
};
