import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "../../components/notification/CustomToast";
import axios from "axios";

const SendingMail = () => {
  const singleUploadToS3Res = useSelector(
    (state) => state.common.singleUploadToS3Res,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const mailData = JSON.parse(
        localStorage.getItem("sendInquiry") || "null",
      );
      if (mailData) {
        axios
          .post("https://jsonplaceholder.typicode.com/users", {
            name: mailData.name,
            number: mailData.number,
            email: mailData.email,
          })
          .then((res) => {
            localStorage.removeItem("sendInquiry");
            toast.success({
              description: `Enquiry sent successfully! We will get back to you soon`,
              key: "Enquiry",
            });
          })
          .catch((error) => {
            toast.error({
              description: `Failed to send enquiry. Please try again.`,
              key: "Enquiry",
            });
          });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [singleUploadToS3Res]);

  // return;
};

export default SendingMail;
