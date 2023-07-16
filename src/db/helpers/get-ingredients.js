import { db } from '../db';

export const getIngredients = async () => {
  const connection = db.getConnection();
  return await connection.collection('ingredients').find({}).toArray();
};
