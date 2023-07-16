import { deleteMeal } from '../../db/helpers/delete-meal';
import { getPopulatedMeals } from '../../db/helpers//get-populated-meals';

export const deleteMealRoute = {
  path: '/meals/:id',
  method: 'delete',
  handler: async (req, res) => {
    const { id } = req.params;
    await deleteMeal(id);
    const updatedMeals = await getPopulatedMeals();
    res.status(200);
    res.json(updatedMeals);
  },
};
