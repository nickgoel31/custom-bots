import { auth } from "@/auth"
import requestIp from 'request-ip'
 
export default auth((req) => {
  if (!req.auth ) {
    if(req.nextUrl.pathname !== "/sign-in"){
      const newUrl = new URL("/sign-in", req.nextUrl.origin)
      return Response.redirect(newUrl)
    }
    
  }
  if(req.auth && req.nextUrl.pathname === "/sign-in"){
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  
  return
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }