import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { Tooltip, Popover, FloatButton } from "antd";
import "../styles/Timer.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  LeftOutlined,
  RightOutlined,
  SwapOutlined,
} from "@ant-design/icons";

import {
  timerStart,
  timerStop,
  fetchTimerByProductId,
  setTimerRunning_props_Api,
} from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import toast from "../components/notification/CustomToast";
import {
  playSuccessSound,
  playErrorSound,
} from "../components/notification/CustomToastify";

const Timer = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const userID = localStorage.getItem("userid");

  const timerStartRes = useSelector((state) => state.product.timerStartRes);

  const fetchTimerByProductIdRes = useSelector(
    (state) => state.product.fetchTimerByProductIdRes,
  );

  const [singleLeft, setSingleLeft] = useState(false);
  const [singleTop, setSingleTop] = useState(false);
  const [openBox, setOpenBox] = useState(false);

  //const [totalTime, setTotalTime] = useState(0); // total totalTime in seconds.
  const [totalTime, setTotalTime] = useState(() => {
    return parseInt(localStorage.getItem("myTimer") || 0);
  });

  const [isTimerRunning, setIsTimerRunning] = useState(() => {
    return localStorage.getItem("timerRunning") === "true";
  });

  const timerRef = useRef(null);

  // Save totalTime to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("myTimer", totalTime.toString());
  }, [totalTime]);

  // Save isTimerRunning to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("timerRunning", isTimerRunning.toString());
  }, [isTimerRunning]);

  // Auto-resume if timer was running before refresh
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

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
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000);

      dispatch(setTimerRunning_props_Api(true, totalTime));
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    dispatch(setTimerRunning_props_Api(false, totalTime));
    const running = false;
    handleTimer(totalTime, running);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTotalTime(0);
    setIsTimerRunning(false);
    dispatch(setTimerRunning_props_Api(false, totalTime));
    localStorage.removeItem("myTimer");
    localStorage.removeItem("timerRunning");
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

  const handleTimer = (updatedTime, running) => {
    dispatch(
      timerStart(userID, "67e0037b4b23d1c4accd4541", totalTime, running),
    );
  };
  // "67e0037b4b23d1c4accd4541"
  // "67e003504b23d1c4accd453a"

  useEffect(() => {
    if (timerStartRes.status === true) {
      toast.success({ description: `${timerStartRes.message}` });
    }
  }, [timerStartRes]);

  useEffect(() => {
    dispatch(fetchTimerByProductId(userID, "67e0037b4b23d1c4accd4541"));
  }, [timerStartRes]);

  useEffect(() => {
    if (fetchTimerByProductIdRes.status === true) {
      if (isTimerRunning) return;
      console.log("asc timer not return when isTimerRunning not running");
      setTotalTime(fetchTimerByProductIdRes?.data?.totalTime ?? 0);
    }
  }, [fetchTimerByProductIdRes]);

  console.log("asc timer running", totalTime, isTimerRunning);

  return (
    <div className="timerDiv z-10 text-center mt-2 p-3">
      {/* <p className="timerText">Timer: {formatTime(totalTime)}</p> */}
      <div className="timerText flex justify-center items-center mt-3">
        <AccessAlarmIcon />
        <p className="min-w-[90px]">{formatTime(totalTime)}</p>
        <img src={isTimerRunning && "/clock.gif"} width={20} />
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

export default Timer;
