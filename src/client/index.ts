import { Hono } from 'hono';
import home from './home/homeScreen';

const app = new Hono();

app.route('/', home);

export default app;
