"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const updateUserDisplayName = async (userId:string, displayName:string) => {
    try {
        await db.user.update({
            where:{
                id:userId
            },
            data:{
                displayName
            }
        })
        revalidatePath("/")
        return {success:true}
    } catch (error) {
        return {success:false, error:error};
    }
}