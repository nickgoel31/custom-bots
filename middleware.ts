import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  afterSignInUrl:"/dashboard",
  afterSignUpUrl: "/dashboard"
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
 
// export default auth((req) => {
//   if (!req.auth ) {
//     if(req.nextUrl.pathname !== "/sign-in"){
//       const newUrl = new URL("/sign-in", req.nextUrl.origin)
//       return Response.redirect(newUrl)
//     }
    
//   }
//   if(req.auth && req.nextUrl.pathname === "/sign-in"){
//     const newUrl = new URL("/dashboard", req.nextUrl.origin)
//     return Response.redirect(newUrl)
//   }
  
//   return
// })
