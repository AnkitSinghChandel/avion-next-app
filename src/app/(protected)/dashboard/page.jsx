"use client";
import React, { useEffect, useState } from "react";
import Header from "@/src/layouts/Header";
import "./DashBoard.css";
import { Tooltip } from "antd";
import InventoryOverview from "./InventoryOverview";
import RecentTransactions from "./RecentTransactions";

// Chart data
function SalesChart() {
  const data = [
    { month: "Jan", sales: 42000, expenses: 28000 },
    { month: "Feb", sales: 52000, expenses: 31000 },
    { month: "Mar", sales: 48000, expenses: 27000 },
    { month: "Apr", sales: 61000, expenses: 35000 },
    { month: "May", sales: 72000, expenses: 39000 },
    { month: "Jun", sales: 68000, expenses: 42000 },
    { month: "Jul", sales: 75000, expenses: 45000 },
    { month: "Aug", sales: 82000, expenses: 48000 },
    { month: "Sep", sales: 78000, expenses: 43000 },
    { month: "Oct", sales: 86000, expenses: 52000 },
    { month: "Nov", sales: 92000, expenses: 56000 },
    { month: "Dec", sales: 98000, expenses: 61000 },
  ];

  const maxValue = 100000;

  // Width per month
  const monthWidth = 100;

  const width = data.length * monthWidth;
  const height = 300;

  const getX = (index) => index * monthWidth + monthWidth / 2;

  const getY = (value) => height - (value / maxValue) * height;

  const salesPoints = data
    .map((item, index) => `${getX(index)},${getY(item.sales)}`)
    .join(" ");

  const expensePoints = data
    .map((item, index) => `${getX(index)},${getY(item.expenses)}`)
    .join(" ");

  const formatAmount = (value) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  return (
    <div className="bg-(--card-bg) rounded-xl p-5 px-1 shadow-(--my-shadow)">
      {/* Header */}
      <div className="flex items-start justify-between px-5 mb-6">
        <div>
          <h2 className="text-[16px] font-semibold text-(--bg-text)">
            Sales & Expenses
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Track your business performance over time
          </p>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-5 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-gray-600">Sales</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-gray-600">Expenses</span>
          </div>
        </div>
      </div>

      {/* Chart Scroll Area */}
      <div className="overflow-x-auto scrollbar-thin">
        <div
          style={{
            minWidth: `${width}px`,
          }}
        >
          <svg
            viewBox={`0 0 ${width} ${height + 45}`}
            className="w-full"
            preserveAspectRatio="none"
          >
            {/* Horizontal Grid */}
            {[0, 20000, 40000, 60000, 80000, 100000].map((value) => (
              <g key={value}>
                <line
                  x1="0"
                  y1={getY(value)}
                  x2={width}
                  y2={getY(value)}
                  stroke="#eef0f3"
                  strokeWidth="1"
                />

                {/* Y Axis Label */}
                <text x="5" y={getY(value) - 7} fontSize="11" fill="#9ca3af">
                  {value === 0 ? "₹0" : `₹${value / 1000}K`}
                </text>
              </g>
            ))}

            {/* Sales Area */}
            <polygon
              points={`
                0,${height}
                ${salesPoints}
                ${width},${height}
              `}
              fill="url(#salesGradient)"
            />

            {/* Expense Area */}
            <polygon
              points={`
                0,${height}
                ${expensePoints}
                ${width},${height}
              `}
              fill="url(#expenseGradient)"
            />

            {/* Sales Line */}
            <polyline
              points={salesPoints}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              className="chart-line-sales"
            />

            {/* Expenses Line */}
            <polyline
              points={expensePoints}
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              className="chart-line-expenses"
            />

            {/* Sales Points */}
            {data.map((item, index) => (
              <Tooltip
                key={`sales-${index}`}
                title={`${item.month} - Sales: ₹${item.sales.toLocaleString("en-IN")}`}
                color={"white"}
                // arrow={false}
                classNames={{
                  root: "touch-enabled-tooltip",
                  container: "text-blue-500! text-[14px]! font-semibold",
                }}
                className=""
              >
                <g key={`sales-${index}`}>
                  <circle
                    cx={getX(index)}
                    cy={getY(item.sales)}
                    r="6"
                    fill="white"
                    stroke="#2563eb"
                    strokeWidth="3"
                  />
                </g>
              </Tooltip>
            ))}

            {/* Expense Points */}
            {data.map((item, index) => (
              <Tooltip
                key={`expense-${index}`}
                title={`${item.month} - Expenses: ₹${item.expenses.toLocaleString("en-IN")}`}
                color={"white"}
                // arrow={false}
                classNames={{
                  root: "touch-enabled-tooltip",
                  container: "text-red-500! text-[14px]! font-semibold",
                }}
                className=""
              >
                <g key={`expense-${index}`}>
                  <circle
                    cx={getX(index)}
                    cy={getY(item.expenses)}
                    r="6"
                    fill="white"
                    stroke="#ef4444"
                    strokeWidth="3"
                  />
                </g>
              </Tooltip>
            ))}

            {/* Months */}
            {data.map((item, index) => (
              <g key={item.month}>
                <text
                  x={getX(index)}
                  y={height + 25}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="500"
                  fill="#6b7280"
                >
                  {item.month}
                </text>
              </g>
            ))}

            {/* Gradients */}
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopOpacity="0.18" stopColor="#2563eb" />

                <stop offset="100%" stopOpacity="0" stopColor="#2563eb" />
              </linearGradient>

              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopOpacity="0.10" stopColor="#ef4444" />

                <stop offset="100%" stopOpacity="0" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Mobile Legend */}
      <div className="flex sm:hidden items-center gap-5 text-sm mt-4 ps-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span className="text-gray-600">Sales</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-gray-600">Expenses</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 px-5 border-t">
        <div>
          <p className="text-xs text-gray-500">Total Sales</p>

          <p className="text-lg font-semibold text-(--bg-text)">
            {formatAmount(data.reduce((total, item) => total + item.sales, 0))}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Total Expenses</p>

          <p className="text-lg font-semibold text-(--bg-text)">
            {formatAmount(
              data.reduce((total, item) => total + item.expenses, 0),
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

const DashBoard = () => {
  return (
    <div>
      <Header
        // setQuery={setQuerystring}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              You are in DashBoard
            </p>
          </div>
        }
      />

      <div className="pt-5 hidden">
        <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="mt-0.5 text-blue-600">🔔</div>

          <div>
            <h3 className="text-sm font-semibold text-blue-800">
              Admin Access Only
            </h3>

            <p className="mt-1 text-sm text-blue-700">
              This dashboard is exclusively for administrators. View key
              business insights, inventory, and transaction information in one
              place.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        {/* Sales Chart */}
        <div className="pt-10 md:col-span-2">
          <SalesChart />
        </div>

        <InventoryOverview />
        <RecentTransactions />

        <img
          src="https://res.cloudinary.com/dlu4uc0ff/image/upload/v1789412645/lskiqa4vp7ftywqrnwe2.png"
          className="shadow-(--my-shadow) rounded-xl hidden"
        />

        <img
          src="https://res.cloudinary.com/dlu4uc0ff/image/upload/v1789412208/eyjz4gtkhm60hwji51hz.png"
          className="shadow-(--my-shadow) rounded-xl hidden"
        />
      </div>
    </div>
  );
};

export default DashBoard;
