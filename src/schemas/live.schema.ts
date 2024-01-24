import { z } from "zod"

export const LiveSchema = z.object({
    titulo: z.string().min(1, "Titulo é obrigatório"),
    descricao: z.string().min(1, "descrição é obrigatório"),
    imagemURL: z.string().min(1, "URL da é obrigatório"),
    inicioLive: z.string().min(1, "Adicionar a data da live é obrigatório"),
    fimLive: z.string().min(1, "Adicionar a data da live é obrigatório")
})
export const LiveSchemaWithID = z.object({
    id: z.string().uuid(),
    titulo: z.string().min(1, "Titulo é obrigatório"),
    descricao: z.string().min(1, "descrição é obrigatório"),
    imagemURL: z.string().min(1, "URL da é obrigatório"),
    inicioLive: z.string().min(1, "Adicionar a data da live é obrigatório"),
    fimLive: z.string().min(1, "Adicionar a data da live é obrigatório")
})

export type LiveData = z.infer<typeof LiveSchema>
export type LiveDataWithID = z.infer<typeof LiveSchemaWithID>