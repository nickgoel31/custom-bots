// Import necessary modules
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import Navbar from "./(main)/(dashboard)/_components/navbar";
import HomeNavbar from "@/components/home-nav";

// Initialize the Inter font with desired subsets
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the page
export const metadata: Metadata = {
  title: "Custom Bot",
  description: "Created with ♥ by Harsh.",
};

// Define the RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // // Fetch session data asynchronously
  // const session = await auth();
  
  // // If no session or user is present, render nothing
  // if (!session || !session.user) return null;
  
  // Render the layout with the session provider
  return (
    // <SessionProvider session={session}>
      <html lang="en"> {/* This is the corrected placement */}
        <body className={inter.className}> {/* Body tag should wrap the content */}
          <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
          <Toaster />
        </body>
      </html>
    // </SessionProvider>
  );
}
