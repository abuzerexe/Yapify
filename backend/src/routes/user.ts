import {Hono} from 'hono';
import { Jwt } from 'hono/utils/jwt';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sha256} from 'hono/utils/crypto';
import { signinInput, signupInput } from '@abuzerexe/yapify-common';

const user = new Hono<{
    Bindings:{
     DATABASE_URL : string,
     JWT_SECRET : string
    }
}>();


user.post('/signup', async (c)=>{
    
    const body = await c.req.json()

    const {success} = signupInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message : "Invalid Inputs"
        })
    }
    
    const email = body['email']
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


        return c.json({
            message : "Sign up Successfully.",
        })

    }catch(e:any){
         c.status(411)
         return c.json({
            message : "Error while signing up. Try Again",
            error : e.message
        })
    }


})

user.post('/signin', async (c)=>{

    const body = await c.req.json();

    const {success} = signinInput.safeParse(body)

    if(!success){
        c.status(411)
        return c.json({
            message : "Invalid Inputs"
        })
    }

    const email = body['email'];
    const password = body['password'];

    const hashedPassword = await sha256(password)

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{

    
        const check = await prisma.user.findFirst({
            where :{
                email,
                password : hashedPassword as string
            },
            select: {
                id : true
            }
        })

        if(check){

            const signedjwt = await Jwt.sign(check,c.env.JWT_SECRET)
            const token = 'Bearer '+signedjwt;

            return c.json({
                message : "Sign In Successfully.",
                token
            })
        }
    }catch(e:any){
        c.status(411)
       return c.json({
            message : "Error while signing in. Try again.",
            error : e.message
        })
    }

} )



export default user;
