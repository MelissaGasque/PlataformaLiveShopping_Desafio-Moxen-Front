import Link from "next/link";


export default function AddLiveProducts() {
    return (
      <main className=" body min-h-screen text-purple-500 ">
        <h1>Adicionar as  lives e produtos</h1>
        <div>
          <Link href={"/userPage"} className="btn-primary">Voltar</Link>
        </div>
      </main>
    )
  }