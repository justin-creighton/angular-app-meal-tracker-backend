import { insertMeal, getPopulatedMeals } from '../../db';

export const addMealsRoute = {
  path: '/meals',
  method: 'post',
  handler: async (req, res) => {
    const { date, recipeId } = req.body;
    const newMeal = {
      recipeId,
      plannedDate: date,
    };
    await insertMeal(newMeal);
    const updatedMeals = await getPopulatedMeals();

    res.status(200);
    res.json(updatedMeals);
  },
};
