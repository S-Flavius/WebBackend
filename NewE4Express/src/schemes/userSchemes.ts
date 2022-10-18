import { z } from 'Zod';
import { User } from '../classes/User';

const user = z.object({
    username: z.string().min(3),
    password: z.string().min(8)
        .regex(/[A-Z]/, { message: "Password must include at least one capital letter" })
        .regex(/[a-z]/, { message: "Password must include at least one small letter" })
        .regex(/[1-9]/, { message: "Password must include at least one digit" })
}).transform(u => new User(u.username, u.password));

export const userSchema = z.object({
    body: user
});

export type UserType = z.infer<typeof user>;
