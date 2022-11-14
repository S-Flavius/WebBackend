import { z } from "zod";

export const loginSchema = z.object({
  body: z.object(
    {
      email: z.string().email(),
      password: z.string().min(1)
    }
)});
export type LoginType = z.infer<typeof loginSchema>["body"];

export const userSchema = z.object({
  body: z.object(
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
  )
});

export type UserType = z.infer<typeof userSchema>["body"];