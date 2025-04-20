import {  PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {Hono} from 'hono';

const blogs = new Hono<{
    Bindings:{
        DATABASE_URL : string,
       }
}>();

blogs.get('/:id',async (c)=>{

    const blogId = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const response = await prisma.blog.findFirst({
            where : {
                id: blogId
            },
            select:{
                title: true,
                content: true,
                createdAt:true,
                id : true,
                author:{
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
    
        if(response){
            return c.json({
                data : response
            })
    
        }else{
            c.status(411)
            return c.json({
                message : "Error while getting blog.",
            })
        }
    
    }catch(e:any){

        c.status(411)
        return c.json({
            message : "Error while getting blog.",
            error : e.message
        })
    }

})

blogs.get('/', async(c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const response = await prisma.blog.findMany({
        select : {
            id : true,
            authorId : true,
            title : true,
            content : true,
            createdAt : true,
            author : {
                select : {
                    name : true,
                    email : true
                }
            }
        }
    });
    
    return c.json({
        data : response
    })
    
})

export default blogs