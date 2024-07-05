import React from "react"
import { getUserByEmail } from "@/helpers/get-user"
import { redirect } from 'next/navigation'
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
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
