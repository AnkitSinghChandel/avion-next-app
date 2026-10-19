import axios from "axios";
import toast from "../components/notification/CustomToast";
import { clearToken } from "@/src/app/actions/auth";
import { redirect } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // sending cookies with requests from Backend.
});

// Request Interceptor - Attach token before request👇
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from Cookies or localStorage👇
    // const token = Cookies.get("token") || localStorage.getItem("token");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor - Handle Unauthorized (401) errors👇
let notificationShown = false;

axiosInstance.interceptors.response.use(
  (response) => {
    // Agar response me token mile to localStorage me set karo
    const newToken = response.data?.token;
    // if (newToken) {
    //   localStorage.setItem("token", newToken);
    // }

    if (newToken) {
      if (localStorage.getItem("token")) {
        localStorage.setItem("token", newToken);
      } else if (sessionStorage.getItem("token")) {
        sessionStorage.setItem("token", newToken);
      }
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized! Logging out...");

      if (error.response?.data?.tokenExpired === true && !notificationShown) {
        // Show a notification
        toast.warning({
          description: `Your session has expired. You will be logged out.`,
        });

        // Set the flag to true to avoid showing the notification again
        notificationShown = true;
      }

      // Remove token from storage
      // Cookies.remove("token");
      localStorage.removeItem("token");
      sessionStorage.clear();
      localStorage.clear();
      clearToken();

      setTimeout(() => {
        redirect("/");
      }, 3000);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
