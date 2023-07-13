import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { routes } from '../routes';
import { db } from '../db/';

const app = express();
const port = process.env.SERVER_PORT;

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

const start = async () => {
  await db.connect('mongodb://127.0.0.1:27017');
  await app.listen(port);
  console.log(`Listening on port: ${port}`);
};

start();
