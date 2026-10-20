"use server";
// ye vo functions hai jo ham server se direct call kara sakte hai
import { cookies } from "next/headers";

export const saveToken = async (token) => {
  if (!token) {
    throw new Error("Token missing");
  }

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "prod",
    sameSite: "lax",
    path: "/",
    // maxAge: 60 * 60 * 24 * 7, // 7 days
    maxAge: 60 * 60 * 24, // 1 days
  });

  return { success: true };
};

export const getIsToken = async () => {
  const cookieStore = await cookies();
  return !!cookieStore.get("token")?.value; // true / false
};

export const getToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null; // actual token
};

export const clearToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return { success: true };
};
