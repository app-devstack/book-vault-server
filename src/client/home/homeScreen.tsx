import { Hono } from 'hono';
import type { FC } from 'hono/jsx';

const app = new Hono();

const Layout: FC = (props) => {
  return (
    <html lang="ja"
    >
     <head>
    <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
    <title>bv-server</title>
  </head>
      <body>{props.children}</body>
    </html>
  );

};


const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>

      <ul>
        <li><a href="/api/books">books</a></li>
      </ul>
    </Layout>
  );
};

app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night'];
  return c.html(<Top messages={messages} />);
});

export default app;
