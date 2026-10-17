import React from "react";
import { ReactBarcode } from "react-jsbarcode";

// Pharmaceutical industry ke liye bana hai, Sirf numbers support karta hai, Chhoti information encode karta hai. 👇
// format: "pharmacode",
// (Most Common) Letters + Numbers dono support karta hai. 👇
// format: "CODE128",

const BarcodeGenerator = ({ textValue }) => {
  return (
    <div
      className=""
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "8px 10px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ReactBarcode
        value={String(textValue ?? "No Data")}
        options={{
          format: "CODE128",
          // lineColor: "#6a5a50",
          lineColor: "var(--badge-bg)",
          // width: 2,
          height: 30,
          displayValue: true,

          // Text styling
          fontSize: 16,
          // textMargin: 5,
          margin: 0,
        }}
        renderer="svg"
      />
    </div>
  );
};
export default BarcodeGenerator;
