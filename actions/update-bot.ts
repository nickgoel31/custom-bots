"use server"

import { getUserByEmail } from "@/helpers/get-user"
import { db } from "@/lib/db"
import { botSchema } from "@/schemas"
import Error from "next/error"
import { z } from "zod"

export const updateBotInDb = async (values: z.infer<typeof botSchema>, botId:string, creatorEmail:string) => {
    const user = await getUserByEmail(creatorEmail)
    if(!user) return {message: `Bot Updation Failed.\n Error: USER NOT FOUND`, messageCode: `F001`}
    // Add code here
    const validatedFields = botSchema.safeParse(values)
    if(!validatedFields.success) return {message: `Bot Updation Failed.\n Error: COULD NOT VALIDATE FIELDS`, messageCode: `F003`}
    const {description,gender,imageUrl,introduction,name,introMessage,personality,physicalFeatures,speakingStyle,category,isDraft,isPublic,isRoleplay} = validatedFields.data
    try {
        const bot = await db.bot.update({
            where:{
                id: botId
            },
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
                isRoleplay
            }
        })
    
        return {message: "Bot Created Successfully", messageCode: "S001", bot: bot}
    } catch (error) {
        return {message: `Bot Updation Failed.\n Error: ${error}`, messageCode: `F002`}
    }
}