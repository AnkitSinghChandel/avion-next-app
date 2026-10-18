import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Loader from "@/src/components/common/Loader";
import LayoutWithSidebar from "@/src/layouts/LayoutWithSidebar";

export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  // return <LayoutWithSidebar>{children}</LayoutWithSidebar>
  return (
    <LayoutWithSidebar>
      <Suspense fallback={<DashboardFallback />}>{children}</Suspense>
    </LayoutWithSidebar>
  );
}

function DashboardFallback() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader />
    </div>
  );
}
