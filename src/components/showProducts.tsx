"use client"

import { liveProduct } from "@/contexts/liveProductContext"
import { api } from "@/services/api"
import { useEffect } from "react"

interface ProductsProps {
  token: string | undefined;
  liveId: string | undefined;
}

const AllProductsfromLive: React.FC<ProductsProps> = ({ token, liveId }) => {
  const { products, setProducts } = liveProduct()

  useEffect(() => {
    const showProducts = async () => {
      console.log(liveId)
      console.log(token)
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
  }, [])

  const editProduct = (productId: string) => {
      alert(productId)
  }
  const deleteProduct = (productId: string) => {
      alert(productId)
  }
  return (
    <div className="user-form-container">
      <h1 className="title text-violet-500 font-bold text-1g">Produtos</h1>
      <div>
        {products.map((produto) => (
          <div key={produto.id}>
            <p>{produto.nome}</p>
            <p>{produto.quantidade}</p>
            <div>
              <button onClick={() => editProduct(produto.id)}>Editar dados do Produto</button>{' '}
              <button onClick={() => deleteProduct(produto.id)}>Editar dados da Live</button>
            </div>
          </div>
        ))}
      </div> 
    </div>
  )
}

export default AllProductsfromLive