import { Hono } from 'hono'
import v1Handler from './routes'

const app = new Hono()

app.route('/api/v1',v1Handler)


export default app
