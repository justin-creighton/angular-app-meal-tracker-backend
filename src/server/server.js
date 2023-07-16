import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { routes } from '../routes';
import { db } from '../db/';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.SERVER_PORT;

routes.forEach((route) => {
  app[route.method](`/api${route.path}`, route.handler);
});

const start = async () => {
  await db.connect('mongodb://127.0.0.1:27017');
  await app.listen(port);
  console.log(`Listening on port: ${port}`);
};

start();
