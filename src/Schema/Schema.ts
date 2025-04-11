import {z} from "zod"

export const TodoSchema = z.object({
    Title:z.string(),
    Description:z.string(),
    Done:z.boolean().optional()
})
export const UpdateSchema =z.object({
    Title:z.string().optional(),
    Description:z.string().optional(),
    Done:z.boolean().optional()
})