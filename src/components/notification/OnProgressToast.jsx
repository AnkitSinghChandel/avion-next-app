import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Tooltip, notification, Progress } from "antd";

const OnProgressToast = (percent) => {
  const key = "upload-progress";
  notification.open({
    key,
    title: "Uploading Files",
    description: (
      <Progress percent={percent} status="active" strokeColor="#5CAF90" />
    ),
    placement: "topRight",
    duration: 0,
    closeIcon: false,
  });

  if (percent === 100) {
    notification.success({
      key,
      title: "Upload Completed",
      description: "All files uploaded successfully",
      placement: "topRight",
      duration: 5, // 5 second
    });
    return;
  }
};

export default OnProgressToast;
