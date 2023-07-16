import { db } from '../db';

export const getMeals = async () => {
  const connection = db.getConnection();
  return await connection.collection('meals').find({}).toArray();
};
