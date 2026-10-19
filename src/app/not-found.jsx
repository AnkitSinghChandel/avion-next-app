import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
      <p>Ye page nahi mila.</p>
      <Link href="/">Home pe jao</Link>
    </div>
  );
}
