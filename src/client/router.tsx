import { Hono } from 'hono';
import type { Bindings } from './types/bindings';
import HomePage from './pages/home/HomePage';

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night'];
  const content = await HomePage({ messages, DB: c.env.DB });

  return c.html(content);
});

export default app;
