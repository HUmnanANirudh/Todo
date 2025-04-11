import express, { Request, Response } from "express";
import prisma from "../Prisma";
import bodyParser from "body-parser";
import { TodoSchema } from "../Schema/Schema";
import { UpdateSchema } from "../Schema/Schema";
const jsonparser = bodyParser.json()
const router = express.Router();

router.get("/bulk",async (req:Request,res:Response)=>{
    const Todos = await prisma.todo.findMany();
    res.status(200).json({ Todos })
})
router.get("/:id",async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id)
    try{
        const Todo = await prisma.todo.findUnique({
            where:{
                id:id
            }
        })
        if(!Todo){
             res.status(404).json({msg:"Todo doesn't exist"})
        }
         res.status(200).json({Todo})
    }catch(e){
        console.log(e)
         res.status(500).json({msg:"error"})
    }
})
router.post("/",jsonparser, async (req:Request,res:Response)=>{
    const Body = await req.body;
    const {success} = TodoSchema.safeParse(Body)
    if(!success){
         res.status(400).json({msg:"Invalid inputs"})
    }
    try{
        const Todo = await prisma.todo.create({
            data:{
                Title:Body.Title,
                Description:Body.Description
            }
        })
         res.json({
            id:Todo.id,
            title:Todo.Title
        })
    }catch(e){
        console.log(e)
        res.status(500).json({msg:"There was an Error"})
    }
})
router.delete("/:id",async(req:Request,res:Response)=>{
    const id = parseInt(req.params.id)
    try{
        const Todo = await prisma.todo.delete({
            where:{
                id:id
            }
        })
        if(!Todo){
             res.status(404).json({msg:"Todo doesn't exist"})
        }
         res.status(200).json({msg:"Todo Deleted"})
    }catch(e){
        console.log(e)
         res.status(500).json({msg:"error"})
    }
    })
router.put("/:id",jsonparser,async(req:Request,res:Response)=>{
    const Body = req.body;
    const {success} = UpdateSchema.safeParse(Body);
    if(!success){
        res.status(400).json({msg:"Invalid Inputs"})
    }
    const id  =  parseInt(req.params.id)
    try{
        const Check = await prisma.todo.findUnique({where:{id:id}})
        if(!Check){
            res.status(404).json({msg:"Todo doesn't exist"})
        }
        const Update = await prisma.todo.update({
            where:{
                id:id
            },
            data:{
                Title:Body.Title,
                Description:Body.Description,
                Done:Body.Done
            }
        })
        res.status(200).json({ Update})
    }catch(e){
        console.log(e)
        res.status(500).json({msg:"Error"})
    }
})
export default router;