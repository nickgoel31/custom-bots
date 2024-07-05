"use client"

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Menu } from 'lucide-react'

const HomeNavbar = () => {
  const user = useUser()
  if(!user) return;
  return (
    <div className='w-full h-16  p-2 fixed flex items-center justify-center z-[100]'>
      <div className='max-w-screen-lg mx-auto w-full backdrop-blur-lg border bg-gradient-to-tr from-background/50 to-foreground/5 p-3 px-14 rounded-full h-full flex items-center justify-between gap-4'>
        <div className='logo'>
          <h1 className='font-bold'>Custom Bots</h1>
        </div>

        <div className='hidden lg:flex items-center gap-6 '>
          <Link href={"/#features"} className='text-sm font-medium hover:opacity-70 transition'>
            Features
          </Link>
          <Link href={"/#pricing"} className='text-sm font-medium hover:opacity-70 transition'>
            Pricing
          </Link>
          {
            user.isSignedIn ? (
             <div className='flex items-center gap-4'>
               <Link href={"/dashboard"} className='text-sm font-medium hover:opacity-70 transition'>
                Dashboard
              </Link>
              <UserButton />
             </div>
            ):(
              <Button size={"sm"} asChild>
                <Link href={"/sign-in"} className='text-sm font-medium hover:opacity-70 transition'>
                  Get Started
                </Link>
              </Button>
            )
          }
        </div>

        <div className='flex lg:hidden flex-col items-center gap-2 '>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>

            <DropdownMenuContent className='flex flex-col gap-2 p-4 z-[200]'>
              <Link href={"/#features"} className='text-sm font-medium hover:opacity-70 transition'>
                Features
              </Link>
              <Link href={"/#pricing"} className='text-sm font-medium hover:opacity-70 transition'>
                Pricing
              </Link>
              {
                user.isSignedIn ? (
                <div className='flex items-center gap-4'>
                  <Link href={"/dashboard"} className='text-sm font-medium hover:opacity-70 transition'>
                    Dashboard
                  </Link>
                  <UserButton />
                </div>
                ):(
                  <Button size={"sm"} asChild>
                    <Link href={"/sign-in"} className='text-sm font-medium hover:opacity-70 transition'>
                      Get Started
                    </Link>
                  </Button>
                )
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default HomeNavbar