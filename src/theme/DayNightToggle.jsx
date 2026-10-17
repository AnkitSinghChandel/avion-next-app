import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

const DayNightToggle = () => {
  const [themeMode, setThemeModel] = useState(() => {
    return localStorage.getItem("systemMode") || "light";
  });

  // Apply themeMode to #root
  useEffect(() => {
    document.documentElement.setAttribute("data-mode", themeMode);
    localStorage.setItem("systemMode", themeMode);
  }, [themeMode]);

  return (
    <>
      {/* {themeMode === "light" ? "🌙 Dark" : "☀️ Light"} */}
      <Switch
        // size="small"
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        // defaultChecked
        // loading={switchLoading}
        checked={themeMode === "light"}
        // disabled={!globalDiscount}
        onChange={(checked) => setThemeModel(checked ? "light" : "dark")}
        classNames={""}
        style={{
          background: themeMode === "light" ? "var(--badge-bg)" : "#222B38",
          width: "50px",
        }}
      />
    </>
  );
};

export default DayNightToggle;
