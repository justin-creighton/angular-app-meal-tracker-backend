import { getPopulatedMeals } from '../../db/helpers/get-populated-meals';

export const getMealsRoute = {
  path: '/meals',
  method: 'get',
  handler: async (req, res) => {
    const meals = await getPopulatedMeals();
    res.status(200);
    res.json(meals);
  },
};
