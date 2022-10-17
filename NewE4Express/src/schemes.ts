import { z } from 'Zod';

export const taskSchema = z.object({
    title: z.string().min(1),
    dueDate: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date)
            return new Date(arg);
    }, z.date()).optional(),
    isDone: z.boolean().optional(),
    uuid: z.string().length(36).optional()
});

export const tasksSchema = z.array(taskSchema);
