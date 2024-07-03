"use server"

import { getUserByEmail } from "@/helpers/get-user";
import { db } from "@/lib/db"

export const createChatInDb = async (botId:string, userEmail:string) => {
    const user = await getUserByEmail(userEmail)
    if(!user) return;
    const chat = await db.chat.create({
        data:{
            botId,
            userId:user.id
        }
    })

    return chat
}