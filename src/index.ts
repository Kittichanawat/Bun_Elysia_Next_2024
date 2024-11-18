
import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { staticPlugin } from "@elysiajs/static";
import { jwt } from "@elysiajs/jwt";
import CustomerController from "./controllers/CustomerController";
import { UserController } from "./controllers/UserController";
const app = new Elysia()
  .use(swagger({
    documentation: {
      tags: [
        { name: 'User', description: 'User related endpoints' },
        { name: 'Customer', description: 'Customer related endpoints' }
      ]
    }
  }))
  .use(cors())
  .use(staticPlugin())
  .use(jwt({
    name: 'jwt',
    secret: 'secret'
  }))
  .group('/users', app => app
    .get('/', UserController.list, { tags: ['User'] })
    .post('/', UserController.create, { tags: ['User'] })
    .put('/:id', UserController.update, { tags: ['User'] })
    .delete('/:id', UserController.remove, { tags: ['User'] })
    .get('/findSomeField', UserController.findSomeField, { tags: ['User'] })
  )
  .get('/customers', CustomerController.list, { tags: ['Customer'] })
  .post('/customers', CustomerController.create, { tags: ['Customer'] })
  .put('/customers/:id', CustomerController.update, { tags: ['Customer'] })
  .delete('/customers/:id', CustomerController.remove, { tags: ['Customer'] })
  .post('/login', async ({ jwt, cookie: { auth } }) => {
    const user = {
      id: 1,
      username: 'admin',
      level: 'admin',
      path: '/profile'
    }

    const token = await jwt.sign(user)

    auth.set({
      value: token,
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    return { token: token }
  })
  .get("/", () => "Hello Elysia")
  .get("/hello", () => "Hello World")
  .get("/hello", () => "Hello Next")
  .get("/hello/:name", ({ params }) => `Hello ${params.name}`)
  .get("/hello/:name/:age", ({ params }) => `Hello ${params.name} ${params.age}`)
  .get("/customers/:id", ({ params }) => {
    const customers = [
      { id: 0, name: 'John', age: 30 },
      { id: 1, name: 'Jane', age: 25 },
      { id: 2, name: 'Bob', age: 35 },
      { id: 3, name: 'Alice', age: 28 },
    ]
    const customer = customers.find(customer => customer.id === Number(params.id))
    if (!customer) {
      return { error: "Customer not found" }
    }
    return customer
  })
  .get('profile', ({ jwt, cookie: { auth } }) => {
    const user = jwt.verify(auth.value);
    return user
  })
  .get('/logout', ({ cookie: { auth } }) => {
    auth.remove()
    return { message: 'Logged out' }
  })
  .get('/customers/query', ({ query }) => {
    const name = query.name
    const age = query.age

    return `query: ${name} ${age}`
  })

  .get('/customers/status', () => {
    return new Response('Hello World', { status: 200 })
  })

  .post('/customers/create', ({ body }: { body: any }) => {
    const name = body.name;
    const age = body.age;

    return `body: ${name} ${age}`
  })
  .put('/customers/update/:id', ({ params, body }: { params: any, body: any }) => {
    const id = params.id;
    const name = body.name;
    const age = body.age;

    return `params: ${id} body: ${name} ${age}`;
  })
  .put("/customers/updateAll/:id", ({ params, body }: {
    params: { id: string };
    body: { name: string; age: number };
  }) => {
    const id = params.id;
    const name = body.name;
    const age = body.age;

    return `params: ${id} body: ${name} ${age}`;
  })
  .delete('/customers/delete/:id', ({ params }: { params: any }) => {
    const id = params.id;

    return `params: ${id}`;
  })
  .post('/upload-file', ({ body }: { body: { file: File } }) => {
    const file = body.file;
    Bun.write('uploads/' + file.name, file)
    return { message: 'File uploaded' }
  })
  .get('/write-file', () => {
    Bun.write('text.txt', 'Hello World')
    return { message: 'File written' }
  })
  .get('/read-file', () => {
    const file = Bun.file('text.txt')
    return file.text()
  })
  .group('/customers', app => app

    .post('/', CustomerController.create)
    .get('/', CustomerController.list)
    .put('/:id', CustomerController.update)
    .delete('/:id', CustomerController.remove)
  )
  .get('/info', async ({ jwt, request }) => {
    if (request.headers.get('Authorization') === null) {
      return { message: 'No Authorization header' }
    }
    const token = request.headers.get('Authorization') ?? ''
    if (token === '') {
      return { message: 'No token' }
    }
    const payload = await jwt.verify(token)

    return {
      message: 'Hello Elysia',
      payload: payload
    }
  })

  .listen(3003);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
