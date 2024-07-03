import NewBotForm from '@/components/new-bot-form'
import React from 'react'

const CreateBotPage = () => {
  return (
    <div className='w-full bg-foreground/5 min-h-screen  '>
        <div className='max-w-screen-md mx-auto py-14 px-4 w-full h-full text-center space-y-8'>
            <div>
                <h1 className='text-4xl font-bold leading-normal'>Create new bot</h1>
                <p className='font-medium text-sm text-muted-foreground'>
                    You can create a new bot by specifying it's details.
                </p>
            </div>

            <NewBotForm />
        </div>
    </div>
  )
}

export default CreateBotPage