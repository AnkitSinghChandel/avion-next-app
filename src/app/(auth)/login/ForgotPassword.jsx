"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Input, Modal, Form } from "antd";
import avion from "@/src/assets/images/avion.png";
// import Draggable from "react-draggable";
import { forgotPassword } from "@/src/redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import toast from "@/src/components/notification/CustomToast";

const ForgotPassword = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      toast.warning({
        description: "Please enter your email address.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.warning({
        description: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await dispatch(
        forgotPassword({
          email: trimmedEmail,
        }),
      );

      if (response?.status) {
        toast.success({
          description: "Password reset link sent to your email.",
        });

        setEmail("");
        props.onCancel();
      }
    } catch (error) {
      toast.error({
        description:
          error.response?.data?.message ||
          error.response.data.error ||
          "Unable to send reset link. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="">
      <Modal
        // title={props.title}
        title={
          <div className="flex gap-3 items-center">
            <Image
              src={avion}
              alt=""
              width={40}
              height={40}
              className="text-start shadow-(--my-shadow) rounded-full logo-up-down"
            />
            <span className="text-[#718096]">
              {props.title || "Forgot Password"}
            </span>
          </div>
        }
        centered
        open={props.open}
        onOk={() => props.onOk()}
        onCancel={() => props.onCancel()}
        closable={false}
        loading={false}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "40%",
          xxl: "40%",
        }}
        classNames={{
          footer: "",
        }}
        footer={[
          <div
            className="flex flex-wrap-reverse justify-center gap-5 w-full"
            key="footer"
          >
            <Button
              key="submit"
              // loading={props.loading}
              loading={loading}
              disabled={!email.trim()}
              className="addButton ascButton border-[#4096FF]! bg-[#4096FF]! w-full! sm:w-45!"
              onClick={() => {
                // props.onOk();
                handleSubmit();
              }}
            >
              Send Reset Link
            </Button>
          </div>,
        ]}
      >
        <div className="py-4">
          <p className="mb-3 text-[16px] font-medium text-[#4b5966]">
            Forgot your password?
          </p>

          <p className="mb-4 text-sm text-gray-500">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <Input
            size="large"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
