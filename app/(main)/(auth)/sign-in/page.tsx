
import React from 'react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { signIn } from '@/auth'
  

const SignInPage = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <div className='flex-1 border-r flex-col w-full h-full flex items-center justify-center py-8 px-3 space-y-6'>
          <div className='text-center'>
            <h1 className='font-bold text-4xl leading-normal'>Sign in</h1>
            <p className='text-muted-foreground text-sm font-medium'>
              Dive into the world of {process.env.NEXT_PUBLIC_APP_NAME}
            </p>
          </div>

          <div className='buttons space-y-3'>
            <form action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/dashboard" })
      }}>
              <Button type='submit' variant={"outline"} className='flex items-center gap-2'>
                <FaGoogle />
                Sign in with Google
              </Button>
            </form>
            <Button variant={"outline"} className='flex items-center gap-2'>
              <FaGithub />
              Sign in with Github
            </Button>
          </div>

        </div>
        <div className='flex-[2] w-full h-full relative'>
          <Image src={"/auth-bg.png"} alt='Auth' width={1000} height={1000} className='w-full h-full object-cover'/>
        </div>
    </div>
  )
}

export default SignInPage