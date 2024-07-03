"use server"

import { verifiedUsers } from "@/data"
import { getUserByEmail } from "@/helpers/get-user"
import { db } from "@/lib/db"
import { botSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import Error from "next/error"
import { z } from "zod"

export const createBotInDb = async (values: z.infer<typeof botSchema>, creatorEmail:string) => {
    const user = await getUserByEmail(creatorEmail)
    if(!user) return {message: `Bot Creation Failed.\n Error: USER NOT FOUND`, messageCode: `F001`}
    // Add code here
    let isVerified = false;
    if(verifiedUsers.includes(user.email)){
        isVerified = true;
    }
    const validatedFields = botSchema.safeParse(values)
    if(!validatedFields.success) return {message: `Bot Creation Failed.\n Error: COULD NOT VALIDATE FIELDS`, messageCode: `F003`}
    const {description,gender,imageUrl,introduction,name,introMessage,personality,physicalFeatures,speakingStyle,category,isDraft,isPublic,isRoleplay} = validatedFields.data
    try {
        const bot = await db.bot.create({
            data:{
                creatorId: user.id,
                description,
                gender,
                image: imageUrl,
                introduction,
                name,
                introMessage,
                personality,
                physicalFeatures,
                speakingStyle,
                isPublic,
                isDraft,
                category,
                isRoleplay,
                isVerified
            }
        })

        revalidatePath("/")
    
        return {message: "Bot Created Successfully", messageCode: "S001", bot: bot}
    } catch (error) {
        return {message: `Bot Creation Failed.\n Error: ${error}`, messageCode: `F002`}
    }
}