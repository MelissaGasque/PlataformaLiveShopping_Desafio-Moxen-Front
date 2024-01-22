import { z } from "zod"

export const UserSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Precisa ser um email válido"),
    password: z.string().min(1, "Senha é obrigatório")
})

export const LoginSchema = UserSchema.omit({
    name: true
})

export type UserData = z.infer<typeof UserSchema>
export type LoginData = z.infer<typeof LoginSchema>