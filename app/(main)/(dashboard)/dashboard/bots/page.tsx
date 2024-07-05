import { Button } from '@/components/ui/button'
import { getBotsFromUserId } from '@/helpers/get-bot'
import Link from 'next/link'
import React from 'react'
import { getUserByEmail } from "@/helpers/get-user"
import { redirect } from 'next/navigation'
import Image from 'next/image'

import DeleteBotBtn from '../../_components/delete-bot-btn'
import { currentUser } from '@clerk/nextjs/server'
  

const DashboardBotsPage = async () => {
    const session = await currentUser()
    if (!session) redirect("/sign-in")
    const user = await getUserByEmail(session.emailAddresses[0].emailAddress)
    if(!user) return;
    const bots = await getBotsFromUserId(user.id)
  return (
    <div className='w-full py-4 space-y-10'>
        <div className='flex items-center w-full justify-between'>
            <div>
                <h1 className='font-bold text-3xl leading-normal'>Your Bots</h1>
                <p className='text-muted-foreground text-sm font-medium'>
                    You can view and manage your bots here.
                </p>
            </div>
            <Button asChild>
                <Link href={"/bot/create"}>
                + Create Bot
                </Link>
            </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
            {bots && bots.length > 0 ? bots.map((bot) => (
                <div key={bot.id} className='border bg-muted rounded-lg shadow-md overflow-hidden h-64 p-4 flex flex-col'>
                    <div className=' h-full flex-1 w-full flex flex-col items-center justify-center gap-4'>
                        <div className='relative w-20 h-20 rounded-full overflow-hidden'>
                            <Image src={bot.image || ""} alt={bot.name} width={1000} height={1000} className='w-full object-cover h-full'/>
                        </div>
                        <div>
                            <p className='text-lg font-bold'>{bot.name}</p>
                            <p className='text-muted-foreground text-sm line-clamp-2'>{bot.description}</p>
                        </div>
                        <div className='flex items-center justify-center gap-3'>
                            <Button asChild>
                                <Link href={`/bot/${bot.id}/edit`}>
                                    Edit Bot
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href={`/bot/${bot.id}`}>
                                    Chat
                                </Link>
                            </Button>
                            <DeleteBotBtn botId={bot.id}/>
                        </div>
                    </div>
                </div>
            )):(
                <div className='text-muted-foreground text-center w-full'>
                    You have no bots yet.
                </div>
            )}
        </div>

    </div>
  )
}

export default DashboardBotsPage