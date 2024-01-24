"use client"


import { ProductData, ProductSchema } from "@/schemas/products.schema"
import { zodResolver } from "@hookform/resolvers/zod"
// import { deleteCookie } from "cookies-next"
// import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
// import Toast from "./toast"
import Link from "next/link"
import { liveProduct } from "@/contexts/liveProductContext"

interface ProductsProps {
  token: string | undefined
  productId: string | undefined
}

const FormUpdateProducts:  React.FC<ProductsProps> = ({token, productId}) => {
  const { register, handleSubmit, reset } = useForm<ProductData>({
    resolver: zodResolver(ProductSchema)
  })

  // const {updateProduct } = liveProduct()

  const submit = (formData: ProductData) => {
    //   if(token && productId){
    //     updateProduct(token, productId, formData,)
    //  }
     reset()
  }

  return (
    <div className="user-form-container">
      <h1 className="title text-violet-500 font-bold text-1g">Atualizar Produto</h1>

      <form className="space-y-6 w-4/5" onSubmit={handleSubmit(submit)}>
        <div className="">
        <input
            type="text"
            placeholder="Nome"
            className="user-form-addProduct"
            {...register("nome")}
        />
        </div>
        <div className="">
            <input
                type="text"
                placeholder="URL da imagem"
                className="user-form-addProduct"
                {...register("imagemURL")}
            />
        </div>
        <div className="">
            <input
                type="text"
                placeholder="Quantidade"
                className="user-form-addProduct"
                {...register("quantidade")}
            />
        </div>
        <div>
          <button type="submit" className="user-form-button">
            Atualizar
          </button>
        </div>
      </form>
      <div>
        <Link href={"/userPage"}>Voltar</Link>
      </div>
    </div>
  )
}

export default FormUpdateProducts