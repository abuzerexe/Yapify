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


blog.post('/',(c)=>{
    const id = c.get('userId')
    return c.json({
        msg : 'test'
    })
})

blog.put('/')


blog.get('/:id',(c)=>{
    const id = c.req.param('wd');
    console.log(id)
    return c.text(`id : ${id}`)
})


blog.get('/bulk')

export default blog;