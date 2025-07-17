import { Hono } from 'hono';

const app = new Hono();

app
  .get('/', (c) => {
    return c.json({
      message: 'This is the books index route!',
    });
  })
  .post('/', (c) => {
    return c.json({ message: 'Book created successfully!' });
  });

export default app;
