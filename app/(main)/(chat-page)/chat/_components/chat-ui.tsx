"use client"
 

import { generateBotMessage, generateRoleplayMessage } from "@/actions/gemini"
import { Button } from "@/components/ui/button"

import { v4 } from "uuid"
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Bot, Chat, MessageUser, Message as PrismaMessage, Session, User } from "@prisma/client"
import { createMessageInDB } from "@/actions/create-message"
import { Camera, Flag, MoreVertical, Send, Trash2 } from "lucide-react"
import Link from "next/link"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { deleteAllMessagesOfChatRoom, deleteMessageInDB } from "@/actions/delete-message"
import { toast } from "sonner"

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "@/components/ui/context-menu"
import { FaPaperPlane } from "react-icons/fa"
import ImageModalChat from "./img-modal"
  
  

type Message = {
    id:string,
    message: string,
    image?: string | null,
    senderType: MessageUser
}

type Props = {
    messages: PrismaMessage[],
    chat: Chat,
    bot: Bot,
    user: User

}

const ChatUI = ({...props}: Props) => {
    const {bot,chat,messages,user} = props
    const [botResponse, setBotResponse] = useState("")
    const [userMessage, setUserMessage] = useState("")

    const [imageModal, setImageModal] = useState(false)
    const [imageType, setImageType] = useState("")
    const [imagePrompt, setImagePrompt] = useState<string>("")
    const [imageBase64, setImageBase64] = useState<string>("")
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("")

    const inputFieldRef = useRef<HTMLTextAreaElement | null>(null)

    // useEffect(() => {
    //     console.log(userMessage)
    //     console.log(imageModal)
    //     console.log(imageType)
    //     console.log(imageBase64)
    //     console.log(uploadedImageUrl)
    // },[
    //     userMessage,
    //     imageModal,
    //     imageType,
    //     imageBase64,
    //     uploadedImageUrl
    // ])
    function handleInputKeyDown(event:React.KeyboardEvent<HTMLTextAreaElement>){
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent default behavior (creating a new line)
            // Perform your custom logic here (e.g., submit form, add new line to textarea, etc.)
            if(userMessage !== ""){
                event.preventDefault();
                onSubmit()
            } else if(userMessage === "") {
                event.preventDefault();
                toast("Message string empty")
            }
        }
    }

    const userDisplayName = user.displayName || "User"

    const [botResponseLoading, setBotResponseLoading] = useState(false)
    const [loading, setLoading] = useState(false)


    // 1. define user and bot messages

    const [messagesState, setMessagesState] = useState<Message[]>(() => 
        messages.map(msg => ({
            id: msg.id,
            message: msg.content,
            image:msg.image,
            senderType: msg.senderType
        }))
    )

    function handleDeleteMessage(msgId:string){
        setMessagesState(prevMessages => 
            prevMessages.filter(msg => msg.id !== msgId)
        )
        deleteMessageInDB(msgId)
    }
  
  // 2. Define a submit handler.
  async function onSubmit() {
    const message = userMessage
    setUserMessage("")
    setMessagesState(prevMessages => [...prevMessages, {id: v4(), message,image: uploadedImageUrl, senderType: "user"}])
    setLoading(true)
    setTimeout(() => {
        setBotResponseLoading(true)
    },1000)
    if(bot.isRoleplay){
        await generateRoleplayMessage(message,messagesState,{
            imageBase64,
            imageType
        }, {
            description:bot.description,
            introduction: bot.introduction,
            introMessage: bot.introMessage,
            name:bot.name,
            gender: bot.gender,
            personality: bot.personality,
            physicalFeatures: bot.physicalFeatures,
            speakingStyle: bot.speakingStyle,
            roleplay: bot.isRoleplay,
            userDisplayName: user.displayName,
        }).then((res)=>{
            setBotResponse(res)
            setBotResponseLoading(false)
            setLoading(false)
            setMessagesState(prevMessages => [...prevMessages, {id: v4(),message: res, senderType: "model"}])
            createMessageInDB(user.id, "user", message,uploadedImageUrl, chat.id)
            setUploadedImageUrl("")
            setImageBase64("")
            setImageType("")
            createMessageInDB(bot.id, "model", res,uploadedImageUrl, chat.id)
        })  
    }
    else{
        generateBotMessage(message,messagesState,{
            imageBase64,
            imageType
        }, {
            description:bot.description,
            introduction: bot.introduction,
            introMessage: bot.introMessage,
            name:bot.name,
            gender: bot.gender,
            personality: bot.personality,
            physicalFeatures: bot.physicalFeatures,
            speakingStyle: bot.speakingStyle,
            roleplay: bot.isRoleplay,
            userDisplayName: user.displayName,

        }).then((res)=>{
            setBotResponse(res)
            setBotResponseLoading(false)
            setLoading(false)
            setMessagesState(prevMessages => [...prevMessages, {id: v4(),message: res, senderType: "model"}])
            createMessageInDB(user.id, "user", message,uploadedImageUrl, chat.id)
            setUploadedImageUrl("")
            setImageBase64("")
            setImageType("")
            createMessageInDB(bot.id, "model", res,uploadedImageUrl, chat.id)
        })  
    }
    
    
  }

  function handleResetChat(){
        setMessagesState([])
        deleteAllMessagesOfChatRoom(chat.id)
  }

  const renderMessageWithBold = (msg: string, userDisplayName: string) => {
    const parts = msg.split(/\*(.*?)\*/g); // Split message by asterisks
    return parts.map((part, i) => {
        if (i % 2 === 0) { // Odd indexes (1, 3, 5, ...) contain text inside asterisks
            // Check if part contains {userDisplayName} and replace it
            const updatedPart = part.replace(/\{userDisplayName\}/g, userDisplayName);
            return <strong key={i}>{updatedPart}</strong>;
        } else {
            return <span className="opacity-80 italic" key={i}>{part}</span>; // Even indexes contain normal text
        }
    });
    }; 
    
    function onClickOpenModal(){
        setImageModal(!imageModal)
    }
    function onSendImageMessage(){
        onSubmit()
    }

  return (
    <div className='relative h-full'>
                <div className='flex items-start w-full h-full justify-between flex-col gap-4'>
                    <div className='flex items-center justify-between space-x-4 fixed  backdrop-blur-xl top-0 w-full p-2 px-4 border-b max-w-screen-md left-1/2 -translate-x-1/2 z-[20]'>
                        <Link href={`/bot/${bot.id}`} className='flex items-center space-x-2'>
                            <Image alt='bot-image' width={500} height={500} src={bot.image || ""} className='w-12 h-12 rounded-full' />
                            <div>
                                <p className='text-lg font-bold text-primary/1'>{bot.name}</p>
                                <p className='text-sm font-medium text-muted-foreground'>Bot</p>
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-3">
                            <Button asChild variant={"outline"}>
                                <Link href={"/dashboard"}>
                                    Back to dashboard
                                </Link>
                            </Button>
                            <Button onClick={handleResetChat} variant={"outline"}>
                                Reset
                            </Button>
                            <Button asChild variant={"ghost"} size={"icon"} className="text-red-500">
                                <Link target="_blank" href={`mailto:harshgoel2004@gmail.com?subject=Report%20Problem%20with%20a%20bot%20${bot.name}%20&body=Bot%20details%3A%20%0Aid%3A%20${bot.id}%0Aname%3A%20${bot.name}%0A%0AIssue%3A%20`}>
                                    <Flag size={20}/>
                                </Link>
                            </Button>
                        </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="lg:hidden">
                                    <div className="flex lg:hidden items-center gap-3">
                                        <MoreVertical />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                    <Button asChild variant={"outline"}>
                                        <Link href={"/dashboard"}>
                                            Back to dashboard
                                        </Link>
                                    </Button>
                                   
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                    <Button onClick={handleResetChat} variant={"outline"}>
                                        Reset
                                    </Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                    <Button asChild variant={"ghost"} size={"icon"} className="text-red-500 flex gap-2">
                                        <Link className="w-full flex items-center gap-2" target="_blank" href={`mailto:harshgoel2004@gmail.com?subject=Report%20Problem%20with%20a%20bot%20${bot.name}%20&body=Bot%20details%3A%20%0Aid%3A%20${bot.id}%0Aname%3A%20${bot.name}%0A%0AIssue%3A%20`}>
                                            <Flag size={20}/>
                                            Report
                                        </Link>
                                    </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        
                    </div>
                    <div className='flex flex-col h-full w-full '>
                        {bot.introMessage && (
                            <div className='bot mesage  w-full p-4 flex items-start gap-2 '>
                            <Image alt='bot-image' width={500} height={500} src={bot.image || ""} className='w-6 h-6 rounded-full' />
                                <div className='rounded-lg max-w-96 w-full bg-muted p-2 px-4'>
                                    <p className='text-sm font-medium text-muted-foreground'>
                                        {bot.isRoleplay ? renderMessageWithBold(bot.introMessage, userDisplayName) : bot.introMessage}
                                    </p>
                                </div>
                            </div>
                        )}
                        {messagesState.map((message,index) => {
                            return (
                                <>
                                {message.senderType === "model" && (
                                    <div key={index} className='bot mesage  w-full p-4 flex items-start gap-2 '>
                                        <Image alt='bot-image' width={500} height={500}  src={bot.image || ""} className='w-6 h-6 rounded-full' />
                                        <ContextMenu>
                                            <ContextMenuTrigger>
                                                <div className='rounded-lg max-w-96 w-full bg-muted p-2 px-4'>
                                                    <p className='text-sm font-medium text-muted-foreground'>
                                                    {bot.isRoleplay ? renderMessageWithBold(message.message,userDisplayName): message.message}
                                                    </p>
                                                </div>
                                            </ContextMenuTrigger>
                                            <ContextMenuContent>
                                                <ContextMenuItem onClick={() => handleDeleteMessage(message.id)} className="text-destructive flex items-center gap-2">
                                                    <Trash2 size={20}/>
                                                    Delete message
                                                </ContextMenuItem>
                                            </ContextMenuContent>
                                        </ContextMenu>
                                    </div>
                                )}
                                {message.senderType === "user" && (
                                    <div key={index} className='bot mesage  w-full p-4 flex flex-row-reverse items-start gap-2 '>
                                        <Image alt='User Image' width={500} height={500} src={user.image || 'https://static.vecteezy.com/system/resources/previews/023/465/688/non_2x/contact-dark-mode-glyph-ui-icon-address-book-profile-page-user-interface-design-white-silhouette-symbol-on-black-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg'} className='w-6 h-6 rounded-full' />
                                        <ContextMenu>
                                            <ContextMenuTrigger>
                                                <div className='rounded-lg max-w-96 w-full bg-muted p-2 px-4 space-y-2'>
                                                    {message.image && <Image src={message.image} alt={"User Image"} width={600} height={600} className="w-full h-28 object-scale-down"/>}
                                                    <p className='text-sm font-medium text-muted-foreground'>
                                                    {bot.isRoleplay ? renderMessageWithBold(message.message,userDisplayName): message.message}
                                                    </p>
                                                </div>
                                            </ContextMenuTrigger>
                                            <ContextMenuContent>
                                                <ContextMenuItem onClick={() => handleDeleteMessage(message.id)} className="text-destructive flex items-center gap-2">
                                                    <Trash2 size={20}/>
                                                    Delete message
                                                </ContextMenuItem>
                                            </ContextMenuContent>
                                        </ContextMenu>
                                    </div>
                                )}
                                </>
                            )
                        })}
                        {botResponseLoading && (
                            <div className='bot mesage  w-full p-4 flex items-start gap-2 '>
                            <Image alt='bot-image' width={500} height={500}  src={bot.image || ""} className='w-6 h-6 rounded-full' />
                                <div className='rounded-lg max-w-96 w-full bg-muted p-2 px-4'>
                                    <p className='text-sm font-medium text-muted-foreground italic opacity-80'>
                                        Typing...
                                    </p>
                                </div>
                            </div>
                        )}
                       
                       
                    </div>
                </div>
                {imageModal && (
                    <ImageModalChat 
                        loading={loading} 
                        imageBase64={imageBase64}  
                        onSendImageMessage={onSendImageMessage} 
                        setImageModal={setImageModal} 
                        setUserMessage={setUserMessage}
                        setImageBase64={setImageBase64}
                        setImageType={setImageType}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        imageType={imageType}

                    />
                )}
                <div className='mt-6'>
                    
                </div>
                
                    <div className='border-t fixed bottom-0 w-full p-4 max-w-screen-md left-1/2 -translate-x-1/2 backdrop-blur-md z-[20]'>
                        <div className='w-full  relative flex items-start gap-2 overflow-hidden'>
                   
                            <Textarea ref={inputFieldRef} onKeyDown={(e) => handleInputKeyDown(e)} className='bg-muted pr-24 !max-h-32 w-full input-field-chat-ai' value={userMessage} placeholder='Enter a message...' onChange={(e) => setUserMessage(e.target.value)}/>
                            <div className="absolute right-2 top-3 flex items-center">
                                {(
                                    <Button size={"icon"} variant={"ghost"} disabled={loading || imageModal} onClick={onClickOpenModal} className="!p-1 rounded-full hover:bg-foreground/10">
                                        <Camera size={22}/>
                                    </Button>
                                )}
                                <Button size={"icon"} variant={"ghost"} disabled={userMessage === "" || loading || imageModal} onClick={onSubmit} className="!p-1 rounded-full hover:bg-foreground/10">
                                    <FaPaperPlane />
                                </Button>

                            </div>
                                
                        </div>
                    </div>
               
            </div>
  )
}

export default ChatUI