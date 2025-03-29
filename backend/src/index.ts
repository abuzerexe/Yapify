import { Hono } from 'hono'
import v1Handler from './routes'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(cors());
app.route('/api/v1',v1Handler)


export default app
