import { db } from '../index';

export const insertIngredient = async (ingredient) => {
  const connection = db.getConnection();
  await connection.collection('ingredients').insertOne(ingredient);
};
