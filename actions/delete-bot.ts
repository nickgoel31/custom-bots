"use server"

import { db } from "@/lib/db"
import { MessageUser } from "@prisma/client"
import { revalidatePath } from "next/cache"


export const deleteBotInDB = async (id:string) => {
    await db.bot.delete({
        where:{
            id
        }
    })

    revalidatePath("/")

    return true;
}