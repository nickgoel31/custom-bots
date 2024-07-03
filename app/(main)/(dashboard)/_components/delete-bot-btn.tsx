"use client"

import React, { useState } from 'react'
import { Trash, Trash2 } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from '@/components/ui/button'
import { deleteBotInDB } from '@/actions/delete-bot'
import { useRouter } from 'next/navigation'
import { InfinitySpin } from 'react-loader-spinner'

const DeleteBotBtn = ({botId}:{botId:string}) => {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    function handleDeleteBot (){
        // delete bot
        setLoading(true)
        deleteBotInDB(botId).then(res => {
            if(res){
                setLoading(false)
            }
        })
    }
  return (
    <>
    {loading && (
        <div className='z-[100] backdrop-blur-xl fixed flex items-center justify-center top-0 left-0 w-full h-full'>
            <InfinitySpin
                width="200"
                color="#8B5CF6"
            />
        </div>
    )}
    <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button variant={"destructive"} size={"icon"}>
                                        <Trash2 size={20}/>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your bot from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteBot}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
    </>
  )
}

export default DeleteBotBtn