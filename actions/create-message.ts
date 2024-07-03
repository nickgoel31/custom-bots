"use server"

import { db } from "@/lib/db"
import { MessageUser } from "@prisma/client"


export const createMessageInDB = (senderId:string, senderType:MessageUser, message:string,image:string, chatId:string) => {
    return db.message.create({
        data:{
            senderId,
            senderType,
            image,
            content: message,
            chatId
        }
    })
}