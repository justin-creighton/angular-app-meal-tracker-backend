import { db } from '../db';

export const getRecipes = async () => {
  const connection = db.getConnection();
  return await connection.collection('recipes').find({}).toArray();
};
