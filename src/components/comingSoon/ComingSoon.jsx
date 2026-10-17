import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { WechatWorkOutlined, CloseOutlined } from "@ant-design/icons";

const ComingSoon = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      const showTimer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);

      const timer = setTimeout(() => {
        // window.open(
        //   "https://accounts.intuit.com/app/sign-in?app_group=QBO&asset_alias=Intuit.accounting.core.qbowebapp&app_environment=prod",
        // );
        // window.open("/chat", "_blank");
        setShowPopup(false);
        localStorage.removeItem("redrectValue");
      }, 15000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-(--card-bg) p-4 rounded-lg shadow-lg text-center max-w-sm animate__animated animate__fadeIn m-5">
            <h2 className="flex">
              <CloseOutlined
                className="ms-auto pointer"
                onClick={() => {
                  setShowPopup(false);
                }}
              />
            </h2>

            <div className="py-2">
              <h2 className="text-[#6D5DFB] text-[16px] font-bold tracking-wide mb-2">
                🚀 New Feature Available
              </h2>

              <div className="text-[#5B6475] text-[16px] leading-7 font-medium max-w-md mx-auto pt-2">
                You can now customize your system theme from the{" "}
                <span className="text-[#6D5DFB] font-bold">Settings</span> to
                match your style.
                <br />
                <p
                  className="mt-5 py-1.75 m-auto border rounded-2xl text-center w-25 text-sm text-white bg-[#6D5DFB] pointer shadow-lg"
                  onClick={() => {
                    navigate("/settings");
                    setTimeout(() => {
                      setShowPopup(false);
                    }, 500);
                  }}
                >
                  Try it now
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComingSoon;
