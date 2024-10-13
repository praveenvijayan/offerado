import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Create a public route matcher
const isPublicRoute = createRouteMatcher([
  "/",
  "/landing",
  "/login(.*)",
  "/afterlogin(.*)",
  "/onboarding(.*)",
  "/signup(.*)",
  "/api/(.*)",
]);

// Middleware logic with proper type checks
export default clerkMiddleware(async (auth, request: NextRequest) => {
  // If the route is public, don't apply any auth protection
  if (isPublicRoute(request)) {
    return;
  }

  // Protect non-public routes
  auth().protect();

  const url = new URL(request.url);
  url.pathname = "/api/users/get-role";

  const roleResponse = await fetch(url.toString(), {
    headers: {
      Cookie: request.headers.get("cookie") || "",
    },
  });

  if (!roleResponse.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { role } = await roleResponse.json();

  // Check user role and return a 401 response if unauthorized
  if (role === "Business" || role === "Admin") {
    return NextResponse.next();
  }

  return new NextResponse("Forbidden", { status: 403 });
});

// Export matcher configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
