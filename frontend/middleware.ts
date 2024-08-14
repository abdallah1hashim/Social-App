import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyOrRefreshToken } from "@/lib/auth"; // Adjust import path as needed

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ["/home"];
  const currentPath = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(currentPath);

  if (isProtected) {
    // Get cookies
    const cookie = cookies().get("session")?.value;
    const refreshToken = cookies().get("refreshToken")?.value;
    const accessToken = cookies().get("accessToken")?.value;

    // Check for valid session
    const session = await decrypt(cookie);
    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    try {
      // Verify or refresh tokens
      if (accessToken && refreshToken) {
        const newAccessToken = await verifyOrRefreshToken(
          accessToken,
          refreshToken
        );
        if (newAccessToken) {
          // Set new access token in cookies
          const response = NextResponse.next();
          response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,

            path: "/",
          });
          return response;
        }
      }
    } catch (error: any) {
      console.error("Error verifying or refreshing token:", error.message);
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  return NextResponse.next();
}
