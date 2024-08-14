"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.SECRET);

if (!key) {
  throw new Error("SECRET environment variable is not set.");
}

const cookieObj = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: number) {
  if (!userId) throw new Error("Invalid user ID");
  const expires = new Date(Date.now() + cookieObj.duration);
  const session = await encrypt({ userId, expires });

  cookies().set(cookieObj.name, session, { ...cookieObj.options, expires });
}

export async function verifySession() {
  const cookie = cookies().get(cookieObj?.name)?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    redirect("/login");
  }
  return { userId: session.userId };
}

export async function deleteSession() {
  cookies().delete(cookieObj.name);
}
