import { z } from 'Zod';

const taskSchema = z.object({
    title: z.string().min(1),
    dueDate: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date)
            return new Date(arg);
    }, z.date()).optional(),
    isDone: z.boolean(),
    uuid: z.string().length(36)
});
