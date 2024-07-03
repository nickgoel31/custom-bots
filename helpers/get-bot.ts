"use server"

import { db } from "@/lib/db"

export const getBotFromId = async (id:string) => {
    try {
        const bot = await db.bot.findUnique({
            where:{
                id
            }
        })

        if(!bot) return;

        return bot
    } catch (error) {
        console.error(error)
    }
}

export const getBotsFromUserId = async (creatorId:string) => {
    try {
        const bots = await db.bot.findMany({
            where:{
                creatorId
            }
        })

        return bots
    } catch (error) {
        console.error(error)
    }
}

export const getAllBotsInApp = async () => {
    try {
        const bots = await db.bot.findMany({where:{
            isPublic: true,
            isDraft: false,
        }})

        return bots
    } catch (error) {
        console.error(error)
    }
}