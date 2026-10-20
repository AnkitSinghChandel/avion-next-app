// import Image from "next/image";
// import FirstHome from "@/src/app/home/FirstHome";

// export default function Home() {
//   return (
//     <div className="">
//       <FirstHome />
//     </div>
//   );
// }

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FirstHome from "@/src/app/home/FirstHome";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="">
      <FirstHome />
    </div>
  );
}
