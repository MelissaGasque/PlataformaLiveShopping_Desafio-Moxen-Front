import Toast from "@/components/toast"
import { LiveData } from "@/schemas/live.schema"
import { ProductData } from "@/schemas/products.schema"
import { api } from "@/services/api"
import { deleteCookie, setCookie } from "cookies-next"
import { redirect, useRouter } from "next/navigation"
import { ReactNode, createContext, useContext } from "react"

interface LiveProducts {
    addLives: (liveDada: LiveData, token: string) => void
    addProducts: (productData: ProductData, token: string, liveId: string) => void
    checkLiveHasProduct: (token: string, liveId: string) => void
}

interface Props {
    children: ReactNode
}

const LiveProductsContext = createContext<LiveProducts>({} as LiveProducts)

export const LiveProductProvider = ({children}: Props) =>{
    const router = useRouter()

    const addLives = (liveData: LiveData, token:string) => {
        api.post("/live", liveData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setCookie("moxen.liveId", response.data.id, {maxAge: 60 * 60 * 1})
            router.push("/addProduct")
        })
    }
    const addProducts = (productData:ProductData, token: string, liveId: string) => {
            api.post(`/product/${liveId}`, productData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(() =>{
            Toast({message: "Produto Adicionado à Live", isSucess:true})
        })
        .catch((erro) => {
            Toast({message: "Algo deu errado." + erro})
        })
    }

    const checkLiveHasProduct = (token: string, liveId: string) => {
        api.get(`/product/${liveId}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data) {
                deleteCookie("moxen.liveId")
                Toast({message: "Live Criada!", isSucess:true})
                router.push("/userPage")
            } else {
                Toast({message: "É preciso adicionar no mínimo um produto à Live!"})
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
        
        
    }
    return(
        <LiveProductsContext.Provider value={{addLives, addProducts, checkLiveHasProduct}}>
            {children}
        </LiveProductsContext.Provider>
    )
}

export const liveProduct = () => useContext(LiveProductsContext)