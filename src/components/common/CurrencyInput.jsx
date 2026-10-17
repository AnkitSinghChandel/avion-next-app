import React from "react";
import { NumericFormat } from "react-number-format";

export const CurrencyInput = ({
  formatType = "currency", // currency | number
  currencyFormat = localStorage.getItem("currencyFormat") || "INR",
  className,
  style,
  value,
  onValueChange,
  placeholder = "Enter amount",
  decimalScale = 2,
  fixedDecimalScale = true,
  allowNegative = false,
  ...rest
}) => {
  let prefix = "";
  let thousandSeparator = ",";
  let decimalSeparator = ".";

  if (currencyFormat === "INR") {
    prefix = formatType === "currency" ? "₹ " : "";
  }

  if (currencyFormat === "USD") {
    prefix = formatType === "currency" ? "$ " : "";
  }

  if (currencyFormat === "EUR") {
    prefix = formatType === "currency" ? "€ " : "";
    thousandSeparator = ".";
    decimalSeparator = ",";
  }

  if (currencyFormat === "JPY") {
    prefix = formatType === "currency" ? "¥ " : "";
  }

  if (currencyFormat === "CNY") {
    prefix = formatType === "currency" ? "¥ " : "";
  }

  return (
    <NumericFormat
      className={className}
      style={style}
      prefix={prefix}
      value={value}
      onValueChange={onValueChange}
      //   placeholder={placeholder}
      placeholder={`${prefix}${placeholder}`}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      // decimalScale={decimalScale}
      // fixedDecimalScale={fixedDecimalScale}
      decimalScale={currencyFormat !== "JPY" ? decimalScale : 0}
      fixedDecimalScale={currencyFormat !== "JPY" ? fixedDecimalScale : false}
      allowNegative={allowNegative}
      {...rest}
    />
  );
};
