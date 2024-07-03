"use server"

import { db } from "@/lib/db"

export const getMessagesFromChatId = (chatId:string) => {
    try {
        const messages = db.message.findMany({
            where:{
                chatId
            }
        })

        return messages
    } catch (error) {
        console.error(error)
    }
}