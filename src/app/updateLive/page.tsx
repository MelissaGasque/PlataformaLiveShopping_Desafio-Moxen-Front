import { Header } from "@/components/header"
import FormUpdateLive from "@/components/updateLive"
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
const live_Id = () => {
  const id = getCookie("moxen.liveId", { cookies })

  return id
}
const UpdateLive: NextPage = function () {
  const token = verifyToken()
  const liveId = live_Id()
  return (
    <div className="body min-h-screen">
      <Header/>
      <main className="flex items-center justify-center ">
      <FormUpdateLive token={token} liveId={liveId}/>
      </main>
    </div>
  )
}

export default UpdateLive