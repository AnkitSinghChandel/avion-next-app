import React from "react";
import loaderIcon from "../../assets/loader/tube-spinner.svg";

export const SpinnerLoader = ({
  className,
  width = 100,
  isFullScreen = false,
}) => {
  return (
    <div
      className1={
        isFullScreen
          ? "fixed inset-0 flex items-center justify-center bg-white/50 z-50"
          : "flex items-center justify-center"
      }
      className2={
        isFullScreen
          ? "fixed inset-0 flex items-center justify-center bg-white/40 z-50"
          : "flex items-center justify-center"
      }
      className={
        isFullScreen
          ? "fixed inset-0 flex items-center justify-center right-[-10%] bg-black/10 z-50"
          : "flex items-center justify-center"
      }
    >
      <img
        className={`m-auto ${className}`}
        src={loaderIcon}
        alt="Loading"
        width={width}
      />
    </div>
  );
};
