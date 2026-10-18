// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import LayoutWithSidebar from "@/src/layouts/LayoutWithSidebar";

// export default async function ProtectedLayout({ children }) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     redirect("/");
//   }

//   return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
// }

//////////////////////////////////////
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LayoutWithSidebar from "@/src/layouts/LayoutWithSidebar";

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
