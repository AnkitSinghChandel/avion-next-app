import React from "react";

const RecentTransactions = () => {
  const transactions = [
    {
      id: "INV-1024",
      customer: "Rahul Sharma",
      amount: 12500,
      status: "Paid",
    },
    {
      id: "INV-1023",
      customer: "Amit Kumar",
      amount: 8200,
      status: "Paid",
    },
    {
      id: "INV-1022",
      customer: "Neha Singh",
      amount: 15400,
      status: "Pending",
    },
    {
      id: "INV-1021",
      customer: "Rohit Verma",
      amount: 5800,
      status: "Paid",
    },
  ];

  return (
    <div className="bg-(--card-bg) rounded-xl p-5 shadow-(--my-shadow)">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-[16px] font-semibold text-(--bg-text)">
          Recent Transactions
        </h2>

        <p className="text-sm text-gray-500 mt-1">Latest sales transactions</p>
      </div>

      {/* Transactions */}
      <div className="space-y-4">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-(--bg-text)">{item.id}</p>

              <p className="text-xs text-gray-500 mt-1">{item.customer}</p>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-(--bg-text)">
                ₹{item.amount.toLocaleString("en-IN")}
              </p>

              <span
                className={`text-xs font-medium ${
                  item.status === "Paid" ? "text-green-500" : "text-orange-500"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
