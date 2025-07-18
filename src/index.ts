import { Hono } from 'hono';
import client from './client';
import api from './api';

const app = new Hono();

app
  // .get('/', (c) => {
  //   return c.json('Hello Hono!');
  // })
  // .get("/favicon.ico", (c) => {
  //   return c.
  // })
  .route('/', client)
  .route('/api', api);

export default app;
// export type Apptype = typeof route
