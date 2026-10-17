import React from "react";
import toast, { Toaster } from "react-hot-toast";
import successAlert from "../../assets/notification-sound/successAlert.mp3";
import errorAlert from "../../assets/notification-sound/errorAlert.wav";
import avion from "../../assets/images/avion.png";

const ReactHotToast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // work css on all toast.
        // icon: <img src={avion} alt="avion" className="w-8 h-8 rounded-full" />,
        duration: 5000,
        // style: {
        //   border: "1px solid #713200",
        //   borderRadius: "12px",
        //   background: "#f7f4f2",
        //   color: "#713200",
        //   padding: "13px",
        // },

        // work css on only success toast.
        success: {
          // icon: <img src={avion} alt="avion" className="w-8 h-8 rounded-full" />,
          duration: 5000,
        },

        // work css on only error toast.
        error: {
          duration: 8000,
        },
      }}
    />
  );
};

export default ReactHotToast;
