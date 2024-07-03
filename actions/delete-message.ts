"use server"

import { db } from "@/lib/db"
import { MessageUser } from "@prisma/client"


export const deleteMessageInDB = (id:string) => {
    return db.message.delete({
        where:{
            id
        }
    })
}

export const deleteAllMessagesOfChatRoom = (chatId:string) => {
    return db.message.deleteMany({
        where:{
            chatId,
        }
    })
}