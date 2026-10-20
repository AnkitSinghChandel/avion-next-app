"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./Settings.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Header from "@/src/layouts/Header";
import { discount_Props_API } from "@/src/redux/actions/productAction";
import {} from "@/src/redux/constants/productType";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex, Progress, Switch } from "antd";
import { TagOutlined } from "@ant-design/icons";
import {
  AddButton,
  CancelButton,
} from "@/src/components/buttons/GlobalButtons";
import {
  addGlobalDiscount,
  getGlobalDiscount,
} from "@/src/redux/reduxToolkit/dashBoardSlice";

const DiscountBoard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userID = localStorage.getItem("userid");

  const addGlobalDiscountRes = useSelector(
    (state) => state.dashBoard.addGlobalDiscountRes,
  );

  const fetchGlobalDiscountRes = useSelector(
    (state) => state.dashBoard.fetchGlobalDiscountRes,
  );

  console.log("asc443", fetchGlobalDiscountRes);

  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(true);
  const [numberPercent, setNumberPercent] = useState(30);

  useEffect(() => {
    if (!userID) return;
    dispatch(getGlobalDiscount(userID));
  }, [userID, dispatch]);

  useEffect(() => {
    if (fetchGlobalDiscountRes?.data?.status === true) {
      setGlobalDiscount(fetchGlobalDiscountRes?.data?.data?.discountValue || 0);
      setCheckedSwitch(fetchGlobalDiscountRes?.data?.data?.isActive);
      setSwitchLoading(false);
      localStorage.setItem(
        "globalDiscount",
        fetchGlobalDiscountRes?.data?.data?.discountValue || 0,
      );
    }
  }, [fetchGlobalDiscountRes]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // handleAddTeam();
    }
  };

  console.log("switch checked", checkedSwitch);

  return (
    <div className="boardDivCss group">
      <div className="flex gap-2 items-center pb-3">
        <div className="bg-[#f1ece8] rounded-lg p-2 px-3 w-fit">
          <TagOutlined className="group-hover:text-amber-500! icon" />
        </div>
        <div>
          <p className="ps-1 text-(--badge-bg) text-[14px] font-medium">
            Global Discount
          </p>
          <p className="ps-1 text-gray-500 text-[13px] font-medium">
            Set the global discount percentage
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="w-25">
          <div className="asc-input-container" id="ascNewInput">
            <input
              type="number"
              // disabled
              className="asc-Normal-Input h-12! mt-3"
              placeholder="Set Discount % for your products"
              value={globalDiscount}
              // min={10}
              // max={100}
              // onChange={(e) => {
              //   setGlobalDiscount(e.target.value);
              // }}
              onChange={(e) => {
                let value = Number(e.target.value);
                if (value < 0) value = 0;
                if (value > 100) value = 100;
                setGlobalDiscount(value);
              }}
              onKeyDown={handleKeyDown}
            />
            <span className="font-bold absolute top-6 left-15">%</span>
            <br />
            <span className="warningTxt ps-2"></span>
          </div>
        </div>

        <AddButton
          label={"Discount for Products"}
          className="hidden"
          onClick={() => {
            console.log("ascee");
            dispatch(discount_Props_API(globalDiscount, "ASC"));
          }}
        />

        <Switch
          // size="small"
          checkedChildren="Discount on"
          unCheckedChildren="Discount off"
          // defaultChecked
          loading={switchLoading}
          checked={checkedSwitch}
          disabled={!globalDiscount}
          onChange={(pre) => {
            setCheckedSwitch(pre);
            dispatch(
              addGlobalDiscount({
                userId: userID,
                discountValue: globalDiscount,
                isActive: pre,
              }),
            );
          }}
          style={{
            backgroundColor: checkedSwitch ? "var(--badge-bg)" : "",
            // width: "80px",
          }}
        />

        <Progress
          type="circle"
          percent={globalDiscount}
          // success={{ percent: 50 }}
          success={numberPercent >= 50 && { percent: numberPercent }}
          // status="exception"
          // strokeColor={"red"}
          strokeColor={{ "0%": "#108ee9", "100%": "#5CAF90" }}
          strokeWidth={12}
        />
        {/* <Progress type="circle" percent={100} format={() => "Done"} /> */}
      </div>
    </div>
  );
};

export default React.memo(DiscountBoard);
