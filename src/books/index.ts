import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json('This is the books index route!')
}).post(
  "/", (c) => {
    return c.json({ message: 'Book created successfully!' })
  }
)

export default app
