"use server";
// ye vo functions hai jo ham server se direct call kara sakte hai
import { cookies } from "next/headers";

export async function saveToken(token) {
  if (!token) {
    throw new Error("Token missing");
  }

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}
