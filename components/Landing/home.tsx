import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const HeroHome = () => {
  return (
    <div className='min-h-[calc(100vh-5rem)] w-full flex flex-col items-center justify-center gap-4'>
        <div className='text-center'>
            <h1 className='font-bold text-4xl leading-normal'>
                Welcome to Custom Bots
            </h1>
            <p className='text-sm font-medium text-muted-foreground'>
                A platform to create custom bots for your needs
            </p>
        </div>

        <div className='flex items-center gap-6'>
            <Button asChild>
                <Link href={"/sign-in"} className='text-sm font-medium hover:opacity-70 transition'>
                Get Started
                </Link>
            </Button>
            <Button asChild variant={"outline"} className='h-full'>
                <Link href={"#features"} className='text-sm font-medium hover:opacity-70 transition'>
                Features
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default HeroHome