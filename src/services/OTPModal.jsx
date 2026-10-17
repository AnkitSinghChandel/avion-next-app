"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Modal, Input, Button } from "antd";
import avion from "../assets/images/avion.png";
import { sendOTPEmail, verifyOTP } from "../redux/actions/emailAction";

const OTPModal = ({ open, email, onClose, onVerify, onResend }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    setLoading(true);

    try {
      await onVerify(otp);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.reload();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Modal
      open={open}
      // onCancel={onClose}
      footer={null}
      centered
      width={520}
      destroyOnHidden
      closable={false}
    >
      {/* Email Icon */}
      <div className="flex justify-center mb-5">
        <div className="flex items-center justify-center w-25 h-20 rounded-2xl bg-blue-50">
          <Image
            src="/avion.png"
            alt=""
            width={60}
            height={60}
            className="absolute left-5 top-7 animate__animated animate__backInDown shadow-(--my-shadow) rounded-full"
          />

          <Image
            src="https://res.cloudinary.com/dlu4uc0ff/image/upload/v1791040056/hs778k8tlrx55sqmydw6.png"
            alt=""
            width={100}
            height={100}
            className=""
          />
        </div>
      </div>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Verify your email
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          We've sent a 6-digit verification code to
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-700 break-all">
          {email}
        </p>
      </div>

      {/* OTP */}
      <div className="flex justify-center mt-8">
        <Input.OTP
          type="number"
          length={6}
          size="large"
          value={otp}
          onChange={(value) => setOtp(value)}
          autoComplete="one-time-code"
        />
      </div>

      {/* Verify Button */}
      <Button
        type="primary"
        loading={loading}
        disabled={otp.length !== 6}
        onClick={handleVerify}
        className="w-full h-12 mt-7 rounded-lg text-base font-medium"
      >
        Verify OTP
      </Button>

      {/* Resend */}
      <div className="text-center mt-5">
        <span className="text-sm text-gray-500">Didn't receive the code?</span>

        <button
          type="button"
          onClick={onResend}
          className="ml-1 text-sm font-semibold text-blue-600 hover:text-blue-700 pointer"
        >
          Resend OTP
        </button>

        <span className="ml-1 text-sm text-gray-400">
          (00:{String(timer).padStart(2, "0")})
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-6" />

      {/* Footer Message */}
      <p className="text-center text-xs sm:text-sm text-gray-400">
        Check your spam or junk folder if you don't see the email.
      </p>
    </Modal>
  );
};

export default OTPModal;
