import React from "react";

const InventoryOverview = () => {
  const inventoryData = [
    {
      title: "Total Products",
      value: "250",
    },
    {
      title: "Total Stock",
      value: "15,280",
    },
    {
      title: "Low Stock",
      value: "12",
    },
    {
      title: "Out of Stock",
      value: "5",
    },
  ];

  return (
    <div className="bg-(--card-bg) rounded-xl p-5 shadow-(--my-shadow)">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-[16px] font-semibold text-(--bg-text)">
          Inventory Overview
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Overview of your current inventory
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {inventoryData.map((item) => (
          <div
            key={item.title}
            className="border border-gray-200 rounded-lg p-4"
          >
            <p className="text-sm text-gray-500">{item.title}</p>

            <p className="text-xl font-semibold text-(--bg-text) mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryOverview;
