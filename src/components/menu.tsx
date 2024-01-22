"use client"

import { useAuth } from "@/contexts/authContext"
import Link from "next/link"

interface MenuProps {
    idToken: string | undefined
}

const Menu: React.FC<MenuProps> = ({idToken}) => {  
    const { deleteUser, logOut } = useAuth()

    function userDelete(){
        if(idToken){
            deleteUser(idToken)
        }
    }
    function leavePage(){
        logOut()
    }
    return(
        <>
          {/* Aqui ficará os botões de adicionar live, deletar usuário, sair da página */}
        <section>
            <div>
                <Link href={"/addLiveProduct"} className=""> Adicionar Live </Link>
            </div>
            <div>
                <button onClick={userDelete}>Excluir conta</button>
            </div>
            <div>
                <button onClick={leavePage}>Sair</button>
            </div>
        </section>
        </>
    )
  }
  
  export default Menu