import React from "react"
import Navbar from "../_components/navbar";
import { auth } from "@/auth"
import { getUserByEmail } from "@/helpers/get-user"
import { redirect } from 'next/navigation'
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  if (!session || !session.user?.email) redirect("/sign-in")
  const user = await getUserByEmail(session.user.email)
  if(!user) return;
  return (
    <SessionProvider session={session}>
      <div className="w-full bg-foreground/5 min-h-screen">
        <Navbar />
        <div className="pt-16 w-full max-w-screen-xl mx-auto p-4 py-4">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
