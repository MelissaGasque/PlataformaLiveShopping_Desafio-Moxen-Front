"use client"

import { liveProduct } from "@/contexts/liveProductContext"
import { LiveData, LiveSchema } from "@/schemas/live.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

interface LiveProps {
  token: string | undefined
  liveId: string | undefined
}

const FormUpdateLive: React.FC<LiveProps> = ({token, liveId}) => {
  const { register, handleSubmit, reset } = useForm<LiveData>({
    resolver: zodResolver(LiveSchema)
  })

  const { updateLive } = liveProduct()

 function submit(formData: LiveData){
    if(token && liveId){
        updateLive (token, liveId, formData)
    }
    reset()
  }
  return (
    <div className="user-form-container">
      <h1 className="title text-violet-500 font-bold text-1g">Atualizar Live</h1>

      <form className="space-y-6 w-4/5" onSubmit={handleSubmit(submit)}>
        <div className="">
        <input
            type="text"
            placeholder="Titulo"
            className="user-form-addLive"
            {...register("titulo")}
        />
        </div>
        <div className="">
            <textarea
                placeholder="Descrição"
                className="user-form-addLive"
                {...register("descricao")}
            />
        </div>
        <div className="">
            <input
                type="text"
                placeholder="URL da imagem"
                className="user-form-addLive"
                {...register("imagemURL")}
            />
        </div>
        <div className="">
            <input
                type="date"
                placeholder="Data inicio da Live"
                className="user-form-addLive"
                {...register("inicioLive")}
            />
        </div>
        <div className="">
            <input
                type="date"
                placeholder="Data fim da Live"
                className="user-form-addLive"
                {...register("fimLive")}
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

export default FormUpdateLive