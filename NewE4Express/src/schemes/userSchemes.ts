import { z } from "zod";

const login = z.object(
    {
        email: z.string().email(),
        password: z.string().min(1)
    }
);
export const loginSchema = z.object({
    body: login
});

export type LoginType = z.infer<typeof login>;

const user = z.object(
    {
        firstname: z.string().min(1),
        lastname: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8)
            .regex(/[@#$%^&+=]/, "must contain one of @#$%^&+=")
            .regex(/[a-z]/, "must contain lower case letter")
            .regex(/[A-Z]/, "must contain upper case letter")
            .regex(/[0-9]/, "must contain number")
    }
);
export const userSchema = z.object({
    body: user
});

export type UserType = z.infer<typeof user>;
