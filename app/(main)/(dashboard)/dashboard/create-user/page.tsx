"use client"

import { createUserInDB } from "@/actions/create-user"
import useUserDB from "@/hooks/useUserDB"
import { useAuth } from "@clerk/nextjs"
import { notFound, redirect } from "next/navigation"
import { useRouter } from "next/navigation"

const CreateUser = () => {
    const user = useAuth()
    if(!user || !user.userId) return;
    const userDB = useUserDB(user.userId)
    const router = useRouter()
    if(!userDB) {
        createUserInDB()
            .then((res) => {
                if(res){
                    router.push("/dashboard")
                }
                else{
                    notFound()
                }
            })
    }

    

    
  return (
    <div></div>
  )
}

export default CreateUser