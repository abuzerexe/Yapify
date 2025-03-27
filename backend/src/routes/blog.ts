import { createBlogInput, deleteBlogInput, updateBlogInput } from '@abuzerexe/yapify-common';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {Hono} from 'hono';
import { Jwt } from 'hono/utils/jwt';

const blog = new Hono<{
    Bindings:{
        DATABASE_URL : string,
        JWT_SECRET : string
       },
    Variables : {
        userId : string
    }
}>();

blog.use('/*', async (c,next)=>{

    try{
        const auth = c.req.header('Authorization')

        if(!auth){
            c.status(403)
            return c.json({
                error : "Unauthorized"
            })
        }

        const token = auth?.split(' ')[1]

        const payload = await Jwt.verify(token as string,c.env.JWT_SECRET)

        if(!payload){
            c.status(403)
            return c.json({
                error : "Unauthorized"
            })
        }

        c.set('userId', payload.id as string)

        await next();

    }catch(e:any){
        c.status(403);
       return c.json({
            message : "You are not Authorized.",
            error : e.message
        })
    }
})


blog.post('/',async (c)=>{
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
        

    const userId = c.get('userId')

    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message : "Invalid Inputs"
        })
    }
    const {title,content} = body;
    
    try{

        const response = await prisma.blog.create({
            data :{
                authorId : userId,
                title,
                content,
                published : true
            }
        })

        if(response){
            return c.json({
                message : "Blog created Successfully.",
                id : response.id
            })
        }else{
            c.status(411)
            return c.json({
                message : "Error.",
            })
        }

    }catch(e:any){
        c.status(411)
        return c.json({
            message : "Error.",
            error : e.message
        })
    }

})

blog.put('/',async (c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const userId = c.get('userId')
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message : "Invalid Inputs"
        })
    }

    try{
        const response = await prisma.blog.update({
            where:{
                id: body.id,
                authorId: userId
            },
            data:{
                title : body.title ,
                content: body.content,
                published: body.published
            }
        })

        if(response){
            return c.json({
                message : "Blog Updated Successfully."
            })
        }else{
            c.status(411)
            return c.json({
                message : "Error while updating.",
            
            })
        }
    
        
    }catch(e:any){

        c.status(411)
        return c.json({
            message : "Error while updating.",
            error : e.message
        })
    }

})


blog.get('/:id',async (c)=>{

    const blogId = c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const response = await prisma.blog.findFirst({
            where : {
                id: blogId
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

blog.delete("/delete",async (c)=>{

    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = deleteBlogInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message : "Invalid Inputs"
        })
    }
    const userId = c.get("userId");

    try{

        const response = await prisma.blog.delete({
            where : {
                id : body.blogId,
                authorId : userId
            }
        })

        if(!response){
            return c.json({
                message : "Deleted Successfully."
            })
        }else{
            c.status(401)
            return c.json({
                message : "Error while deleting."
            })
        }

    }catch(e:any){
        c.status(401)
        return c.json({
            message : "Error while deleting.",
            error : e.message
        })
    }

})

export default blog;