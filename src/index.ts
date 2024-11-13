import { Elysia, error } from "elysia";

const app = new Elysia()
.get("/", () => "Hello Elysia")
.get("/hello", () => "Hello World")
.get("/hello/:name", ({ params }) => `Hello ${params.name}`)
.get("/hello/:name/:age", ({ params }) => `Hello ${params.name} ${params.age}`)
.get("/customers/:id", ({params}) => {
  const customers = [
    {id:0 ,name:'John', age: 30},
    {id:1 ,name:'Jane', age: 25},
    {id:2 ,name:'Bob', age: 35},
    {id:3 ,name:'Alice', age: 28},
  ]
    const customer = customers.find(customer => customer.id === Number(params.id))
    if (!customer) {
      return {error: "Customer not found"}
    }
  return customer
})
.get('/customers/query', ({query}) => {
  const name = query.name
  const age = query.age

  return `query: ${name} ${age}`
})

.get('/customers/status', () => {
  return new Response('Hello World', {status: 200})
})

.post('/customers/create',  ({body}: {body:any}) => {
  const name = body.name;
  const age = body.age;

  return `body: ${name} ${age}`
})
.put('/customers/update/:id', ({params, body}: {params:any, body:any}) => {
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


.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
