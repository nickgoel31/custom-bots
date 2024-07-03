
import { Button } from "@/components/ui/button"


import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import React, { useState } from 'react'
import { generateBotMessage } from "@/actions/gemini"
import ChatUI from "../_components/chat-ui"
import { getChatFromChatId } from "@/helpers/get-chat"
import { notFound } from "next/navigation"
import { getBotFromId } from "@/helpers/get-bot"
import { getUserByEmail, getUserById } from "@/helpers/get-user"
import { auth } from "@/auth"
import { getMessagesFromChatId } from "@/helpers/get-message"
import { Message } from "@prisma/client"




const ChatPage = async ({params}:{params:{chatId:string}}) => {
    const chat = await getChatFromChatId(params.chatId)
    if(!chat) notFound();

    const bot = await getBotFromId(chat.botId)
    if(!bot) notFound()

    const chatUser = await getUserById(chat.userId)
    if(!chatUser) return;

    const session = await auth()
    if(!session || !session.user || !session.user.email) {
        return
    }

    const user = await getUserByEmail(session.user.email)
    if(!user)return;

    

    if(session.user.email !== chatUser.email){
        notFound()
    }
    

    const messages= await getMessagesFromChatId(chat.id)
    if(!messages) return;

    const messagesFinal:Message[] = messages
  
  return (
    <div className=' w-full bg-foreground/5 '>
        <div className='py-5 pb-28 pt-20  px-6 w-full min-h-screen max-w-screen-md mx-auto border-x relative'>
            <ChatUI messages={messagesFinal} chat={chat} bot={bot} user={user}/>
        </div>
    </div>
  )
}

export default ChatPage