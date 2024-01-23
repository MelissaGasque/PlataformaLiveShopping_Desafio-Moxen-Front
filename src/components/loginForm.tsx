"use client"

import { useAuth } from "@/contexts/authContext"
import { LoginData, LoginSchema } from "@/schemas/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema)
  })

  const { login } = useAuth()

  const submit = (formData: LoginData) => {
    login(formData)
  }
  return (
    <div className="user-form-container">
      <h1 className="title text-violet-500 font-bold text-1g">Login</h1>
      <form className="space-y-6 w-4/5" onSubmit={handleSubmit(submit)}>
       
        <div className="">
        <input
            type="email"
            placeholder="E-mail"
            className="user-form-input"
            {...register("email")}
        />
        </div>

        <div className="">
            <input
                type="password"
                placeholder="Senha"
                className="user-form-input"
                {...register("password")}
            />
        </div>
        <div>
          <button type="submit" className="user-form-button">
            Entrar
          </button>
        </div>
      </form>
      <Link href={"/registerPage"} className="user-form-link">
        Cadastre-se
      </Link>
    </div>
  )
}

export default LoginForm