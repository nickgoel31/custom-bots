import React from "react"

import Navbar from "../../(dashboard)/_components/navbar";


export default  function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    
      <div className="w-full bg-foreground/5 min-h-screen">
        <Navbar />
        <div className="pt-16 w-full max-w-screen-xl mx-auto p-4 py-4">
          {children}
        </div>
      </div>

  );
}
