"use client";
import React, { useEffect, useState } from "react";
import Header from "@/src/layouts/Header";
import AddStatusBoard from "./AddStatusBoard";
import DiscountBoard from "./DiscountBoard";
import CurrencyBoard from "./CurrencyBoard";
import LanguageBoard from "./LanguageBoard";
import ScreenTheme from "@/src/theme/ScreenTheme";
import SideBarBoard from "./SideBarBoard";

const Settings = () => {
  return (
    <div>
      <Header
        // setQuery={setQuerystring}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              You are in Settings
            </p>
          </div>
        }
      />

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <div>
          <div className="pt-10">
            <AddStatusBoard />
          </div>
          <div className="pt-5">
            <DiscountBoard />
          </div>
        </div>

        <div>
          <div className="pt-0 md:pt-10">
            <CurrencyBoard />
          </div>
          <div className="pt-5">
            <LanguageBoard />
          </div>
          <div className="pt-5">
            <ScreenTheme />
          </div>
          <div className="pt-5">
            <SideBarBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
