import React from "react"
import { getUserByEmail } from "@/helpers/get-user"
import { redirect } from 'next/navigation'

export default  function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
   
        <>
        {children}
        </>
  
  );
}
