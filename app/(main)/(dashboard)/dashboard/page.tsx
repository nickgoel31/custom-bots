import React from 'react'
import "@sjmc11/tourguidejs/src/scss/tour.scss" // Styles
import {TourGuideClient} from "@sjmc11/tourguidejs/src/Tour" // JS
import { TourGuideOptions } from '@sjmc11/tourguidejs/src/core/options'
import introJs from 'intro.js'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DisplayNameInput from '../_components/display-name-input'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getUserByEmail } from '@/helpers/get-user'

const DashboardPage = async  () => {
  // const fetchIpAddress = async () => {
  //   try {
  //     const response = await fetch("/api/get-ip-address");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch IP address");
  //     }
  //     const data = await response.json();
  //     console.log(data.ipAddress); // Assuming the response JSON structure includes ipAddress
  //   } catch (error) {
  //     console.error("Error fetching IP address:", error);
  //   }
  // };
  
  // fetchIpAddress();
  const session = await auth()
  if (!session || !session.user?.email) redirect("/sign-in")
  const user = await getUserByEmail(session.user.email)
  if(!user) return;
  
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