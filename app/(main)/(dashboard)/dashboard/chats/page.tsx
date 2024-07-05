import { Button } from '@/components/ui/button'
import { getBotFromId, getBotsFromUserId } from '@/helpers/get-bot'
import Link from 'next/link'
import React from 'react'
import { getUserByEmail } from "@/helpers/get-user"
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { getChatsFromUserId } from '@/helpers/get-chat'
import { ChevronRight } from 'lucide-react'
import DeleteChatBtn from '../../_components/delete-chat-btn'
import { auth, currentUser } from '@clerk/nextjs/server'


const DashboardChatsPage = async () => {
    const session = await currentUser()
    if (!session) redirect("/sign-in")
    const user = await getUserByEmail(session.emailAddresses[0].emailAddress)
    if(!user) return;
    const chats = await getChatsFromUserId(user.id)
  return (
    <div className='w-full py-4 space-y-10'>
        <div className='flex items-center w-full justify-between'>
            <div>
                <h1 className='font-bold text-3xl leading-normal'>Your Chats</h1>
                <p className='text-muted-foreground text-sm font-medium'>
                    You can view and manage your chats here.
                </p>
            </div>
            <Button asChild>
                <Link href={"/explore"}>
                Explore bots
                </Link>
            </Button>
        </div>

        <div>
            <div className='grid grid-cols-1 gap-2'>
                {chats && chats.length > 0 ? chats.map(async (chat) => {
                    const bot = await getBotFromId(chat.botId)
                    if(!bot) return;
                    return (
                        <div key={chat.id} className='flex items-center justify-between'>
                            <Link href={`/chat/${chat.id}`} className='w-full border-b p-4 hover:bg-foreground/5 flex items-center justify-between cursor-pointer transition group'>
                                <div className='flex flex-col gap-1 '>
                                    <h2 className='font-semibold text-lg'>
                                        {bot.name}
                                    </h2>
                                    <p className='text-xs font-medium text-muted-foreground line-clamp-1 pr-16'>
                                        {bot.description}
                                    </p>
                                    {/* <p className='text-xs font-medium text-muted-foreground line-clamp-1 '>
                                        {chat.id}
                                    </p> */}
                                </div>
                                <div className='group-hover:translate-x-1 transition'>  
                                <ChevronRight size={25}/>
                                </div>
                            </Link>
                            
                           <div className=' flex items-center gap-2'>
                            <DeleteChatBtn chatId={chat.id}/>
                            
                           </div>
                        </div>
                    )
                }):(
                    <div className='text-muted-foreground text-center w-full'>
                        You have no chats yet.
                    </div>
                    
                )}
            </div>
        </div>
    </div>
  )
}

export default DashboardChatsPage