import {Hono} from 'hono';

const user = new Hono();

user.post('/signup', (c)=>{
    return c.json({
        msg : "eher"
    })
})

user.post('/signin', )

export default user;
