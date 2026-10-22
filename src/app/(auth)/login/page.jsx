"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./Login.css";
import "@/src/components/buttons/Buttons.css";
import { Button, Flex, BorderBeam, Tooltip } from "antd";
import {
  PoweroffOutlined,
  LoadingOutlined,
  LeftCircleOutlined,
  UserAddOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import eye from "@/src/assets/icons/eye.svg";
import eyeClose from "@/src/assets/icons/eyeClose.svg";
import avion from "@/src/assets/images/avion.png";
import { AddButton } from "@/src/components/buttons/GlobalButtons";
import Terms from "@/src/assets/Avion_Terms_Conditions.pdf";
import { loginApi } from "@/src/redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "@/src/redux/constants/userType";
import toast from "@/src/components/notification/CustomToast";
import toast2 from "react-hot-toast";
import ForgotPassword from "./ForgotPassword";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useDeviceType from "@/src/layouts/useDeviceType";
import { saveToken } from "@/src/app/actions/auth";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();
  const deviceType = useDeviceType();
  const isWebView = deviceType === "webView";
  const isMobileView = deviceType === "mobileView";
  const isTabView = deviceType === "tabView";
  // Ye browser se check karti hai ki device touch support karta hai ya nahi.👇
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // Redirect logged-in dashboard.👇
  useEffect(() => {
    // const authentication = localStorage.getItem("userLoginData");
    const authentication =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (authentication) {
      router.push("/dashboard");
    }
  }, [router]);
  // Redirect logged-in dashboard.👆

  const loginRes = useSelector((state) => state.user.loginRes);

  // state start 👇
  const [email, setEmail] = useState("");
  const [msgalert, setMsgalert] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepMeLogin, setKeepMeLogin] = useState(false);
  const [termCondition, setTermCondition] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  useEffect(() => {
    if (loginRes.status === true) {
      setLoginData(loginRes.data);

      if (keepMeLogin) {
        localStorage.setItem("token", loginRes.token);
      } else {
        sessionStorage.setItem("token", loginRes.token);
      }

      localStorage.setItem("userLoginData", JSON.stringify(loginRes.data));
      localStorage.setItem("userFirstName", loginRes.data.firstName);
      localStorage.setItem("userLastName", loginRes.data.lastName);
      localStorage.setItem("userImage", loginRes.data.image);
      localStorage.setItem("userid", loginRes.data.userId);
      localStorage.setItem("token", loginRes.token); // always set on localStorage, comment it if you want keep me logged in feature.
      localStorage.setItem("redrectValue", true);
      // Token ko secure HttpOnly cookie mein save karo
      saveToken(loginRes.token)
        .then(() => {
          router.replace("/dashboard");
        })
        .catch((error) => {
          console.error("Cookie save failed:", error);
        });

      // browser se back button daba ke dobara login me nhi jayga, products-list screen me jate hi apne aap replace yani location hat jayga👇
      // navigate("/dashboard", { replace: true });
      // router.replace("/dashboard");

      toast.success({
        description: `${loginRes.data.firstName} Login successfully`,
      });

      // toast2.success(`${loginRes.data.firstName} Login successfully`);

      dispatch({
        type: LOGIN,
        payload: {},
      });
    } else {
      setMsgalert(loginRes?.message);
      loginRes?.message && toast.error({ description: "Login failed" });
      setShowLoading(false);
    }
  }, [loginRes, router]);

  const handleLogin = () => {
    setShowLoading(true);
    dispatch(loginApi(email, password));
  };

  useEffect(() => {
    document.getElementById("asc_input")?.focus();
  }, []);

  return (
    <>
      <ForgotPassword
        open={forgotPasswordOpen}
        title="Forgot Password"
        onCancel={() => setForgotPasswordOpen(false)}
        // onOk={handleForgotPassword}
      />

      <div className="loginBg grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 p-4 h-screen">
        <BorderBeam count={2} color={"#8D7B68"}>
          <div className="login-left-box p-">
            {/* <img src={ASC33} alt="" className="login-left-img" /> */}
            <Image
              src="/avion5.png"
              alt=""
              priority
              fill
              className="login-left-img object-cover animate-puls-e"
            />

            {/* <div className="avion-card">
              <div className="avion-icon">
                <span>✈</span>
              </div>
              <div className="avion-content">
                <h3>Avion | Enterprise Operations Platform</h3>
                <p>A Product by Delta Airlines</p>
              </div>
            </div> */}
          </div>
        </BorderBeam>

        <div className="login-right-box pt-5">
          <p className="ps-4 welcomeTxt">Welcome to Avion !</p>

          <p className="ps-4 pt-2 text-[#718096] text-[16px]">
            Sign in to continue to your Avion workspace.
          </p>

          <div className="p-3">
            <label htmlFor="ASCemail" className="login-label ps-2">
              Email
            </label>
            <div className="relative">
              <MailOutlined className="absolute top-5.5 left-5" />
              <input
                className="inputBorder px-2 ps-12!"
                type="email"
                name="ASCemail"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMsgalert("");
                }}
                onBlur={(e) => {
                  setEmail(e.target.value.trim().toLowerCase());
                }}
              />
            </div>
          </div>

          <div className="p-3 pt-0">
            <p className="mb-0 login-label ps-2">Password</p>
            <div style={{ position: "relative" }}>
              <LockOutlined className="absolute top-5.5 left-5" />
              <input
                className="inputBorder px-2 ps-12!"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMsgalert("");
                }}
              />

              <Image
                className="eyeIcon pointer"
                src={showPassword ? eye : eyeClose}
                alt=""
                width={20}
                height={20}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className="flex flex-wrap-reverse">
              <p className="ps-2 mb-0 alertMsg">{msgalert}</p>

              <p className="ms-auto pe-2 text-[14px]">
                <Tooltip
                  // trigger={["click"]}
                  // trigger={isWebView ? ["hover"] : ["click"]}
                  open={false} // triger nhi hoga
                  title="Password reset is currently unavailable in your region. Please contact our support team for assistance."
                  color={"white"}
                  arrow={false}
                  className=""
                  classNames={{
                    root: "touch-enabled-tooltip",
                  }}
                  styles={{
                    container: {
                      color: "red",
                      fontSize: "12px",
                    },
                  }}
                >
                  <Link
                    // to="/forgot-password"
                    href="#"
                    onClick={(e) => {
                      // e.preventDefault();
                      setForgotPasswordOpen(true);
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Tooltip>
              </p>
            </div>
          </div>

          <div className="keep-labels ps-5">
            <div className="ps-">
              <input
                type="checkbox"
                id="agree"
                style={{ accentColor: "#718096" }}
                className="TermsCon pointer"
                value=""
                onChange={() => {
                  setTermCondition(!termCondition);
                }}
              />
              <label htmlFor="agree" className="ps-1 text-sm align-text-top">
                I have read and agreed &nbsp;
                <a href={Terms} target="_blank" rel="noopener noreferrer">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div className="ps- hidden">
              <input
                type="checkbox"
                id="keep"
                style={{ accentColor: "#8d7b68" }}
                className="checkboxRound pointer"
                value=""
                onChange={() => {
                  setKeepMeLogin(!keepMeLogin);
                }}
              />
              <label htmlFor="keep" className="ps-1 text-sm align-text-top">
                Keep me logged in
              </label>
            </div>
          </div>

          <div className="p-4">
            <AddButton
              label={"Login"}
              disabled={termCondition !== true}
              className="hidden"
              style={{ width: "100%", maxWidth: "100%", fontSize: "18px" }}
              onClick={handleLogin}
            />

            <Button
              type="primary"
              className="addButton ascButton border-[#4096FF]! bg-[#4096FF]!"
              style={{ width: "100%", maxWidth: "100%", fontSize: "18px" }}
              disabled={termCondition !== true}
              icon={<PoweroffOutlined />}
              loading={showLoading && { icon: <LoadingOutlined /> }}
              onClick={handleLogin}
            >
              &nbsp; Login
            </Button>

            {/* <div className="orWithLine mt-6 mx-3">
              <span> OR </span>
            </div> */}

            <p className="text-center pt-4 text-[14px] text-[#718096] font-semibold">
              New to Avion platform ?
            </p>

            <div
              className="mt-3 createAccount w-full md:w-[40%] m-auto flex hover:scale-105"
              onClick={() => {
                router.push("/signup");
              }}
            >
              <p className="text-center m-auto flex gap-2">
                <UserAddOutlined />
                <span>Create an Account</span>
              </p>
            </div>

            <div className="pt-5">
              <Image
                src="/avion4.png"
                alt=""
                width={530}
                height={1}
                className="m-auto rounded-2xl"
              />
            </div>

            <p className="pt-4 ps-4 keep-labels hidden">
              if you are not a member you can make
              <Link href="/signup">&nbsp;Signup</Link>
              &nbsp;first
            </p>
          </div>
        </div>
      </div>

      <div className="animate__animated animate__slideInLeft hidden">
        <LeftCircleOutlined
          className="absolute top-6 md:top-7 left-6 text-2xl text-[#8d7b68]! pointer animate__animated animate__backInDown animate__delay-1s animate-spin,ping,pulse,bounce,none"
          onClick={() => {
            // navigate(-1);
            router.back();
          }}
        />

        <div className=" text-[#8d7b68] font-medium py-4 md:pt-6 ps-17 pe-3">
          <p className="text-[18px]">
            Avion | <span className="">Enterprise Operations Platform</span>
          </p>
          <p className="text-[14px] pt-2">A Product by Delta Airlines</p>
        </div>
      </div>
    </>
  );
};

export default Login;
