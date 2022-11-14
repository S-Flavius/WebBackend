import { z } from "zod";
import { Task } from "../Task";

let date = z.preprocess(arg => {
    if (typeof arg == "string")
        return new Date(arg);
}, z.date());

const task = z.object({
    title: z.string().min(1),
    dueDate: z.union([z.string().max(0,
        { message: "must be Date or empty string" }).transform(()=> undefined),
    z.optional(date)]),
    isDone: z.boolean().default(false)
}).transform(t => new Task(t.title, t.dueDate, t.isDone));

export const taskSchema = z.object({body: task})

export const tasksSchema = z.object({body: z.array(task)})