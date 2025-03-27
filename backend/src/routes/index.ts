import { Hono } from 'hono'
import UserHandler from './user'
import BlogHandler from './blog'
import BlogsHandler from './blogs'

const v1Handler = new Hono()

v1Handler.route('/user',UserHandler)

v1Handler.route('/blog',BlogHandler)

v1Handler.route('/blogs',BlogsHandler)

export default v1Handler;