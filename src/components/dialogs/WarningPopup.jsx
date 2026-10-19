import React, { useState } from "react";
import { Button, Flex, Modal } from "antd";
import avion from "../../assets/images/avion.png";
import "../../styles/WarningPopup.css";
// import Draggable from "react-draggable";

const WarningPopup = (props) => {
  return (
    <div id="asc_warningPop">
      <Modal
        {...props}
        // title={props.title}
        title={
          <div className="flex gap-3 items-center">
            <img src={avion} alt="" className="text-start w-10 h-10" />
            <span>{props.title}</span>
          </div>
        }
        centered
        open={props.open}
        onOk={() => props.onOk()}
        onCancel={() => props.onCancel()}
        closable={true}
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
              key="back"
              onClick={props.onCancel}
              className="cancelButton ascButton w-full! sm:w-45!"
            >
              No
            </Button>

            <Button
              key="submit"
              loading={props.loading}
              className="addButton ascButton w-full! sm:w-45!"
              onClick={() => {
                props.onOk();
              }}
            >
              Yes
            </Button>
          </div>,
        ]}
      >
        <div className="py-4 text-center">
          <p className="text-[16px] font-medium text-[#dc3545]">
            This data will be removed from the system <br /> and can not be
            undone.
          </p>
          <p className="py-1 text-[16px] font-medium text-[#4b5966]">
            Do you want to proceed?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default WarningPopup;
