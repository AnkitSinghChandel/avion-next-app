"use client";
import React, { useEffect, useState } from "react";
import "./Settings.css";
import { Button, Flex, Modal, ColorPicker } from "antd";
import { AlipayOutlined } from "@ant-design/icons";

const CurrencyBoard = () => {
  const [currency, setCurrency] = useState(
    localStorage.getItem("currencyFormat") || "INR",
  );
  const currencyOptions = ["INR", "USD", "EUR"];

  return (
    <div className="boardDivCss group">
      <div className="flex gap-2 items-center pb-3">
        <div className="bg-[#f1ece8] rounded-lg p-2 px-3 w-fit">
          <AlipayOutlined className="group-hover:text-amber-500! icon" />
        </div>
        <div>
          <p className="ps-1 text-(--badge-bg) text-[14px] font-medium">
            Curency Format
          </p>
          <p className="ps-1 text-gray-500 text-[13px] font-medium">
            Choose your preferred curency
          </p>
        </div>
      </div>

      <div className="flex gap-5 w-full pt-3 ps-1 text-gray-500 text-[13px] font-medium">
        {currencyOptions.map((item) => (
          <label key={item} className="flex gap-1 items-center pointer">
            <input
              type="radio"
              name="currency" // same name important
              className="w-4 h-4 accent-[#8D7B68]"
              value={item}
              checked={currency === item}
              onChange={(e) => {
                setCurrency(e.target.value);
                localStorage.setItem("currencyFormat", e.target.value);
                // window.location.reload();
              }}
            />
            {item}
          </label>
        ))}
        {/* <p>Selected: {currency}</p> */}
      </div>
    </div>
  );
};

export default React.memo(CurrencyBoard);
