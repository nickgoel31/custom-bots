"use client"

import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from 'next-auth/react'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { signOut } from "next-auth/react"
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'
import { UserButton, useAuth, useUser } from '@clerk/nextjs'
import useUserDB from '@/hooks/useUserDB'
import { User } from '@prisma/client'
 
  


const Navbar = () => {
    const user = useAuth()
    const userDB = useUserDB(user.userId)
    if(!user || !user.userId || !userDB) return;
  return (
    <div className='fixed backdrop-blur-md border-b p-2 flex items-center justify-center px-6 lg:px-16 w-full h-16'>
        <div className='flex items-center justify-between w-full max-w-screen-xl mx-auto'>
            <h1 className='font-semibold'>
                Custom Bots
            </h1>

            <NavLinks user={userDB}/>
            <MobileNavLinks user={userDB}/>
        </div> 
    </div>
  )
}

export default Navbar


function NavLinks({user}:{user:User}){
    
    return (
        <div className='hidden lg:block'>
        {
            user ? (
                <ul className='flex items-center gap-6 text-sm font-medium'>
            <li>
                <Link href={`/dashboard`}>
                    My Dashboard
                </Link>
            </li>
            <li>
                <Link href={`/explore`}>
                    Explore
                </Link>
            </li>
            <li>
                <Link href={`/dashboard/bots`}>
                    Your Bots
                </Link>
            </li>
            <li>
                <Link href={`/dashboard/chats`}>
                    Your Chats
                </Link>
            </li>
            <li>
            <UserButton />
    
            
    
            </li>
        </ul>
            ):(
                <ul className='flex items-center gap-6 text-sm font-medium'>
                    <li>
                        <Link href={`/explore`}>
                            Explore
                        </Link>
                    </li>
                    <li>
                        <Button asChild>
                            <Link href={`/sign-in`}>
                                Sign in
                            </Link>
                        </Button>
                    </li>
                </ul>
            )
        }
        </div>
    )
}

function MobileNavLinks({user}:{user:User}){
    return (
        <div className='block lg:hidden'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MenuIcon />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                {
            user ? (
                <ul className='flex p-4 flex-col items-center gap-6 text-sm font-medium'>
            <li>
                <Link href={`/dashboard`}>
                    My Dashboard
                </Link>
            </li>
            <li>
                <Link href={`/explore`}>
                    Explore
                </Link>
            </li>
            <li>
                <Link href={`/dashboard/bots`}>
                    Your Bots
                </Link>
            </li>
            <li>
                <Link href={`/dashboard/chats`}>
                    Your Chats
                </Link>
            </li>
            <li>
            <Popover>
                <PopoverTrigger>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
                        <AvatarFallback>
                            {user.displayName?.slice(0, 1).toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    <Button onClick={() => signOut()}>Signout</Button>
                </PopoverContent>
            </Popover>
    
            
    
            </li>
        </ul>
            ):(
                <ul className='flex flex-col p-4 items-center gap-6 text-sm font-medium'>
                    <li>
                        <Link href={`/explore`}>
                            Explore
                        </Link>
                    </li>
                    <li>
                        <Button asChild>
                            <Link href={`/sign-in`}>
                                Sign in
                            </Link>
                        </Button>
                    </li>
                </ul>
            )
        }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}