"use client"

import { useEffect, useState } from "react"
import { auth } from "@/auth"
import { getUserByEmail } from "@/helpers/get-user"
import { User } from "@prisma/client"

import { Session } from "next-auth"

const useAuth = ({session}:{session:Session}) => {
    const [userState,setUserState] = useState<User | null>()
    

    useEffect(() => {
        async function getUser(){
            
            if(!session || !session.user || !session.user.email) return;
            const user = await getUserByEmail(session.user.email)
            if(!user) return;

            setUserState(user)
        }

        getUser()
    },[])

    return userState;
}

export async function getServerSideProps() {
    const session = await auth()
   
    return {
      props: {
        session,
      },
    }
  }

export default useAuth