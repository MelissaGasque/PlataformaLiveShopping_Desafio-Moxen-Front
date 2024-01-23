"use client"

import { liveProduct } from "@/contexts/liveProductContext"
import { ProductData, ProductSchema } from "@/schemas/products.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { deleteCookie } from "cookies-next"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import Toast from "./toast"

interface ProductsProps {
  token: string | undefined
  liveId: string | undefined
}

const FormProducts:  React.FC<ProductsProps> = ({token, liveId}) => {
  const { register, handleSubmit } = useForm<ProductData>({
    resolver: zodResolver(ProductSchema)
  })

  const { addProducts, checkLiveHasProduct } = liveProduct()

  const submit = (formData: ProductData) => {
      if(token && liveId){
      addProducts(formData, token, liveId)
     }
  }
  const criouLiveProduc = () =>{
    if(token && liveId){
      checkLiveHasProduct( token, liveId)
     }
  }

  const desistir = () =>{
    deleteCookie("moxen.liveId")
    redirect("/userPage")
  }
  return (
    <div className="user-form-container">
      <h1 className="title text-violet-500 font-bold text-1g">Adicionar Produto</h1>

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
            Adicionar
          </button>
        </div>
      </form>
      <div>
          <button onClick={criouLiveProduc} className="user-form-button">
            Finalizar adição de produtos!
          </button>
        </div>
        <div>
          <button onClick={desistir} className="user-form-button">
            Desistir da live
          </button>
        </div>
    </div>
  )
}

export default FormProducts