import express,{ Response,Request } from "express";
import Todos from "./routes/Todo";
const app = express();

const PORT = process.env.PORT || 6969;

app.use("/api/v1/todo",Todos)

app.get("/",async(req:Request,res:Response)=>{
    res.send(`
    <h1>Welcome</h1>
    <p>Here are the available endpoints:</p>
    <ul>
      <li>GET /api/v1/todo/bulk - Get all todos</li>
      <li>GET /api/v1/todo/:id - Get a specific todo by ID</li>
      <li>POST /api/v1/todo - Create a new todo</li>
      <li>PUT /api/v1/todo/:id - Update specific todo by ID</li>
      <li>DELETE /api/v1/todo/:id - Delete a specific todo by ID</li>
    </ul>
  `)
})

app.listen(PORT , ()=>console.log(`running http://localhost:${PORT}`))
