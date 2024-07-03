"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UploadButton } from "@/utils/uploadthing"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import UploadBotPicDialog from "./upload-pic-dialog"
import Image from "next/image"
import { botSchema, gendersArray } from "@/schemas"
import useAuth from "@/hooks/useAuth"
import { useSession } from "next-auth/react"
import { createBotInDb } from "@/actions/create-bot"
import { redirect, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Bot } from "@prisma/client"
import { updateBotInDb } from "@/actions/update-bot"
import { Switch } from "./ui/switch"
import { botCategories } from "@/types"
  






function EditBotForm({bot}:{bot:Bot}) {
    const session = useSession()
    const [botUpdated, setBotUpdated] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)

    
    
  // 1. Define your form.
  const form = useForm<z.infer<typeof botSchema>>({
    resolver: zodResolver(botSchema),
    defaultValues: {
        imageUrl: bot.image || "",
      name: bot.name,
      gender: bot.gender,
        introduction: bot.introduction,
        description: bot.description,
        introMessage: bot.introMessage || "",
        personality: bot.personality || "",
        speakingStyle: bot.speakingStyle || "",
        physicalFeatures: bot.physicalFeatures || "",
        isPublic: bot.isPublic,
        isDraft: bot.isDraft,
        isVerified: bot.isVerified,
        category: bot.category || "",
        isRoleplay: bot.isRoleplay || false,
    },
  })

  useEffect(() => {
    if(botUpdated){
        alert("Bot Updated successfully")
        redirect("/dashboard")
    }
  },[botUpdated])
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof botSchema>) {
    setLoading(true)
    if(!session || !session.data || !session.data.user || !session.data.user.email) return;
    updateBotInDb(values, bot.id, session.data.user.email)
        .then(res => {
            if(res.messageCode === "S001"){
                setBotUpdated(true)
                setLoading(false)
            }
        })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
                <FormItem className="flex flex-col items-center w-full">
                <FormControl>
                    <UploadBotPicDialog onChange={field.onChange} field={field}/>
                </FormControl>
                <FormDescription>
                    Upload a picture of your bot
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        
        <div className="flex items-center gap-5 w-full">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full flex-[1.5]">
                <FormLabel>Name*</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                    This will be your bot&apos;s public name
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full flex-1">
                <FormLabel>Gender*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-64">
                        {gendersArray.map((gender,index)=>(
                            <SelectItem key={index} value={gender}>{`${gender.split("")[0].toUpperCase()}${gender.slice(1)}`}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormDescription>
                    This will be your bot&apos;s gender
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
       
        </div>

        <FormField
            control={form.control}
            name="introduction"
            render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full flex-[1.5]">
                <FormLabel>Introduction*</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                    Introduce your bot
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full flex-[1.5]">
                <FormLabel>Description*</FormLabel>
                <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                    Describe your bot. The more detailed the description the better the bot will behave.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="introMessage"
            render={({ field }) => (
                <FormItem className="flex flex-col items-start w-full flex-[1.5]">
                <FormLabel>Introductory Message</FormLabel>
                <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                    This message will be sent to the user when they first interact with the bot.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        <div className="flex flex-col items-start justify-start gap-4 w-full">
        <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full flex-1">
                    <FormLabel>Category*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                            {botCategories.map((category,index)=>(
                                <SelectItem key={index} value={category}>{`${category.split("")[0].toUpperCase()}${category.slice(1)}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        Choose a category for your bot
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 px-6 w-full">
                  <div className="text-start">
                    <FormLabel className="">Public</FormLabel>
                    <FormDescription>
                        Make your bot public
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isDraft"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 px-6 w-full">
                  <div className="text-start">
                    <FormLabel className="">Draft</FormLabel>
                    <FormDescription>
                        Save your bot as a draft
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isRoleplay"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 px-6 w-full">
                  <div className="text-start">
                    <FormLabel className="">Roleplay</FormLabel>
                    <FormDescription>
                        Enable roleplay mode
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
        </div>

        <Accordion type="single" collapsible>
        <AccordionItem value="advanced">
            <AccordionTrigger>Advanced Settings</AccordionTrigger>
            <AccordionContent className="space-y-8">
                <FormField
                control={form.control}
                name="personality"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full flex-[1.5]">
                    <FormLabel>Personality</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                        Describe your bot&apos;s personality
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="physicalFeatures"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full flex-[1.5]">
                    <FormLabel>Physical Features</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                        Describe your bot&apos;s physical features
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="speakingStyle"
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full flex-[1.5]">
                    <FormLabel>Speaking Style</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                        Describe your bot&apos;s speaking style
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </AccordionContent>
        </AccordionItem>
        </Accordion>



        <Button disabled={loading} type="submit">
            {loading ? "Updating..." : "Update bot"}
        </Button>
      </form>
    </Form>
  )
}

export default EditBotForm
