"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./Settings.css";
import { PlusCircleOutlined, CarryOutOutlined } from "@ant-design/icons";
import { addStatus, fetchAllStatus } from "@/src/redux/actions/taskAction";
import { useSelector, useDispatch } from "react-redux";
import { AddButton } from "@/src/components/buttons/GlobalButtons";

const AddStatusBoard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [statusName, setStatusName] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(addStatus(statusName));
      setStatusName("");
    }
  };

  return (
    <div className="boardDivCss group">
      <div className="flex gap-2 items-center pb-5">
        <div className="bg-[#f1ece8] rounded-lg p-2 px-3 w-fit">
          <CarryOutOutlined className="group-hover:text-amber-500! icon" />
        </div>
        <div>
          <p className="ps-1 text-(--badge-bg) text-[14px] font-medium">
            Status Management
          </p>
          <p className="ps-1 text-gray-500 text-[13px] font-medium">
            Create your status options
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="w-full sm:w-58 flex-grow">
          <input
            type="text"
            className="asc-Normal-Input h-11!"
            placeholder="Add Status Name"
            value={statusName}
            onChange={(e) => {
              setStatusName(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>

        <AddButton
          disabled={statusName === ""}
          className="customAddCss w-full! sm:w-45! h-11!"
          label={"Add Status"}
          onClick={() => {
            dispatch(addStatus(statusName));
            setStatusName("");
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(AddStatusBoard);
