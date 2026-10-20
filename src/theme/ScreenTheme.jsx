"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Flex, Modal, ColorPicker } from "antd";
import { BgColorsOutlined } from "@ant-design/icons";
import { Palette } from "lucide-react";
import { useTranslation } from "react-i18next";

const ScreenTheme = (props) => {
  const router = useRouter();
  const path = usePathname();

  const { t, i18n } = useTranslation();

  const [screenTheme, setScreenTheme] = useState(
    localStorage.getItem("screenTheme") || "theme-default",
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("screenTheme") || "theme-default";
    setScreenTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (selectedTheme) => {
    setScreenTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("screenTheme", selectedTheme);
  };

  return (
    <div className="boardDivCss group">
      <div className="flex gap-2 items-center pb-3">
        <div className="bg-[#f1ece8] rounded-lg p-2 px-3 w-fit">
          <Palette
            className="text-xl group-hover:text-amber-500! icon"
            size={18}
          />
        </div>
        <div>
          <p className="ps-1 text-(--badge-bg) text-[14px] font-medium">
            App Theme
          </p>
          <p className="ps-1 text-gray-500 text-[13px] font-medium">
            Choose your preferred theme
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 items-center ps-1 text-gray-500 text-[13px] font-medium">
        <label className="flex gap-1 items-center pointer">
          <input
            type="radio"
            name="theme"
            value="theme-default"
            className="w-4 h-4 accent-[#8D7B68]"
            checked={screenTheme === "theme-default"}
            onChange={(e) => changeTheme(e.target.value)}
          />
          Default
        </label>

        <label className="flex gap-1 items-center pointer">
          <input
            type="radio"
            name="theme"
            value="theme-gold"
            className="w-4 h-4 accent-[#8D7B68]"
            checked={screenTheme === "theme-gold"}
            onChange={(e) => changeTheme(e.target.value)}
          />
          Luxury Gold
        </label>

        <label className="flex gap-1 items-center pointer">
          <input
            type="radio"
            name="theme"
            value="theme-ocean"
            className="w-4 h-4 accent-[#8D7B68]"
            checked={screenTheme === "theme-ocean"}
            onChange={(e) => changeTheme(e.target.value)}
          />
          Ocean
        </label>

        <label className="flex gap-1 items-center pointer">
          <input
            type="radio"
            name="theme"
            value="theme-blue"
            className="w-4 h-4 accent-[#8D7B68]"
            checked={screenTheme === "theme-blue"}
            onChange={(e) => changeTheme(e.target.value)}
          />
          Blue
        </label>
      </div>
    </div>
  );
};

export default ScreenTheme;
