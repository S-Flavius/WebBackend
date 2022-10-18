import { z } from 'Zod';
import { Task } from '../classes/Task';

const task = z.object({
    title: z.string().min(1),
    dueDate: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date)
            return new Date(arg);
    }, z.date()).optional(),
    isDone: z.boolean().default(false),
    uuid: z.string().length(36).optional()
}).transform(t => new Task(t.title, t.dueDate, t.isDone));

export const taskSchema = z.object({
    body: task
});

export const tasksSchema = z.object({ body: z.array(taskSchema) });
