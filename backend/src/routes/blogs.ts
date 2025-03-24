import {Hono} from 'hono';

const blog = new Hono();

blog.post('/')

blog.put('/')

blog.get('/:id',(c)=>{
    const id = c.req.param('wd');
    console.log(id)
    return c.text(`id : ${id}`)
})

blog.get('/bulk')

export default blog;