import { Header } from "@/components/header";
import Link from "next/link";

export default function UserPage() {
    return (
      <div className="body min-h-screen text-purple-500 ">
        <Header/>
        <main>
          <section>
            Aqui ficará os botões de adicionar live, deletar usuário, sair da página
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