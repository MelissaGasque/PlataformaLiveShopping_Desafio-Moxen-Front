"use client"
import { useAuth } from "@/contexts/authContext"
import { UserData, UserSchema } from "@/schemas/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

export default function RegisterForm() {
    const { register, handleSubmit } = useForm<UserData>({
      resolver: zodResolver(UserSchema)
    })

    const { registerUser } = useAuth()
   
    function submit(formData: UserData){
      registerUser(formData)
    }

    return (
      <div className="user-form-container">
        <h1 className="title">Cadastrar-se</h1>
        <form className="space-y-6 w-4/5" onSubmit={handleSubmit(submit)}>
          <div>
            <input
              type="text"
              placeholder="Seu nome"
              className="user-form-input"
              {...register("name")}  
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Seu email"
              className="user-form-input"
              {...register("email")}  
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Sua senha"
              className="user-form-input"
              {...register("password")}  
            />
          </div>
          <div>
            <button type="submit" className="user-form-button">
              Cadastrar
            </button>
          </div>
        </form>
        <Link href={"/"} className="user-form-link">
          Voltar
        </Link>
      </div>
    )
  }