import { Hono } from 'hono';
import books from './books';
import users from './users';
import backup from './backup';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// `/api`
app
  .use(async (c, next) => {
    await next();
    const obj = await c.res.json();
    c.res = new Response(JSON.stringify(obj, null, 2), c.res);
  })
  .get('/', async (c) => {
    return c.json('Hello Hono!');
  })
  .route('/books', books)
  .route('/users', users)
  .route('/backup', backup);

export default app
export type AppType= typeof app;
