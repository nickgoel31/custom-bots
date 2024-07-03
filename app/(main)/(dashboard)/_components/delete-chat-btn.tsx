"use client"

import { Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
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
import { InfinitySpin } from 'react-loader-spinner'
import { deleteChatInDb } from '@/actions/delete-chat'

import { toast } from "sonner"


const DeleteChatBtn = ({chatId}:{chatId:string}) => {
    const [loading,setLoading] = useState(false)

    function handleDeleteChat(){
        // delete chat
        setLoading(true)
        deleteChatInDb(chatId).then(res => {
            if(res){
                setLoading(false)
                toast("Chat has been deleted successfully.")
            } else{
                setLoading(false)
                toast("Error deleting chat.")

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
                                    <div className='text-destructive p-2 rounded-lg hover:bg-red-300/10 transition'>
                                        <Trash2Icon size={20} />
                                        </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your chat from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteChat}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
    </>
  )
}

export default DeleteChatBtn