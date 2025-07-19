import { options } from '@/db';
import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { bookInsertSchema, seriesInsertSchema, shopInsertSchema } from '@/db/types';
import schema from '@/db/schema';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

const backupSchema = z.object({
  books: bookInsertSchema,
  series: seriesInsertSchema,
  shops: shopInsertSchema,
});

app
  .get('/', async (c) => {
    try {
      const db = drizzle(c.env.DB, options);

      const data = await db.query.books.findMany();
      return c.json({ data: data });
    } catch (error) {
      return c.json({ error: error + '' }, 500);
    }
  })
  .post('/', zValidator('json', backupSchema), async (c) => {
    try {
      const data = c.req.valid('json');
      const db = drizzle(c.env.DB, options);

      const { books, series, shops } = data;

      const mapping = [
        { table: schema.books, values: books },
        { table: schema.series, values: series },
        { table: schema.shops, values: shops },
      ];

      await Promise.all(
        mapping.map(({ table, values }) => {
          return db.insert(table).values(values);
        })
      );

      // バックアップ処理のロジックをここに実装
      // const backup = {
      //   id: crypto.randomUUID(),
      //   name: data.name,
      //   description: data.description || '',
      //   type: data.type,
      //   timestamp: data.timestamp || new Date().toISOString(),
      //   status: 'created',
      // };

      return c.json({
        success: true,
        message: 'Backup created successfully!',
        data: data,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          error: 'Failed to create backup: ' + error,
        },
        500
      );
    }
  });

export default app;

/*

import * as z from 'zod'
import { zValidator } from '@hono/zod-validator'

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

app.post('/author', zValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json({
    success: true,
    message: `${data.name} is ${data.age}`,
  })
})


*/
