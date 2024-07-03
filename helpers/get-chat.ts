"use server"

import { db } from "@/lib/db"

export const getChatsFromUserId = async (userId:string) => {
    try {
        const chats = await db.chat.findMany({
            where:{
                userId
            }
        })

        return chats
    } catch (error) {
        console.error(error)
    }
}

export const getChatFromChatId = async (id:string) => {
    try {
        const chat = await db.chat.findUnique({
            where:{
                id
            }
        })

        return chat
    } catch (error) {
        console.error(error)
    }
}