
import FormLive from "@/components/addLive"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

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
      <main className=" body min-h-screen text-purple-500 ">
        <h1>Adicionar as  lives e produtos</h1>
          <FormLive token={token}/>
        <div>
          <Link href={"/userPage"} className="btn-primary">Voltar</Link>
        </div>
      </main>
    )
  }