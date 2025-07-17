import { Hono } from 'hono';
import books from './books';

const app = new Hono();

// `/api`
app
  .get('/', (c) => {
    return c.json('Hello Hono!');
  })
  .route('/books', books);

export default app;
// export type Apptype = typeof route
