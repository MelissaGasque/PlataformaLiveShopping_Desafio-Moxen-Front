import { Header } from "@/components/header"
import Menu from "@/components/menu"
import { useAuth } from "@/contexts/authContext";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"
// import Link from "next/link";
import { redirect } from "next/navigation";

const verifyToken = () => {
  const token = getCookie("moxen.token", { cookies })
  if (!token) {
      redirect("/")
  }

  return token
}

export default function UserPage() {
  const acessToken = verifyToken()
  const decodedToken = jwtDecode(acessToken)
  const idToken = decodedToken.sub

  return (
    <div className="body min-h-screen text-purple-500 ">
      <Header/>
      <main>
        <section>
          Aqui ficará os botões de adicionar live, deletar usuário, sair da página
          <Menu idToken={idToken} />
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