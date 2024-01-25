"use client"

import { liveProduct } from "@/contexts/liveProductContext"
import { api } from "@/services/api"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProductsProps {
  token: string | undefined;
  liveId: string | undefined;
}

const AllProductsfromLive: React.FC<ProductsProps> = ({ token, liveId }) => {
  const { products, setProducts, deleteProduct, returnToUserPage } = liveProduct()
  const router = useRouter()

  useEffect(() => {
    const showProducts = async () => {
      try {
        const { data } = await api.get(`/product/${liveId}/live`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
       setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    showProducts()
  }, [liveId])

  const editProduct = (productId: string) => {
    setCookie("moxen.productId", productId, {maxAge: 60 * 60 * 1})
    router.push("/updateProduct")

  }
  const deleteProducts = (productId: string) => {
    if(token && liveId){
      deleteProduct(token, productId, liveId)
    }
  }
  const retornar = () => {
    returnToUserPage()
  }
  return (
    <div className="user-form-container">
      <h1 className="title text-violet-500 font-bold text-1g">Produtos</h1>
      <div>
        {products.map((produto) => (
          <div className="flex flex-row border-2 border-solid border-purple-300 m-2" key={produto.id}>
            <div className="mx-2 p-2 ">
              <p>Nome do produto: {produto.nome}</p>
              <p>Quantidade: {produto.quantidade}</p>
            </div>
            <div className="flex flex-col p-2">
              <button onClick={() => editProduct(produto.id)}>Editar Produto</button>{' '}
              <button onClick={() => deleteProducts(produto.id)}>Deletar produto</button>
            </div>
          </div>
        ))}
      </div> 
      <div>
        <button onClick={retornar}>Voltar</button>
      </div>
    </div>
  )
}

export default AllProductsfromLive