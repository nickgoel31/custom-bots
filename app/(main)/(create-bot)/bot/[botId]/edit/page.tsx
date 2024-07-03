import EditBotForm from '@/components/edit-bot-form'
import { getBotFromId } from '@/helpers/get-bot'
import { notFound } from 'next/navigation'
import React from 'react'

const BotEditPage = async ({params}:{params:{botId:string}}) => {
    const bot = await getBotFromId(params.botId)
    if(!bot) notFound()
  return (
    <div className='w-full bg-foreground/5 min-h-screen  '>
        <div className='max-w-screen-md mx-auto py-14 px-4 w-full h-full text-center space-y-8'>
            <div>
                <h1 className='text-4xl font-bold leading-normal'>Edit {bot.name}</h1>
                <p className='font-medium text-sm text-muted-foreground'>
                    You can edit the details of your bot here.
                </p>
            </div>

            <EditBotForm bot={bot} />
        </div>
    </div>
  )
}

export default BotEditPage