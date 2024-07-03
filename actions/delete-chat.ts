"use server"

import { getUserByEmail } from "@/helpers/get-user";
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export const deleteChatInDb = async (chatId:string) => {
    await db.chat.delete({
        where:{
            id:chatId
        }
    })

    revalidatePath("/")

    return true;
}