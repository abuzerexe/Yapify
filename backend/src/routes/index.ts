import { Hono } from 'hono'
import UserHandler from './user'
import BlogHandler from './blogs'

const v1Handler = new Hono()

v1Handler.route('/user',UserHandler)

v1Handler.route('/blog',BlogHandler)

export default v1Handler;