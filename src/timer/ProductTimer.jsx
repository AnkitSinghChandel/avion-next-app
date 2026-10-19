import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import NextImage from "next/image";
import { Tooltip, Popover, FloatButton } from "antd";
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
  fetchTimerByProductId,
  setTimerRunning_props_Api,
} from "@/src/redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import toast from "@/src/components/notification/CustomToast";
import { TIMER_START, TIMER_STOP } from "@/src/redux/constants/productType";

const ProductTimer = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productID = params.id;
  const pathName = usePathname();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();
  console.log("location", pathName);

  const userID = localStorage.getItem("userid");
  const timerProductID = localStorage.getItem("timerProductID");

  const timerStartRes = useSelector((state) => state.product.timerStartRes);
  const timerStopRes = useSelector((state) => state.product.timerStopRes);

  const fetchTimerByProductIdRes = useSelector(
    (state) => state.product.fetchTimerByProductIdRes,
  );

  const [singleLeft, setSingleLeft] = useState(false);
  const [singleTop, setSingleTop] = useState(false);
  const [openBox, setOpenBox] = useState(false);

  const [totalTime, setTotalTime] = useState(0); // total totalTime in seconds.

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const timerRef = useRef(null);

  // Auto-resume if timer was running before refresh
  useEffect(() => {
    // if (isTimerRunning && timerProductID === productID) {
    if (isTimerRunning) {
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
    if (timerProductID && timerProductID !== params.id) {
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

      dispatch(timerStart(userID, productID, true));
      localStorage.setItem("timerRunning", true);
      dispatch(setTimerRunning_props_Api(true, totalTime));
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    dispatch(timerStop(userID, productID, false));
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
    return `${String(hrs).padStart(2, "0")}
    :${String(mins).padStart(2, "0")}
    :${String(secs).padStart(2, "0")}`;
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
    if (pathName.startsWith("/product/") && params.id) {
      dispatch(fetchTimerByProductId(userID, productID));
    }
  }, [timerStartRes, timerStopRes, params.id]);

  useEffect(() => {
    if (fetchTimerByProductIdRes.status === true) {
      setTotalTime(fetchTimerByProductIdRes?.data?.totalElapsedTime ?? 0);
      setIsTimerRunning(fetchTimerByProductIdRes?.data?.fetchTimer.isRunning);
    }
  }, [fetchTimerByProductIdRes]);

  console.log("asc timer running", totalTime, isTimerRunning);

  return (
    <div className="timerDiv z-10 text-center mt-2 p-3 hidden md:block">
      {/* <p className="timerText">Timer: {formatTime(totalTime)}</p> */}
      <div className="timerText flex justify-center items-center mt-3">
        <ClockCircleOutlined />
        <p className="min-w-[90px]">{formatTime(totalTime)}</p>
        <NextImage src={isTimerRunning && "/clock.gif"} width={20} />
      </div>

      <div className="flex gap-2 justify-between pt-2">
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

      <div ref={Ankit}>
        <SwapOutlined
          rotate={0}
          onClick={() => {
            setOpenBox(!openBox);
          }}
        />
        {openBox && <p>Product Name</p>}
      </div>
    </div>
  );
};

export default ProductTimer;
