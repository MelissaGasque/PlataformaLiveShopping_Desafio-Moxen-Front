
import { Header } from "@/components/header"
import AllProductsfromLive from "@/components/showProducts"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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
    <div className="body min-h-screen">
      <Header/>
      <main className="flex items-center justify-center ">
      < AllProductsfromLive token={token} liveId={liveId}/>
      </main>
    </div>
  )
  }