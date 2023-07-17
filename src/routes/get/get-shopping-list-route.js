import { getIngredients, getPopulatedMeals } from '../../db';

const emptyIngredients = {
  count: 0,
  pounds: 0,
  cups: 0,
  tablespoons: 0,
  teaspoons: 0,
};

const condenseIngredients = (ingredients) => {
  return ingredients.reduce((acc, i) => ({
    ...acc,
    [i.name.toLowerCase()]: acc[i.name.toLowerCase()]
      ? {
          ...acc[i.name.toLowerCase()],
          [i.units]: acc[i.name.toLowerCase()] + i.amount,
        }
      : { ...emptyIngredients, [i.units]: i.amount },
  }));
};

const getMissingIngredients = (requiredCondensed, ownedCondensed) => {
  return Object.keys(requiredCondensed).reduce(
    (acc, name) => ({
      ...acc,
      [name]: Object.keys(requiredCondensed[name]).reduce(
        (unitAmounts, unit) => ({
          ...unitAmounts,
          [unit]: Math.max(
            requiredCondensed[name][unit] -
              ((ownedCondensed[name] || {})[unit] || 0),
            0,
          ),
        }),
        {},
      ),
    }),
    {},
  );
};

const getShoppingList = (missingIngredients) => {
  return Object.keys(missingIngredients).map(
    (name) =>
      `${name}: ${Object.keys(missingIngredients[name])
        .filter((unit) => missingIngredients[name][unit] > 0)
        .map((unit) => `${missingIngredients[name][unit]} ${unit}`)
        .join('+')}`,
  );
};

export const getShoppingListRoute = {
  path: '/shopping-list',
  method: 'get',
  handler: async (req, res) => {
    const ingredients = await getIngredients();
    const populatedMeals = await getPopulatedMeals();

    const futureMeals = populatedMeals.filter((meal) => {
      const mealDate = new Date(meal.plannedDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return mealDate > yesterday;
    });

    const requireIngredients = futureMeals.flatMap(
      (meal) => meal.recipe.ingredients,
    );
    const condensedMealIngredients = condenseIngredients(requireIngredients);
    const condensedUserIngredients = condenseIngredients(ingredients);

    const missingIngredients = getMissingIngredients(
      condensedMealIngredients,
      condensedUserIngredients,
    );

    const shoppingList = getShoppingList(missingIngredients);

    res.status(200);
    res.json(shoppingList);
  },
};
