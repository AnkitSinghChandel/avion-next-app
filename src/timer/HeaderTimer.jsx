import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tooltip, Popover, FloatButton } from "antd";
import stopIcon from "../assets/icons/stop-circle.svg";
import "./Timer.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
  SwapOutlined,
  ClockCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";

import {
  timerStart,
  timerStop,
  fetchTimerByProductIdInHeader,
  setTimerRunning_props_Api,
} from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import toast from "../components/notification/CustomToast";
import { TIMER_START, TIMER_STOP } from "../redux/constants/productType";

const HeaderTimer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();

  const userID = localStorage.getItem("userid");
  const timerProductID = localStorage.getItem("timerProductID");

  const timerStartRes = useSelector((state) => state.product.timerStartRes);
  const timerStopRes = useSelector((state) => state.product.timerStopRes);

  const fetchTimerByProductIdInHeaderRes = useSelector(
    (state) => state.product.fetchTimerByProductIdInHeaderRes,
  );

  const [singleLeft, setSingleLeft] = useState(false);
  const [singleTop, setSingleTop] = useState(false);
  const [openBox, setOpenBox] = useState(false);

  const [totalTime, setTotalTime] = useState(0); // total totalTime in seconds.
  const [timerProductTitle, setTimerProductTitle] = useState("");

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRunning = JSON.parse(localStorage.getItem("timerRunning"));

  const timerRef = useRef(null);

  // Auto-resume if timer was running before refresh
  useEffect(() => {
    if (isTimerRunning && timerProductID) {
      timerRef.current = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, timerProductID]);

  // Stop timer automatically if localStorage is cleared
  useEffect(() => {
    const interval = setInterval(() => {
      if (!localStorage.getItem("timerRunning")) {
        clearInterval(timerRef.current);
        setIsTimerRunning(false);
      }
    }, 1000); // Check every 1 second

    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    if (timerProductID && timerProductID) {
      toast.error({
        description: "Timer already running for another product.",
      });
      return;
    }

    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);

      dispatch(timerStart(userID, timerProductID, true));
      localStorage.setItem("timerRunning", true);
      dispatch(setTimerRunning_props_Api(true, totalTime));
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    dispatch(timerStop(userID, timerProductID, false));
    localStorage.setItem("timerRunning", false);
    dispatch(setTimerRunning_props_Api(false, totalTime));
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTotalTime(0);
    setIsTimerRunning(false);

    localStorage.removeItem("timerRunning");
    dispatch(setTimerRunning_props_Api(false, totalTime));
  };

  useEffect(() => {
    dispatch(
      setTimerRunning_props_Api(
        JSON.parse(localStorage.getItem("timerRunning")),
        totalTime,
      ),
    );
  }, []);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0",
    )}:${String(secs).padStart(2, "0")}`;
  };

  const convertToHMS = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const min = Math.floor((totalSeconds % 3600) / 60);
    const sec = totalSeconds % 60;
    return { hrs, min, sec };
  };

  const { hrs, min, sec } = convertToHMS(totalTime);

  console.log({
    "Raw time in Seconds": totalTime,
    Hours: hrs,
    Minutes: min,
    Seconds: sec,
  });

  useEffect(() => {
    if (timerStartRes.status === true) {
      localStorage.setItem("timerProductID", timerStartRes.data.productId);
      toast.success({ description: `${timerStartRes.message}` });

      dispatch({
        type: TIMER_START,
        payload: {},
      });
    }
  }, [timerStartRes]);

  useEffect(() => {
    if (timerStopRes.status === true) {
      localStorage.removeItem("timerProductID");
      toast.success({ description: `${timerStopRes.message}` });

      dispatch({
        type: TIMER_STOP,
        payload: {},
      });
    }
  }, [timerStopRes]);

  useEffect(() => {
    if (timerProductID) {
      dispatch(fetchTimerByProductIdInHeader(userID, timerProductID));
    }
  }, [timerStartRes, timerStopRes, timerProductID]);

  useEffect(() => {
    if (fetchTimerByProductIdInHeaderRes.status === true) {
      setTotalTime(
        fetchTimerByProductIdInHeaderRes?.data?.totalElapsedTime ?? 0,
      );
      setTimerProductTitle(
        fetchTimerByProductIdInHeaderRes?.data?.fetchTimer.products
          .productTitle,
      );
      setIsTimerRunning(
        fetchTimerByProductIdInHeaderRes?.data?.fetchTimer.isRunning,
      );
    }
  }, [fetchTimerByProductIdInHeaderRes]);

  console.log("asc timer running", totalTime, isTimerRunning);

  return (
    <div
      className="headerTimer z-10 text-center mt- p-1"
      // style={{
      //   left: singleLeft ? "20px" : "77%",
      //   right: singleLeft ? "auto" : "20px",
      //   maxWidth: "fit-content",
      //   transition: "all 0.5s ease-in-out",

      //   top: singleTop ? "10px" : "71%",
      //   bottom: singleTop ? "auto" : "20px",
      //   maxHeight: "fit-content",
      // }}
      style={{
        display: timerRunning ? "block" : "none",
      }}
    >
      <div className="fle-x justify-between hidden">
        <DoubleLeftOutlined
          onClick={() => {
            setSingleLeft(true);
          }}
        />

        <DoubleLeftOutlined
          rotate={singleTop ? -90 : 90}
          onClick={() => {
            setSingleTop(!singleTop);
          }}
        />

        <DoubleRightOutlined
          onClick={() => {
            setSingleLeft(false);
          }}
        />
      </div>

      {/* <p className="timerText">Timer: {formatTime(totalTime)}</p> */}
      <div className="timerText flex justify-center items-center mt-">
        <img src={isTimerRunning && "/clock.gif"} className="ms-2" width={20} />
        <div className="min-w-[90px] mx-1">{formatTime(totalTime)}</div>

        <div className="">
          <button
            className="headerTimerButton"
            // onClick={stopTimer}
            onClick={() => {
              router.push(`/product/${timerProductID}`);
              stopTimer();
            }}
            // disabled={!isTimerRunning}
          >
            {/* Stop */}
            <StopOutlined />
          </button>
        </div>

        <div className="flex gap-3 mx-3 text-[14px]!" ref={Ankit}>
          <SwapOutlined
            rotate={0}
            onClick={() => {
              setOpenBox(!openBox);
            }}
          />
          {openBox && <p>{timerProductTitle}</p>}
        </div>
      </div>

      <div className="fle-x gap-2 justify-between pt-2 hidden">
        <button
          className="timerButton"
          onClick={startTimer}
          disabled={isTimerRunning}
        >
          Start
        </button>

        <button
          className="timerButton"
          onClick={stopTimer}
          disabled={!isTimerRunning}
        >
          Stop
        </button>

        <button
          className="timerButton"
          onClick={startTimer}
          disabled={isTimerRunning || totalTime === 0}
        >
          Resume
        </button>

        <button className="timerButton" onClick={resetTimer}>
          Reset
        </button>
      </div>

      {/* <div ref={Ankit}>
        <SwapOutlined
          rotate={0}
          onClick={() => {
            setOpenBox(!openBox);
          }}
        />
        {openBox && <p>Product Name</p>}
      </div> */}
    </div>
  );
};

export default HeaderTimer;
