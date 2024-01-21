import Link from "next/link";

export default function Register() {
    return (
      <main className=" body min-h-screen text-purple-500 ">
        <h1>Pagina Register</h1>
        <p>Nessa página ficará os inputs e botão para registro</p>
        <div>
          <Link href={"/"}>Voltar</Link>
        </div>
      </main>
    )
  }