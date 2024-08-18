import { decrypt } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { verifyOrRefreshToken } from "@/lib/auth"; // Adjust import path as needed

export default async function middleware(req: NextRequest) {
  // console.log("Middleware called for path:", req.nextUrl.pathname);

  const protectedRoutes = ["/home"];
  const currentPath = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(currentPath);

  // console.log("Is protected route:", isProtected);

  if (isProtected) {
    // Get cookies
    const cookie = req.cookies.get("session")?.value;
    const refreshToken = req.cookies.get("refresh")?.value;
    const accessToken = req.cookies.get("access")?.value;

    try {
      // Check for valid session
      const session = await decrypt(cookie);
      if (!session?.userId) {
        // console.log("Invalid session, redirecting to login");
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      }

      // Verify or refresh tokens
      if (accessToken && refreshToken) {
        console.log("Attempting to verify or refresh token");
        try {
          const newAccessToken = await verifyOrRefreshToken(
            accessToken,
            refreshToken
          );
          if (newAccessToken && newAccessToken !== accessToken) {
            // Set new access token in cookies only if it's different
            const response = NextResponse.next();
            response.cookies.set("access", newAccessToken, {
              secure: true,
              path: "/",
            });
            console.log("New access token set in cookies");
            return response;
          }
        } catch (error: any) {
          console.error("Error in verifyOrRefreshToken:", error.message);
          console.error("Error details:", error);
        }
      } else {
      }
    } catch (error: any) {
      console.error("Error verifying or refreshing token:", error.message);
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  return NextResponse.next();
}
