import FormProducts from "@/components/addProducts"
import { Header } from "@/components/header"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
// import Link from "next/link"

const verifyToken = () => {
  const token = getCookie("moxen.token", { cookies })
  if (!token) {
      redirect("/")
  }
  return token
}

const verifyLiveId = () => {
    const liveId = getCookie("moxen.liveId", { cookies })
    if(!liveId){
        redirect("/addLive")
    }
    return liveId
}


export default function AddLive() {
  const token = verifyToken()
  const liveId = verifyLiveId()

    return (
      <div className="body min-h-screen text-purple-500 flex flex-col items-center justify-center">
        <div>
          <Header/>
        </div>
        <main>
            <h1>Adicionar Produtos</h1>
            <FormProducts token={token} liveId={liveId}/>
        </main>
      </div>

    )
  }