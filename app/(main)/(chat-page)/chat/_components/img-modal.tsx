"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { imageUrlToBase64 } from "@/helpers/imgurl-to-base64";
import { UploadDropzone } from "@/utils/uploadthing";
import { LucideSquareBottomDashedScissors } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";


const ImageModalChat = ({loading, imageType,setImageType,imageBase64, setImageBase64, uploadedImageUrl, setUploadedImageUrl,setImageModal,setUserMessage, onSendImageMessage}:{loading:boolean, imageType: string, setImageType: (imageType:string) => void,imageBase64:string, setImageBase64: (imageBase64:string) => void, uploadedImageUrl:string, setUploadedImageUrl:(imageUrl:string) => void ,setImageModal: (modal:boolean)=>void, setUserMessage: (string:string) => void, onSendImageMessage:() => void}) => {
    // const [uploadedImageUrl, setUploadedImageUrl] = useState("")
    // const [imageType, setImageType] = useState("")
    // const [imagePrompt, setImagePrompt] = useState<string>("")
    // const [imageBase64, setImageBase64] = useState<string | undefined>("")

    useEffect(() => {
        async function get64(){
            if(uploadedImageUrl === "") return;
            setImageBase64(await imageUrlToBase64(uploadedImageUrl))
        }
        get64()
        
    },[uploadedImageUrl])

    function onSend(){
        //DO SOMETHING
        if(!imageBase64 || !imageType) {
            console.log("no Image Base 64")
            return;
        }
        //SEND CALLBACK
        onSendImageMessage()
        setImageModal(false)

        // generateImageOutputs(imageBase64,imageType,imagePrompt).then((res) => {
        //     setOutput(res.text)
        // })
    }
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[10] backdrop-blur-lg animate-in">
        <span className="z-[9] absolute left-0 top-0 w-full h-full " onClick={() => setImageModal(false)}></span>
        <div className=" w-96 border bg-background rounded-lg p-4 shadow-xl space-y-4 z-[11] animate-in">
            {uploadedImageUrl ? (
                <div className="w-full h-64 relative overflow-hidden cursor-pointer group">
                    <span onClick={() => setUploadedImageUrl("")} className="opacity-0 transition absolute w-full h-full bg-background/50 group-hover:opacity-100 flex items-center justify-center z-[10] backdrop-blur-sm font-semibold text-lg">
                        Remove image
                    </span>
                    <Image  src={uploadedImageUrl} alt="" width={1000} height={1000} className="w-full h-full object-scale-down"/>
                </div>
            ):(
                <UploadDropzone 
                    className='bg-foreground/5 h-64 w-full'
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    setUploadedImageUrl(res[0].url)
                    setImageType(res[0].type)
                    alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                    }}
                />   
            )} 

            <div className="relative">
                <Input className="w-full pr-14" placeholder="Type Message..." onChange={(e) => setUserMessage(e.target.value)}/>
                <Button size={"icon"} variant={"ghost"} disabled={loading || !!!imageBase64} onClick={onSend} className="!p-1 rounded-full hover:bg-foreground/10 absolute right-2 top-1/2 -translate-y-1/2 z-[3]">
                    <FaPaperPlane />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ImageModalChat