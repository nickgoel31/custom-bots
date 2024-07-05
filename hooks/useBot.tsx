"use client"

import { useEffect, useState } from "react"
import { getUserByEmail } from "@/helpers/get-user"
import { Bot, User } from "@prisma/client"

import { Session } from "next-auth"
import { getBotFromId } from "@/helpers/get-bot"

const useBot = (botId:string) => {
    const [botState,setBotState] = useState<Bot | null>()
    

    useEffect(() => {
        async function getBot(){
            
            
            const bot = await getBotFromId(botId)
            if(!bot) return;

            setBotState(bot)
        }

        getBot()
    },[])

    return botState;
}

export default useBot