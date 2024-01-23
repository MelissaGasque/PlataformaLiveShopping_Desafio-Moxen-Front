import { Header } from "@/components/header"
import Menu from "@/components/menu"
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

export default function UserPage() {
  const token = verifyToken()

  return (
    <div className="body min-h-screen text-purple-500 ">
      <Header/>
      <main>
        <section>
          <Menu token={token} />
        </section>
        <section>
          <div>
          <h1>Lives</h1>
          </div>
          <div>Aqui Será adicionado a lista de lives</div>
        </section>
      </main>
            
    </div>
  )
}