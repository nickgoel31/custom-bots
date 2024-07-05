"use client"

import { createChatInDb } from '@/actions/create-chat'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { checkIfUserAlreadyHasAChatWithBot } from '@/helpers/check-if-chat'
import { getBotFromId } from '@/helpers/get-bot'
import useBot from '@/hooks/useBot'
import useUserDB from '@/hooks/useUserDB'
import { useAuth, useUser } from '@clerk/nextjs'
import { Bot } from '@prisma/client'
import { Verified } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const BotPage = ({ params }:{params:{botId:string}}) => {
    const [createdChat,setCreatedChat] = useState({res:false, chatId:""})
    const [loading, setLoading] = useState(false)
    const session = useAuth()
    if(!session.userId) return;
    const user = useUserDB(session.userId)
    const router = useRouter()
    const bot = useBot(params.botId)
    if(!bot) {
        setTimeout(() => {
            notFound();
        },5000)
        return;
    }

    function handleClick(){
        setLoading(true)
        if(!bot || !session || !session.userId || !user || !user.email) {
            console.log("no bot or session", bot, session)
            return;
        }
        checkIfUserAlreadyHasAChatWithBot(bot.id, user.email)
            .then(chat => {
                if(chat){
                    //TAKE THE USER TO CHAT
                    router.push(`/chat/${chat.id}`)
                    setLoading(false)
                }
                else{
                    //create chat with bot
                    if(!bot || !session || !session.userId || !user || !user.email) return;
                    createChatInDb(bot.id, user.email)
                        .then(res => {
                            if(res?.id){
                                setCreatedChat({res:true, chatId: res.id})
                                router.push(`/chat/${res.id}`)  
                                setLoading(false)
                            }                   
                        })
                }
            })
        
    }

    const replicateHref = `/bot/create?name=${bot.name}&description=${bot.introduction}&imageUrl=${bot.image}&introduction=${bot.introduction}&replicate=true&isRoleplay=${bot.isRoleplay}&category=${bot.category}&speakingStyle=${bot.speakingStyle}&introMessage=${bot.introMessage}&personality=${bot.personality}&physicalFeatures=${bot.physicalFeatures}&gender=${bot.gender}`

  return (
    <div className='w-full bg-foreground/5  '>
        <div className='max-w-screen-md mx-auto py-14 px-4 w-full h-full space-y-4 min-h-screen  flex flex-col items-center relative border-x'>
            <div className='w-32 h-32 overflow-hidden rounded-full'>
                <Image src={bot.image || ""} alt={bot.name} width={1000} height={1000} className='w-full h-full'/>
            </div>
            <div className='text-center'>
                <h1 className='text-4xl font-bold leading-normal flex justify-center text-center items-center gap-2'>
                    {bot.name}
                    {bot.isVerified && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span className='text-muted-foreground'>
                                    <Verified size={20}/>
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className='text-center'>This bot is verified, meaning, it was created by official creator or verified contributor of this project. </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </h1>
                <p className='font-medium text-sm text-muted-foreground'>
                    {bot.introduction}
                </p>
            </div>

            <div className='fixed max-w-screen-md mx-auto p-4 px-6 border-t backdrop-blur-xl z-[5] bottom-0 w-full flex items-center justify-center gap-4' >
                <Button disabled={loading} onClick={handleClick}>Chat with {bot.name.split(" ")[0]}</Button>
                <Button className='!bg-white/0 text-foreground border h-full' asChild>
                    <Link href={replicateHref}>
                        Replicate
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default BotPage
