"use client"

import { useAuth } from "@/contexts/authContext"
import Link from "next/link"

interface MenuProps {
    token: string | undefined
}

const Menu: React.FC<MenuProps> = ({token}) => {  
    const { deleteUser, logOut } = useAuth()

    function userDelete(){
        if(token){
            deleteUser(token)
        }
    }
    function leavePage(){
        logOut()
    }
    return(
        <>
        <section>
            <div>
                <Link href={"/addLive"} className=""> Adicionar Live </Link>
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