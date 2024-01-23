import { z } from "zod"

export const ProductSchema = z.object({
    nome: z.string().min(1, "Obrigatório adicionar um nome"),
    imagemURL: z.string().min(1, "Obrigatório adicionar a URL da imagem"),
    quantidade: z.string()
})

export type ProductData = z.infer<typeof ProductSchema>