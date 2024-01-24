"use client"

import { liveProduct } from "@/contexts/liveProductContext"
import { ProductDataWithId } from "@/schemas/products.schema"
import { api } from "@/services/api"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface LivesProps {
    token: string | undefined
}


const AllLives: React.FC<LivesProps> = ({token}) => {
  const { lives, setLives, deleteLive, updateLive, setLiveId } = liveProduct()
    // const [productOnLive, setproductOnLive] = useState<{ [liveId: string]: [ProductDataWithId] }>({});
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

    // useEffect(() => {
    //     const showProducts = async (liveId: string) => {
    //       try {
    //         const { data } = await api.get(`/${liveId}/live`, {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         })
    //         setproductOnLive((produtos) => ({
    //           ...produtos,
    //           [liveId]: data,
    //         }));
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //     lives.forEach((live) =>{
    //       showProducts(live.id)
    //     })
    // }, [token, lives])


 
const products = (liveId: string) => {
  console.log(liveId, token)
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
// const editProduct = () => {
//     alert("Editar Produto")
// }
// const deleteProduct = () => {
//     alert("Deletar produto")
// }
return (
<div className="user-form-container">
    <h1 className="title text-violet-500 font-bold text-1g">Lives</h1>
    {lives.map((live) => (
        <div key={live.id}>
          <div>
            <h2>Nome da Live: {live.titulo}</h2>
            <div>
              <button onClick={() => products(live.id)}>Produtos da Live</button>{' '}
              <button onClick={() => editLive(live.id)}>Editar dados da Live</button>
              <button onClick={() => deletarLive(live.id)}>Deletar Lives</button>
            </div>
          </div>
          <p>Descrição: {live.descricao}</p>
          {/* <h3>Produtos da live</h3> */}
          {/* <div>
            {productOnLive[live.id]?.map((produto) => (
              <div key={produto.id}>
                <p>{produto.nome}</p>
                <p>{produto.quantidade}</p>
                <div>
                  <button onClick={editProduct}>Editar dados do Produto</button>
                  <button onClick={deleteProduct}>Deletar Produto</button>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      ))}
    </div>
  )
}
export default AllLives