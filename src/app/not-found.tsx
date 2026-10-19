"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
      <p>Ye page nahi mila.</p>
      {/* <Link href="/">Home pe jao</Link> */}
      <button
        onClick={() => router.back()}
        style={{ marginRight: 12, padding: "8px 16px", cursor: "pointer" }}
      >
        Back
      </button>
    </div>
  );
}
