"use client";
import { useEffect, useState, useRef } from "react";
import "./HangingLamp.css";

function HangingLamp() {
  // const [isOn, setIsOn] = useState(false);
  const [isOn, setIsOn] = useState(() => {
    return localStorage.getItem("systemMode") === "dark";
  });

  const [pullDistance, setPullDistance] = useState(0);

  const isDragging = useRef(false);
  const startY = useRef(0);
  const pullRef = useRef(0);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
    pullRef.current = 0;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const distance = Math.max(0, Math.min(100, e.clientY - startY.current));

    pullRef.current = distance;
    setPullDistance(distance);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;

    if (pullRef.current >= 20) {
      setIsOn((prev) => !prev);
    }

    isDragging.current = false;
    pullRef.current = 0;
    setPullDistance(0);
  };

  // DayNightToggle concept, Apply themeMode to #root
  useEffect(() => {
    const mode = isOn ? "dark" : "light";
    document.documentElement.setAttribute("data-mode", mode);
    localStorage.setItem("systemMode", mode);
  }, [isOn]);

  return (
    <div className={`lamp-wrapper ${isOn ? "light-on" : "opacity-12"}`}>
      <div className="ceiling" />
      <div className="wire" />

      <div className="lamp-shade">
        <div className="lamp-bulb" />
      </div>

      <div
        className="pull-rope"
        style={{
          transform: `translateX(-50%) translateY(${pullDistance}px)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="lamp-rope"
          style={{
            height: `${100 + pullDistance}px`,
          }}
        />

        <div className="lamp-handle" />
      </div>
    </div>
  );
}

export default HangingLamp;
