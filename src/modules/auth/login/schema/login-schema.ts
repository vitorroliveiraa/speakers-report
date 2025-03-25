import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({required_error:"Campo obrigatório"}),
    password: z.string({required_error:"Campo obrigatório"})
})