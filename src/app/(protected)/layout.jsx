import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LayoutWithSidebar from "@/src/layouts/LayoutWithSidebar";

export default async function ProtectedLayout({ children }) {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;

  // if (!token) {
  //   redirect("/");
  // }

  return <LayoutWithSidebar>{children}</LayoutWithSidebar>;
}
