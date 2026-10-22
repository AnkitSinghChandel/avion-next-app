import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { WechatWorkOutlined, CloseOutlined } from "@ant-design/icons";
import { Palette } from "lucide-react";

const ComingSoon = () => {
  const router = useRouter();

  const isLoggedIn = localStorage.getItem("token");
  const [showPopup, setShowPopup] = useState(false);

  const hasShown = useRef(false);
  useEffect(() => {
    if (!hasShown.current) {
      hasShown.current = true; // mark only once
      // setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Login ke baad popup
  const redrectValue = localStorage.getItem("redrectValue");

  useEffect(() => {
    if (isLoggedIn && redrectValue) {
      setShowPopup(true);

      setTimeout(() => {
        // window.open(
        //   "https://accounts.intuit.com/app/sign-in?app_group=QBO&asset_alias=Intuit.accounting.core.qbowebapp&app_environment=prod",
        // );
        // window.open("/chat", "_blank");
        setShowPopup(false);
        localStorage.removeItem("redrectValue");
      }, 7000);
    }
  }, [isLoggedIn, redrectValue]);

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div
            className="bg-(--card-bg) p-4 rounded-lg shadow-lg text-center animate__animated animate__fadeIn m-5"
            style={{ width: "500px", maxWidth: "100%" }}
          >
            <h2 className="flex">
              <CloseOutlined
                className="ms-auto pointer"
                onClick={() => {
                  setShowPopup(false);
                }}
              />
            </h2>

            <div className="py-2">
              <div className="flex gap-3 items-center">
                <div className="bg-[#f1ece8] rounded-lg p-2 px-3 w-fit">
                  <Palette
                    className="text-xl group-hover:text-amber-500! icon"
                    size={18}
                  />
                </div>
                <h2 className="text-[#2563eb] text-[16px] font-semibold tracking-wide">
                  New Feature Available
                </h2>
              </div>

              <div className="text-[#718096] text-[14px] leading-7 font-medium mx-auto pt-2">
                You can now customize your system theme from the{" "}
                <span className="text-[#2563eb] font-semibold">Settings</span>{" "}
                to match your style.
              </div>

              <div
                className="mt-5 py-2.5 m-auto rounded-2xl text-center text-sm text-white bg-[#2563eb] pointer shadow-lg"
                onClick={() => {
                  navigate("/settings");
                  setTimeout(() => {
                    setShowPopup(false);
                  }, 500);
                }}
              >
                Try it now
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComingSoon;
