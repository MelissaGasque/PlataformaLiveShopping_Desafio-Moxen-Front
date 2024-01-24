import { Header } from "@/components/header"
import FormUpdateProducts from "@/components/updateProducts"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { NextPage } from "next"
import { redirect } from "next/navigation"

const verifyToken = () => {
  const token = getCookie("moxen.token", { cookies })
  if (!token) {
      redirect("/")
  }
  return token
}
const productID = () => {
    const id = getCookie("moxen.liveId", { cookies })
  
    return id
}

const UpdateProduct: NextPage = function () {
  const token = verifyToken()
  const productId = productID()
  return (
    <div className="body min-h-screen">
      <Header/>
      <main className="flex items-center justify-center ">
        <FormUpdateProducts token={token} productId={productId}/>
      </main>
    </div>
  )
}

export default UpdateProduct