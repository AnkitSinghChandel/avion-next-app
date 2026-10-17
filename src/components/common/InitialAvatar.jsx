import React from "react";

export const SmallInitialAvatar = (props) => {
  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        background: "var(--badge-bg)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "14px",
        color: "white",
        boxShadow: "rgba(0, 0, 0, 0.45) 0px 5px 10px",
      }}
      className={props.className}
    >
      {props?.firstName?.charAt(0).toUpperCase()}
      {props?.lastName?.charAt(0).toUpperCase()}
    </div>
  );
};

export const MedInitialAvatar = (props) => {
  return (
    <div
      style={{
        width: "70px",
        height: "70px",
        background: "var(--badge-bg)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        color: "white",
        boxShadow: "rgba(0, 0, 0, 0.45) 0px 5px 10px",
        // 👇 Parent ka style yaha hoga
        ...props.style,
      }}
      className={props.className}
    >
      {props?.firstName?.charAt(0).toUpperCase()}
      {props?.lastName?.charAt(0).toUpperCase()}
    </div>
  );
};

export const BigInitialAvatar = (props) => {
  return (
    <div
      style={{
        // width: "70px",
        // height: "70px",
        background: "var(--badge-bg)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        color: "white",
        boxShadow: "rgba(0, 0, 0, 0.45) 0px 5px 10px",
        // 👇 Parent ka style yaha hoga
        ...props.style,
      }}
      className={props.className}
    >
      {props?.firstName?.charAt(0).toUpperCase()}
      {props?.lastName?.charAt(0).toUpperCase()}
    </div>
  );
};

export const BigInitialAvatar2 = (props) => {
  return (
    <div
      style={{
        // width: "70px",
        // height: "70px",
        background: "var(--badge-bg)",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        color: "white",
        boxShadow: "rgba(0, 0, 0, 0.45) 0px 5px 10px",
        // 👇 Parent ka style yaha hoga
        ...props.style,
      }}
      className={props.className}
    >
      {/* {props?.firstName */}
      {`${props?.firstName || ""} ${props?.lastName || ""}`
        ?.trim()
        .split(" ")
        .slice(0, 2) // agar max 2 hi Initial chahiye to.
        .map((x) => x[0])
        .join("")
        .toUpperCase()}
    </div>
  );
};
