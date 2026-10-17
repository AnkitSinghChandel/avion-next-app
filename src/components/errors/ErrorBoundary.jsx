import React from "react";
import { useRouteError } from "react-router";
import { Button, Result } from "antd";
import { AddButton } from "../buttons/GlobalButtons";

const ErrorBoundary = (props) => {
  const error = useRouteError();
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
              display: process.env.NEXT_PUBLIC_ENV === "dev" ? "none" : "",
            }}
          >
            <h1>{props.title}</h1>
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
