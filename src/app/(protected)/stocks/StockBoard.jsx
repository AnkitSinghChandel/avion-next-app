"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import NextImage from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./StockBoard.css";
import totalProduct from "@/src/assets/images/totalProduct.png";
import totalStock from "@/src/assets/images/totalStock.png";
import lowStock from "@/src/assets/images/lowStock.png";
import outOfStock from "@/src/assets/images/outOfStock.png";
import Header from "@/src/layouts/Header";
import WarningPopup from "@/src/components/dialogs/WarningPopup";
import { Tooltip, Empty, Skeleton, Pagination, Grid, Alert } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
  SyncOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import {
  fetchAllTeams,
  deleteTeamById,
  TeamsGeneratePDF,
} from "@/src/redux/actions/teamAction";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import CurrentWeekDates from "@/src/components/datePicker/CurrentWeekDates";
import toast from "@/src/components/notification/CustomToast";
import Stock from "./Stock";

const StockBoard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const SearchInputRef = useRef(null);
  const [Ankit] = useAutoAnimate();

  return (
    <div>
      {/* <header/> */}

      <Alert
        title="Development in Progress"
        description="This module is under development. Some functions may not work."
        // type="success"
        // type="info"
        // type="error"
        type="warning"
        showIcon
        closable
      />

      <div className="px-2.5">
        <div className="pt-5">
          <div className="flex gap-3 items-center">
            <Tooltip title="Back">
              <ArrowLeftOutlined
                onClick={() => {
                  router.push("/dashboard");
                }}
                className="bg-(--badge-bg) rounded-[50%] shadow-lg p-1"
                style={{ color: "white", fontSize: "16px" }}
              />
            </Tooltip>

            <p className="text-[18px] text-[#8d6b68] font-semibold">
              Inventory
            </p>
          </div>
          <p className="pt-1 text-[14px] text-gray-500 font-semibold">
            Manage stock levels, monitor Inventory movement and low stock
            alerts.
          </p>
        </div>

        <div className="pt-7 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <div className="invTopBoard">
            <div className="ps-2 h-12.5">
              <NextImage
                src={totalProduct}
                width={50}
                className="bg-blue-50 rounded-xl p-2.5"
              />
            </div>

            <div>
              <p className="invtopSubHead">Total Products</p>
              <p className="invtopMidHead">250</p>
              <p className="text-sm text-gray-500 font-medium">
                All products in catalog
              </p>
            </div>
          </div>

          <div className="invTopBoard">
            <div className="ps-2 h-12.5">
              <NextImage
                src={totalStock}
                width={50}
                className="bg-green-50 rounded-xl p-2.5"
              />
            </div>

            <div>
              <p className="invtopSubHead">Total Stock</p>
              <p className="invtopMidHead">15,280</p>
              <p className="text-sm text-gray-500 font-medium">
                Total units in stock
              </p>
            </div>
          </div>

          <div className="invTopBoard">
            <div className="ps-2 h-12.5">
              <NextImage
                src={lowStock}
                width={50}
                className="bg-amber-50 rounded-xl p-2.5"
              />
            </div>

            <div>
              <p className="invtopSubHead">Low Stock</p>
              <p className="invtopMidHead">12</p>
              <p className="text-sm text-gray-500 font-medium">
                Products low on stock
              </p>
            </div>
          </div>

          <div className="invTopBoard">
            <div className="ps-2 h-12.5">
              <NextImage
                src={outOfStock}
                width={50}
                className="bg-red-50 rounded-xl p-2.5"
              />
            </div>

            <div>
              <p className="invtopSubHead">Out of Stock</p>
              <p className="invtopMidHead">5</p>
              <p className="text-sm text-gray-500 font-medium">
                Products out of stock
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <Stock />
      </div>
    </div>
  );
};

export default StockBoard;
