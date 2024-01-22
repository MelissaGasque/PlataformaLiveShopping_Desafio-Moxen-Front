import { api } from "@/services/api"
import Link from "next/link"

interface PageProps {
    params: { id: string }
}

const Teste = async ({params}: PageProps) => {
    // const response = await api.get(`/teste/${params.id}`)
    // const live = response.data

    return(
        <main className=" body min-h-screen text-purple-500 ">
            <div>
                <Link href={"/userPage"} className="">Voltar</Link>
            </div>
        </main>
    )
}

export default Teste