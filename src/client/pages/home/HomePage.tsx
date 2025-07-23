import { Layout } from '@/client/components/layout/Layout';
import { options } from '@/db';
import { SeriesWithBooks } from '@/db/types';
import { drizzle } from 'drizzle-orm/d1';
import { css } from 'hono/css';

export default async function HomePage(props: { messages: string[]; DB: D1Database }) {
  const db = drizzle(props.DB, options);

  const series = await db.query.series.findMany({ with: { books: true } });

  // const routers = [
  //   { path: '/api/books', label: 'Books' },
  //   { path: '/api/users', label: 'Users' },
  //   { path: '/api/backup', label: 'Backup' },
  // ];

  return (
    <Layout>
      <h1>Book Vault!</h1>

      <div className="">
        <h2>Series List</h2>
        {series.map((s) => (
          <Series key={s.id} {...s} />
        ))}
      </div>
    </Layout>
  );
}

const headerClass = css`
  background-color: #466fc9;
  color: white;
  padding: 1rem;
`;

const Series = (series: SeriesWithBooks) => {
  return (
    <div>
      <h2 class={headerClass}>{series.title}</h2>

      {series.books.length > 0 ? (
        <ul>
          {series.books.map((book) => (
            <li key={book.id}>
              <a href={book.targetUrl}>{book.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>- Nodata -</p>
      )}
    </div>
  );
};
