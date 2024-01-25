
import FormLive from "@/components/addLive"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"

const verifyToken = () => {
  const token = getCookie("moxen.token", { cookies })
  if (!token) {
      redirect("/")
  }

  return token
}

export default function AddLive() {
  const token = verifyToken()
    return (
      <main className="body min-h-screen text-purple-500 flex flex-col items-center justify-center">
        <div>
          <Header/>
        </div>
        <div>
          <FormLive token={token}/>
        </div>
        <div>
          <Link href={"/userPage"} className="btn-primary">Voltar</Link>
        </div>
      </main>
    )
  }