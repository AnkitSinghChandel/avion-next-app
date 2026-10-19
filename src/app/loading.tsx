export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="spinner">Loading...</div>
    </div>
  );
}

function AppFallback() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading...
    </div>
  );
}
