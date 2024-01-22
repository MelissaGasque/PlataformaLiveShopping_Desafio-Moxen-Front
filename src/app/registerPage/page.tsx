import { Header } from "@/components/header"
import RegisterForm from "@/components/registerForm"
import { NextPage } from "next"

const Register: NextPage = function () {
  return (
    <div className="body min-h-screen">
      <Header/>
      <main className="flex items-center justify-center ">
        <RegisterForm />
      </main>
    </div>
  )
}

export default Register