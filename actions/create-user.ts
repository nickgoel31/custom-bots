"use server"

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server"

export async function createUserInDB(){
    const user = await currentUser()
    if(!user || !user.primaryEmailAddress?.emailAddress || !user.primaryEmailAddress.verification) return;

    const isUserVerified = user.primaryEmailAddress.verification.status === "verified"

    // Create user in DB
    const createdUser = await db.user.create({
        data:{
            email: user.primaryEmailAddress.emailAddress,
            emailVerified: isUserVerified,
            displayName: user.fullName,
            image: user.imageUrl,
            clerkId: user.id
        }
    })

    return createdUser


}