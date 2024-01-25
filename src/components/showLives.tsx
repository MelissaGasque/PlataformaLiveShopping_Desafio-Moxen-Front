"use client"

import { liveProduct } from "@/contexts/liveProductContext"
import { api } from "@/services/api"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect} from "react"

interface LivesProps {
    token: string | undefined
}


const AllLives: React.FC<LivesProps> = ({token}) => {
  const { lives, setLives, deleteLive } = liveProduct()
    const router = useRouter()
    useEffect(() => {
        const showAllLives = async() => {
            try {
                const { data } = await api.get("/live", {
                    headers:{
                      Authorization:` Bearer ${token}`
                    }
                })
                setLives(data)
            }catch(error){
                console.log(error)
            }
        }
        showAllLives()
    }, [])

     
const products = (liveId: string) => {
  setCookie("moxen.liveId", liveId, {maxAge: 60 * 60 * 1})
  router.push("/products")
}
const editLive = (liveId: string) => {
  setCookie("moxen.liveId", liveId, {maxAge: 60 * 60 * 1})
  router.push("/updateLive")
}
const deletarLive = (liveId: string) => {
  if(token){
    deleteLive(token, liveId)
  }
}

return (
<div className="user-form-container border-4 border-solid border-purple-400 p-4 mx-3">
    <h1 className="title text-violet-500 font-bold text-1g">Lives</h1>
    {lives.map((live) => (
        <div className="flex justify-between border-2 border-solid border-purple-300 m-2" key={live.id}>
          <div className="mx-2 p-3 ">
            <h2>Nome da Live: {live.titulo}</h2>
            <p>Descrição: {live.descricao}</p>
          </div>
          <div className="flex flex-col p-3">
              <button onClick={() => products(live.id)}>Produtos da Live</button>{' '}
              <button onClick={() => editLive(live.id)}>Editar dados da Live</button>
              <button onClick={() => deletarLive(live.id)}>Deletar Lives</button>
            </div>
        </div>
      ))}
    </div>
  )
}
export default AllLives