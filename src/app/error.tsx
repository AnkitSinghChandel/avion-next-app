"use client";
import React from "react";
import { Button, Result } from "antd";
import { AddButton } from "@/src/components/buttons/GlobalButtons";

type typeProps = {
  title: string;
  age: number;
  isActive: boolean;
};

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error;
  data: object;
  reset: () => void;
}) => {
  return (
    <div style={{ padding: 40, textAlign: "center", display: "none" }}>
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
};

// export default ErrorPage;

const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <div>
      <Result
        status="500"
        title="500"
        // subTitle="Sorry, something went wrong."
        subTitle={
          <div
            style={{
              padding: "20px",
              border: "1px solid red",
              backgroundColor: "#ffe6e6",
              borderRadius: "8px",
              margin: "20px 0",
              display: process.env.NEXT_PUBLIC_ENV === "prod" ? "none" : "",
            }}
          >
            {/* <h1>{props.title}</h1> */}
            <p style={{ color: "darkred" }}>
              {error?.statusText || error?.message || "Unknown error"}
            </p>
            <h1>Ooops... Something went wrong!</h1>
            <h1>
              A technical error has occurred. Please reload the page. If it
              keeps happening, reach out to our support team.
            </h1>
          </div>
        }
        extra={
          <AddButton
            className="mt-"
            label={"Try Again"}
            onClick={() => {
              window.location.reload();
            }}
          />
        }
      />
    </div>
  );
};

export default ErrorBoundary;
