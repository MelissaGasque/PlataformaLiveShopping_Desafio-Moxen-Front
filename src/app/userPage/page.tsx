import Link from "next/link";

export default function UserPage() {
    return (
      <main className="body min-h-screen text-purple-500 ">
        <h1> Pagina do usuário</h1>
        <p> Pagina interna (do usuário) após Login</p>
        <p> Nessa página será mostrado os dados da live, ao clicar em uma, será aberto uma pagina dinamica</p>
        <div>
          <Link href={"/"}>Voltar</Link>
        </div>
      </main>
    )
  }