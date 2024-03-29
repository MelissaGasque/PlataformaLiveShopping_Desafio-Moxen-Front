import Toast from "@/components/toast"
import { LiveData, LiveDataWithID } from "@/schemas/live.schema"
import { ProductData, ProductDataWithId } from "@/schemas/products.schema"
import { api } from "@/services/api"
import { deleteCookie, setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { ReactNode, createContext, useContext, useState } from "react"


interface LiveProducts {
    addLives: (liveDada: LiveData, token: string) => void
    addProducts: (productData: ProductData, token: string, liveId: string) => void
    checkLiveHasProduct: (token: string, liveId: string) => void
    desistirLive: (token: string, liveId: string) => void
    updateLive: ( token: string, liveId: string, formData: LiveData) => void
    returnToUserPage: () => void
    deleteLive: (token: string, liveId: string) => void
    updateProduct: (token: string, productId: string, formData: ProductData) => void
    deleteProduct: (token: string, productId: string, liveId: string) => void
    lives: LiveDataWithID[];
    setLives: React.Dispatch<React.SetStateAction<LiveDataWithID[]>>
    liveId: string,
    setLiveId:React.Dispatch<React.SetStateAction<string>>
    products: ProductDataWithId[];
    setProducts: React.Dispatch<React.SetStateAction<ProductDataWithId[]>>
}

interface Props {
    children: ReactNode
}

const LiveProductsContext = createContext<LiveProducts>({} as LiveProducts)

export const LiveProductProvider = ({children}: Props) =>{
    const [lives, setLives] = useState<LiveDataWithID[]>([])
    const [liveId, setLiveId] = useState("")
    const [products, setProducts] = useState<ProductDataWithId[]>([])
    const router = useRouter()

    const addLives = async(liveData: LiveData, token:string) => {
        await api.post("/live", liveData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setCookie("moxen.liveId", response.data.id, {maxAge: 60 * 60 * 1})
            router.push("/addProduct")
        })
    }
    const addProducts = async(productData:ProductData, token: string, liveId: string) => {
            await api.post(`/product/${liveId}`, productData, {
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

    const checkLiveHasProduct = async(token: string, liveId: string) => {
        await api.get(`/product/${liveId}`, {
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
            console.error('Erro na requisição:', error)
        })        
    }
    
    const updateLive = async(token: string, liveId: string, formData: LiveData) => {
        console.log(token)
        console.log(liveId)
        console.log(formData)
        try{
            alert("entrou aqui")
            await api.patch(`/live/${liveId}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            alert("passou oeka api")
            setLives((liveUpdate) => {
                return liveUpdate.map((live) => 
                    live.id === liveId ? { ...live, ...formData} : live
                )
            })
            Toast({message: "Live editada!", isSucess:true})
        }
        catch(error){
            Toast({message: "Update não realizado"})
        }
           
    }

    const returnToUserPage = async() => {
        deleteCookie("moxen.liveId")
        deleteCookie("moxen.productId")
        router.push("/userPage")
    }


    const deleteLive = async(token: string, liveId: string) => {
        try{
            await api.delete(`/live/${liveId}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setLives((liveDelete) => {
                return liveDelete.filter((live) => live.id !== liveId )
            })
            deleteCookie("moxen.liveId")
            Toast({message: "Live Deletada!", isSucess:true}) 
        }
        catch(erro){
            Toast({message: "Deleção não realizada"})
        }
    }
    const desistirLive = async(token: string, liveId: string) => {
       deleteLive(token, liveId)
       router.push("/userPage")
    }


    const updateProduct = async(token: string, productId: string, formData: ProductData) => {
        try{
            await api.patch(`/product/${productId}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            alert("chegou aqui")
            router.push("/product")
            Toast({message: "Live editada!", isSucess:true})
        }
        catch(error){
            Toast({message: "Update não realizado"})
        }
            
    }
        
    const deleteProduct = async(token: string, productId: string, liveId: string) => {
        // console.log(token)
        // console.log(productId)
        // console.log(liveId)
        try{
            await api.delete(`/product/${productId}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            alert("entra")
            Toast({message: "Produto Deletado!", isSucess:true})
            await api.get(`/product/${liveId}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                if (!response.data) {
                    deleteLive(token, liveId)
                    router.push("/userPage")
                } 
            })
        }
        catch(error){
            Toast({message: "Update não realizado"})
        }
            
    }

    return(
        <LiveProductsContext.Provider value={{addLives, addProducts, checkLiveHasProduct, lives, setLives, deleteLive, desistirLive, updateLive, returnToUserPage, liveId, setLiveId, products, setProducts, updateProduct, deleteProduct }}>
            {children}
        </LiveProductsContext.Provider>
    )
}

export const liveProduct = () => useContext(LiveProductsContext)