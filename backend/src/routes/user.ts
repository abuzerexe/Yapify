import {Hono} from 'hono';
import { Jwt } from 'hono/utils/jwt';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {createHash, sha256} from 'hono/utils/crypto';


const user = new Hono<{
    Bindings:{
     DATABASE_URL : string,
     JWT_SECRET : string
    }
}>();


user.post('/signup', async (c)=>{
    
    const body = await c.req.json()
    const email = body['username']
    const password = body['password']
    const name = body['name']
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    
    const hashedPassword = await sha256(password)

    try{

        const user = await prisma.user.findFirst({
            where : {
                email
            }
        })

        if(user){
            c.status(411)
            return c.json({
                message : "Email already Taken"
            })
        }
        
        const result = await prisma.user.create({
            data : {
                email,
                password: hashedPassword as string,
                name
            },
            select :{
                id : true
            }
        })

        const token = await Jwt.sign(result,c.env.JWT_SECRET)

        return c.json({
            token
        })

    }catch(e:any){
         c.status(411)
         return c.json({
            message : "Error while signing up. Try Again",
            error : e.message
        })
    }


})

user.post('/signin', )

export default user;
