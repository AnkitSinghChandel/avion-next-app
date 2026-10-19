"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Kuch galat ho gaya</h2>
      <p style={{ color: "#6b7280" }}>{error?.message || "Unexpected error"}</p>
      <button
        onClick={() => reset()}
        style={{ marginTop: 16, padding: "8px 16px", cursor: "pointer" }}
      >
        Dobara try karo
      </button>
    </div>
  );
}
