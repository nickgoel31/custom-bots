import React from 'react'
import "@sjmc11/tourguidejs/src/scss/tour.scss" // Styles
import {TourGuideClient} from "@sjmc11/tourguidejs/src/Tour" // JS
import { TourGuideOptions } from '@sjmc11/tourguidejs/src/core/options'
import introJs from 'intro.js'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DisplayNameInput from '../_components/display-name-input'
import { redirect } from 'next/navigation'
import { getUserByEmail } from '@/helpers/get-user'
import { auth, currentUser, getAuth } from '@clerk/nextjs/server'
import { createUserInDB } from '@/actions/create-user'

const DashboardPage = async  () => {
  const userAuth = await currentUser()
  if(!userAuth?.emailAddresses[0].emailAddress) return;
  const user = await getUserByEmail(userAuth.emailAddresses[0].emailAddress)
  if(!user) {
    redirect("/dashboard/create-user")
  }
  
  
  return (
    <div className='w-full py-4 space-y-10'>
        <div className='flex items-center w-full justify-between'>
            <div>
                <h1 className='font-bold text-3xl leading-normal'>Dashboard</h1>
                <p className='text-muted-foreground text-sm font-medium'>
                    You can view and manage your dashboard here.
                </p>
            </div>

        </div>

        {/* <p className='text-muted-foreground font-medium'>
          Nothing in dashboard yet. Navigate to your bots or explore page to get started
        </p> */}
        <DisplayNameInput displayName={user.displayName || ""} userId={user.id}/>
    </div>
  )
}

export default DashboardPage