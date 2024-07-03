"use client"

import { UploadButton, UploadDropzone } from '@/utils/uploadthing';
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Plus, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ControllerRenderProps } from 'react-hook-form';
import Image from 'next/image';
  

const UploadBotPicDialog = ({onChange,field}:{onChange: (e: any) => void, field:  ControllerRenderProps<{
    name: string;
    imageUrl: string;
    gender: string;
    introduction: string;
    description: string;
    isPublic: boolean;
    isDraft: boolean;
    category: string;
    introMessage?: string | undefined;
    personality?: string | undefined;
    speakingStyle?: string | undefined;
    physicalFeatures?: string | undefined;
    isVerified?: boolean | undefined;
    isRoleplay?: boolean | undefined;
}, "imageUrl">}) => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState(field.value)

    useEffect(() => {
        onChange(uploadedImageUrl)
    },[uploadedImageUrl, onChange])
  return (
   
        <Dialog>
            <DialogTrigger>
                <div className='w-20 h-20 rounded-full border flex items-center justify-center relative overflow-hidden group'>
                    {field.value.length > 0 ? (
                        <Image src={field.value} alt={"Picture of bot"} width={200} height={200} className="w-full h-full absolute top-0 left-0"/>
                    ):(
                        <div className='w-full h-full flex items-center justify-center'>
                            <p className='text-muted-foreground'>Upload</p>
                        </div>
                    
                    )}
                    <div className='absolute top-0 left-0 z-[2] backdrop-blur-lg group-hover:opacity-100 opacity-0 w-full h-full transition flex items-center justify-center'>
                        <Plus size={20} />
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className=''>
                <div className='flex flex-col gap-5 w-full'>
                    <div className='flex flex-col items-center justify-center gap-4 w-full'>
                        <div>
                            <Button disabled className='flex items-center gap-2' variant={"outline"}>
                                <Sparkles size={20} className='text-violet-400'/>
                                Generate with AI
                            </Button>
                            <p className='text-muted-foreground text-xs font-medium text-center mt-1'>Coming soon</p>
                        </div>
                        <p className='font-medium text-sm text-muted-foreground'>OR</p>
                        <div className='space-y-2 w-full flex flex-col items-end '>
                            <Input placeholder='Paste URL of the image' className='py-5' {...field}/>
                            <DialogClose>
                                <Button>Done</Button>
                            </DialogClose>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <UploadDropzone
                            className='bg-foreground/5'
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                            // Do something with the response
                            console.log("Files: ", res[0].url);
                            setUploadedImageUrl(res[0].url)
                            alert("Upload Completed");
                            }}
                            onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                            }}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
  )
}

export default UploadBotPicDialog


{/* <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                        // Do something with the response
                        console.log("Files: ", res);
                        alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                        }}
                    /> */}