"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "./get-user";

export const checkIfUserAlreadyHasAChatWithBot = async (botId:string, userEmail:string) => {
    const user = await getUserByEmail(userEmail)
    if(!user) return;
    return db.chat.findFirst({
        where:{
            botId,
            userId: user.id
        }
    })
}