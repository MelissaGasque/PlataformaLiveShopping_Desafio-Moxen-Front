import Toast from "@/components/toast"
import { LoginData, UserData } from "@/schemas/user.schema"
import { api } from "@/services/api"
import { deleteCookie, setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { ReactNode, createContext, useContext } from "react"


interface AuthUserData {
    registerUser: (userData: UserData) => void
    login: (loginData: LoginData) => void
    deleteUser: (userId: string) => void
    logOut: ( ) => void
}

interface Props {
    children: ReactNode
}

const AuthContext = createContext<AuthUserData>({} as AuthUserData)

export const AuthProvider = ({children}: Props) => {
    const router = useRouter()

    const registerUser = (userData: UserData) => {
        api.post("/user", userData)
        .then(() => {
            Toast({message: "Cadastro realizado! ", isSucess:true})
            router.push("/")
        })
        .catch((erro) => {
            Toast({message: "Erro ao cadastrar o usuário"})
        })
    }

    const login = (loginData: LoginData) => {
        api.post("/login", loginData)
        .then((response) => {
            setCookie("moxen.token", response.data.token, {maxAge: 60 * 60 * 1})
        })
        .then(() => {
            Toast({message: "Login realizado com sucesso", isSucess:true})
            router.push("/userPage")
        })
        .catch((erro) => {
            Toast({message: "Verifique se o e-mail e senha estão corretos"})
        })
    }

    const deleteUser = (userId: string) => {
        api.delete(`/user/${userId}`)
        .then(() =>{
            Toast({message: "Usuário Deletado", isSucess:true})
            deleteCookie("moxen.token")
            router.push("/")
        })
    }

    const logOut = () => {
        deleteCookie("moxen.token")
        router.push("/")
    }

    return(
        <AuthContext.Provider value={{registerUser, login, deleteUser, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)