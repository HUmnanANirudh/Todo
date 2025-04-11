const express = require("express");
import { Response,Request } from "express";
import Todos from "./routes/Todo";
const app = express();

const PORT = 6969;


app.use("/api/v1/todo",Todos)

app.get("/",async(req:Request,res:Response)=>{
    res.send("Hello world")
})

app.listen(PORT , ()=>console.log(`running http://localhost:${PORT}`))
