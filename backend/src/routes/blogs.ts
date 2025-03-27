import {  PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {Hono} from 'hono';

const blogs = new Hono<{
    Bindings:{
        DATABASE_URL : string,
       }
}>();

blogs.get('/', async(c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const response = await prisma.blog.findMany();
    
    return c.json({
        data : response
    })
    
})

export default blogs