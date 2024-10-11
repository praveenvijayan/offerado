import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Define the SessionClaims type with optional metadata properties
type SessionClaims = {
  metadata?: {
    role?: "Business" | "Admin" | string;
  };
};

// Create a public route matcher
const isPublicRoute = createRouteMatcher([
  "/",
  "/landing",
  "/login(.*)",
  "/afterlogin(.*)",
  "/signup(.*)",
  "/api/(.*)",
]);

// Middleware logic with proper type checks
export default clerkMiddleware((auth, request: NextRequest) => {
  // If the route is public, don't apply any auth protection
  if (isPublicRoute(request)) {
    return;
  }

  // Protect non-public routes
  auth().protect();

  // Retrieve session claims
  const { sessionClaims }: { sessionClaims: SessionClaims | null } = auth();

  // Check user role and return a 401 response if unauthorized
  if (
    sessionClaims?.metadata?.role === "Business" ||
    sessionClaims?.metadata?.role === "Admin"
  ) {
    return;
  }

  return new NextResponse("Unauthorized", { status: 401 });
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
