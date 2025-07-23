import { Layout } from '@/client/components/layout/Layout';
import { options } from '@/db';
import { drizzle } from 'drizzle-orm/d1';
import { useEffect } from 'hono/jsx';

export default async function HomePage(props: { messages: string[]; DB: D1Database }) {
  const db = drizzle(props.DB, options);

  const series = await db.query.series.findMany({ with: { books: true } });

  const routers = [
    { path: '/api/books', label: 'Books' },
    { path: '/api/users', label: 'Users' },
    { path: '/api/backup', label: 'Backup' },
  ];

  return (
    <Layout>
      <h1>Hello Hono!</h1>

      <ul>
        {routers.map((route) => {
          return (
            <li key={route.path}>
              <a href={route.path}>{route.label}</a>
            </li>
          );
        })}
      </ul>

      <pre className="p-4 rounded-md bg-zinc-300">{JSON.stringify(series, null, 2)}</pre>
    </Layout>
  );
}
