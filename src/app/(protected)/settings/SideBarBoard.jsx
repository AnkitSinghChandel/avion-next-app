"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Flex, Modal, ColorPicker } from "antd";
import { BgColorsOutlined } from "@ant-design/icons";
import { PanelLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const SideBarBoard = (props) => {
  const router = useRouter();
  const path = usePathname();

  const { t, i18n } = useTranslation();

  const [sidebarOption, setSidebarOption] = useState(
    localStorage.getItem("sidebarOption") || "1",
  );

  useEffect(() => {
    const savedOption = localStorage.getItem("sidebarOption") || "1";
    setSidebarOption(savedOption);
  }, []);

  return (
    <div className="boardDivCss group">
      <div className="flex gap-2 items-center pb-3">
        <div className="bg-[#f1ece8] rounded-lg p-2 px-3 w-fit">
          <PanelLeft
            className="text-xl group-hover:text-amber-500! icon"
            size={18}
          />
        </div>
        <div>
          <p className="ps-1 text-(--badge-bg) text-[14px] font-medium">
            Sidebar Layout
          </p>
          <p className="ps-1 text-gray-500 text-[13px] font-medium">
            Choose your preferred desktop sidebar layout
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 items-center ps-1 text-gray-500 text-[13px] font-medium">
        <label className="flex gap-1 items-center pointer">
          <input
            type="radio"
            name="sidebar-option"
            value="1"
            className="w-4 h-4 accent-[#8D7B68]"
            checked={sidebarOption === "1"}
            onChange={(e) => {
              setSidebarOption(e.target.value);
              localStorage.setItem("sidebarOption", e.target.value);
              window.location.reload();
            }}
          />
          Default Sidebar
        </label>

        <label className="flex gap-1 items-center pointer">
          <input
            type="radio"
            name="sidebar-option"
            disabled
            value="2"
            className="w-4 h-4 accent-[#8D7B68]"
            checked={sidebarOption === "2"}
            onChange={(e) => {
              setSidebarOption(e.target.value);
              localStorage.setItem("sidebarOption", e.target.value);
              window.location.reload();
            }}
          />
          Categorized Sidebar
        </label>
      </div>
    </div>
  );
};

export default SideBarBoard;
