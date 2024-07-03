"use client"

import { updateUserDisplayName } from '@/actions/update-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { toast } from 'sonner'

const DisplayNameInput = ({displayName,userId}:{displayName:string,userId:string}) => {
    const [displayNameState, setDisplayName] = useState(displayName)
    const [loading,setLoading] = useState(false)

    const isSameNameAsBefore = displayNameState === displayName;
    function handleChange(){
        setLoading(true)
        updateUserDisplayName(userId,displayNameState)
        .then((res) => {
            if(res.success){
                setLoading(false)
                toast("Updated name")
            }
            else{
                setLoading(false)
                toast("Error updating name try again later.")
                console.log(res.error)
            }
        })
    }
  return (
    <div className='display name flex flex-col gap-1 '>
          <h1 className='font-semibold  leading-normal'>Display Name</h1>
          <p className='text-muted-foreground text-sm font-medium'>
            This is the name bot&apos;s will refer to you as.
          </p>
          <div className='flex items-center gap-3'>
            <Input placeholder='User' onChange={(e) => setDisplayName(e.target.value)} value={displayNameState} className='max-w-96'/>
            <Button disabled={loading || isSameNameAsBefore} onClick={handleChange}>Save</Button>
          </div>
        </div>
  )
}

export default DisplayNameInput