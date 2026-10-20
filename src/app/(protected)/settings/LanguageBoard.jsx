"use client";
import React, { useEffect, useState } from "react";
import "./Settings.css";
import { Button, Flex, Modal, ColorPicker } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const LanguageBoard = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("languageFormat") || "en",
  );
  const languageOptions = ["en", "hi", "nl", "fr"];
  const languageOptions2 = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "nl", label: "Dutch" },
    { code: "fr", label: "French" },
  ];
  const { t, i18n } = useTranslation();

  return (
    <div className="boardDivCss group">
      <div className="flex gap-2 items-center pb-3">
        <div className="bg-[#f1ece8] rounded-lg p-2 px-3 w-fit">
          <GlobalOutlined className="group-hover:text-amber-500! icon" />
        </div>
        <div>
          <p className="ps-1 text-(--badge-bg) text-[14px] font-medium flex flex-wrap">
            Language Format &nbsp;{" "}
            <span className="text-xs text-blue-500 bg-blue-100 rounded-xl px-2 py-0.5 text-center">
              Development in Progress
            </span>
          </p>
          <p className="ps-1 text-gray-500 text-[13px] font-medium">
            Choose your preferred language
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 w-full pt-3 ps-1 text-gray-500 text-[13px] font-medium">
        {languageOptions2.map((item) => (
          <label key={item} className="flex gap-1 items-center pointer">
            <input
              type="radio"
              name="language" // same name important
              className="w-4 h-4 accent-[#8D7B68]"
              // value={item}
              // checked={language === item}
              value={item.code}
              checked={language === item.code}
              onChange={(e) => {
                setLanguage(e.target.value);
                i18n.changeLanguage(e.target.value);
                localStorage.setItem("languageFormat", e.target.value);
              }}
            />
            {item.label}
          </label>
        ))}
        {/* <p>Selected: {language}</p> */}
      </div>
    </div>
  );
};

export default React.memo(LanguageBoard);
