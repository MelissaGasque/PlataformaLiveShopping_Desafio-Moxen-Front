import { Header } from "@/components/header"
import LoginForm from "@/components/loginForm"
import { NextPage } from "next"

const Home: NextPage = () =>  {
  return (
    <div className="body min-h-screen">
    <Header/>
    <main className="flex items-center justify-center">
      <LoginForm />
    </main>
    </div>
  )
}

export default Home