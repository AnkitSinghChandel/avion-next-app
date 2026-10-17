"use client";
import React from "react";
import { notification } from "antd";
import successAlert from "@/src/assets/notification-sound/successAlert.mp3";
import errorAlert from "@/src/assets/notification-sound/errorAlert.wav";
import avion from "@/src/assets/images/avion.png";

const playSuccessSound = () => {
  const successAudio = new Audio(successAlert);
  successAudio.currentTime = 0;
  successAudio.play().catch((error) => {
    console.error("error:", error);
  });
};

const playErrorSound = () => {
  const errorAudio = new Audio(errorAlert);
  errorAudio.currentTime = 0;
  errorAudio.play().catch((error) => {
    console.error("error:", error);
  });
};

const toast = {
  open: ({ title = "Notification", description = "", ...rest }) => {
    playSuccessSound();
    notification.open({
      title: title,
      description,
      placement: "topRight",
      showProgress: true,
      closeIcon: true,
      duration: 5,
      ...rest, // yaha AntD ko key mil jayegi our agar koi our param bheja to vo bhi mil jayga.
    });
  },

  info: ({ title = "Info", description = "", ...rest }) => {
    playSuccessSound();
    notification.info({
      title: title,
      description,
      placement: "topRight",
      showProgress: false,
      duration: 10,
      className: "bg-blue-50! border border-blue-200",
      classNames: {
        title: "text-blue-600! font-medium",
        description: "text-blue-500! text-[16px]!",
        progress: "text-blue-600!",
      },
      ...rest,
    });
  },

  success: ({ title = "Success", description = "", ...rest }) => {
    playSuccessSound();
    notification.success({
      title: title,
      description,
      description_2: (
        <div className="flex items-center gap-3 text-[16px]">
          <img src={avion} alt="avion" className="w-6" />
          <span>{description}</span>
        </div>
      ),
      placement: "topRight",
      showProgress: false,
      duration: 5,
      className: "bg-green-50! border border-green-200",
      classNames: {
        title: "text-green-600! font-medium",
        description: "text-green-600! text-[16px]!",
        progress: "text-green-600!",
      },
      ...rest,
    });
  },

  warning: ({ title = "Warning", description = "", ...rest }) => {
    playErrorSound();
    notification.warning({
      title: title,
      description,
      description_2: (
        <div className="flex items-center gap-3 text-[16px]">
          <img src={avion} alt="avion" className="w-6" />
          <span>{description}</span>
        </div>
      ),
      placement: "topRight",
      showProgress: false,
      duration: 8,
      className: "bg-orange-50! border border-orange-200",
      classNames: {
        title: "text-orange-600! font-medium",
        description: "text-orange-600! text-[16px]!",
      },
      ...rest,
    });
  },

  error: ({ title = "Error", description = "", ...rest }) => {
    playErrorSound();
    notification.error({
      title: title,
      description,
      description_2: (
        <div className="flex items-center gap-3 text-[16px]">
          <img src={avion} alt="avion" className="w-6" />
          <span>{description}</span>
        </div>
      ),
      placement: "topRight",
      showProgress: false,
      duration: 8,
      className: "bg-red-50! border border-red-200",
      classNames: {
        title: "text-red-500! font-medium",
        description: "text-red-500! text-[16px]!",
      },
      ...rest,
    });
  },
};

export default toast;
