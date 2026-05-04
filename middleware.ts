import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAuthRouter = createRouteMatcher(['/sign-in', '/sign-up'])

export default clerkMiddleware(
  async (auth, req) => {
    const {userId} = await auth()
    if (!userId && !isAuthRouter(req)) {
      // NOTE: don't forget to change the url before deploy
      return NextResponse.redirect(new URL('http://localhost:3000/sign-up'))
    }
}
);

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
