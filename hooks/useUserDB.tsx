"use client"

import { useEffect, useState } from "react"
import { getUserByClerkId, getUserByEmail, getUserById } from "@/helpers/get-user"
import { Bot, User } from "@prisma/client"

import { Session } from "next-auth"
import { getBotFromId } from "@/helpers/get-bot"

const useUserDB = (userId:string) => {
    const [userState, setUserState] = useState<User>()
    useEffect(() => {
        async function getUser(){
            
            
            const user = await getUserByClerkId(userId)
            if(!user) return;

            setUserState(user)
        }

        getUser()
    },[])

    return userState;
}

export default useUserDB