import HomeNavbar from '@/components/home-nav'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="w-full bg-foreground/5 min-h-screen">
            <HomeNavbar />
            <div className="pt-16 w-full max-w-screen-xl mx-auto p-4 py-4">
              {children}
            </div>
          </div>
  )
}

export default Layout