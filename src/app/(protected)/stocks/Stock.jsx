"use client";
import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import productIcon from "@/src/assets/icons/product.svg";
import { Table, Space, Button, Tag, Drawer } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import "./Stock.css";
import DummyData from "./DummyData";

const Stock = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const columns = [
    {
      title: "Product",
      key: "product",
      width: 250,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <NextImage
            src={record.image}
            alt={record.product}
            width={100}
            height={100}
            style={{
              width: 40,
              borderRadius: 6,
              opacity: "90%",
              objectFit: "cover",
            }}
          />
          <span
            className="pointer"
            onClick={() => {
              setSelectedProduct(record);
              setOpen(true);
            }}
          >
            {record.product}
          </span>
        </div>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      width: 80,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      width: 200,
      // ellipsis: true,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      width: 100,
      align: "center",
      render: (stock, record) => {
        let color = "#16a34a"; // Green

        if (stock === 0) {
          color = "#ef4444"; // Red
        } else if (stock <= record.minimumStock) {
          color = "#f59e0b"; // Yellow
        }
        return (
          <span
            style={{
              color,
              fontWeight: 600,
            }}
          >
            {stock}
          </span>
        );
      },
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: 70,
      align: "center",
      filterDropdown: ({
        selectedKeys,
        setSelectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="w-40">
          {["SET", "PCS", "BOX"].map((item) => (
            <div
              key={item}
              onClick={() => {
                setSelectedKeys([item]);
                confirm({ closeDropdown: true });
              }}
              className={`cursor-pointer rounded px-3 ps-4 py-2 borderBottom ${
                selectedKeys[0] === item
                  ? "bg-blue-100 text-black/80"
                  : "hover:bg-gray-100"
              }`}
            >
              {item}
            </div>
          ))}

          <div
            className="cursor-pointer rounded px-3 py-2 text-red-500 hover:bg-red-50"
            onClick={() => {
              clearFilters?.();
              confirm({ closeDropdown: true });
            }}
          >
            Clear
          </div>
        </div>
      ),
      onFilter: (value, record) => record.unit === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      align: "center",
      filters: [
        {
          text: "In Stock",
          value: "In Stock",
        },
        {
          text: "Low Stock",
          value: "Low Stock",
        },
        {
          text: "Out Of Stock",
          value: "Out Of Stock",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = "#16a34a";

        if (status === "Out Of Stock") {
          color = "#ef4444";
        } else if (status === "Low Stock") {
          color = "#f59e0b";
        }

        return (
          // <span style={{ color, fontWeight: 600 }}>{status}</span>
          <Tag
            color={color}
            style={{
              borderRadius: "999px",
              fontWeight: 600,
              padding: "2px 10px",
            }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 160,
      align: "center",
      render: (_, record) => (
        <Space size={2}>
          <Button type="text" icon={<EyeOutlined />} />
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      // image: "https://placehold.co/45x45?text=M",
      image: productIcon,
      product: "Laptop",
      sku: "LP001",
      category: "Electronics",
      supplier: "Dell Technologies",
      stock: 150,
      unit: "PCS",
      status: "In Stock",
    },
    {
      key: "2",
      image: productIcon,
      product: "Wireless Mouse",
      sku: "MS011",
      category: "Accessories",
      supplier: "Ankit Singh Chandel Ankit Singh Chandel Ankit Singh Chandel",
      stock: 12,
      unit: "PCS",
      status: "Low Stock",
    },
    {
      key: "3",
      image: productIcon,
      product: "Keyboard",
      sku: "KB001",
      category: "Accessories",
      supplier: "HP India",
      stock: 0,
      unit: "PCS",
      status: "Out Of Stock",
    },
    {
      key: "4",
      image: productIcon,
      product: "Monitor 24",
      sku: "MN024",
      category: "Electronics",
      supplier: "LG Electronics",
      stock: 45,
      unit: "PCS",
      status: "In Stock",
    },
    {
      key: "5",
      image: productIcon,
      product: "Inkjet Printer",
      sku: "PR001",
      category: "Electronics",
      supplier: "Canon India",
      stock: 7,
      unit: "PCS",
      status: "Low Stock",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        // return "green";
        return "#16a34a";
      case "Low Stock":
        return "orange";
      case "Out Of Stock":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <div id="supp-pagination">
      <Table
        // column={{
        //   align: "center",
        //   ellipsis: true,
        //   className: "my-column",
        // }}
        columns={columns} // Header columns
        // dataSource={dataSource}
        dataSource={DummyData}
        scroll={{
          // x: 1130, // total counts of columns width
          x: 1000,
          // y: 50 * 8,
          // y: "calc(100vh - 375px)",
        }}
        // loading={loading}
        // onChange={handleTableChange}
        // expandable={{
        //   expandedRowRender: (record) => (
        //     <div>
        //       <p>Email: {record.sku}</p>
        //       <p>Phone: {record.supplier}</p>
        //     </div>
        //   ),
        // }}
        classNames={{
          content: "shadow-(--google-shadow)",
          pagination: {
            root: "flex justify-start!",
            item: "rounded-full!",
          },
        }}
        pagination={{
          // current: 1,
          // pageSize: 5,
          total: DummyData.length,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <Drawer
        title="Product Details"
        open={open}
        size={400}
        mask={false}
        classNames={{
          body: "pt-2!",
        }}
        styles={{
          wrapper: {
            top: 15,
            // height: 500,
            borderRadius: "12px 0 0 12px",
          },
          section: {
            borderRadius: "12px 0 0 12px",
          },
          body: {
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
        }}
        onClose={() => setOpen(false)}
      >
        {selectedProduct && (
          <>
            {console.log("asc556", selectedProduct)}
            <p className="ps-2 text-sm font-semibold">
              {/* {selectedProduct.product} */}
            </p>

            <div className="mt-2 p-3 border-2 border-gray-200 rounded-xl">
              <div className="flex gap-5 items-center">
                <div className="bg-gray-200 rounded-xl w-15 h-15 flex justify-center">
                  <NextImage
                    src={selectedProduct.image}
                    alt=""
                    width={100}
                    height={100}
                    className="p-2"
                  />
                </div>

                <div>
                  <p className="ps-1 text-sm font-semibold">
                    {selectedProduct.product}
                  </p>
                  <p>
                    <Tag
                      color={getStatusColor(selectedProduct.status)}
                      className="rounded-4xl font-semibold px-1 py-2"
                    >
                      {selectedProduct.status}
                    </Tag>
                  </p>
                </div>
              </div>

              {/* product information */}
              <div className="product-details pt-4">
                <div className="detail-row">
                  <span className="product-label">SKU</span>
                  <span className="product-value">{selectedProduct.sku}</span>
                </div>

                <div className="detail-row">
                  <span className="product-label">Category</span>
                  <span className="product-value">
                    {selectedProduct.category}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="product-label">Supplier</span>
                  <span className="product-value max-w-50 truncate ">
                    {selectedProduct.supplier}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="product-label">Unit</span>
                  <span className="product-value">{selectedProduct.unit}</span>
                </div>
              </div>
            </div>

            {/* stock information */}
            <div className="mt-2 p-3 border-2 border-gray-200 rounded-xl">
              <p className="text-black/70 font-bold">Stock Information</p>
              <div className="product-details pt-3">
                <div className="detail-row">
                  <span className="product-label">Current Stock</span>
                  <span className="product-value">
                    <Tag
                      color={getStatusColor(selectedProduct.status)}
                      className="rounded-4xl text-sm! font-semibold px-1 py-2"
                    >
                      {selectedProduct.stock}&nbsp;{selectedProduct.unit}
                    </Tag>
                  </span>
                </div>

                <div className="detail-row">
                  <span className="product-label">Minimum Stock</span>
                  <span className="product-value">
                    {selectedProduct.minimumStock}&nbsp;{selectedProduct.unit}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="product-label">Maximum Stock</span>
                  <span className="product-value">
                    {selectedProduct.maximumStock}&nbsp;{selectedProduct.unit}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="product-label">Lat Updated</span>
                  <span className="product-value">
                    {selectedProduct.lastUpdated}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="product-label">Updated by</span>
                  <span className="product-value">
                    {selectedProduct.updatedBy}
                  </span>
                </div>
              </div>
            </div>

            {/* recent activity */}
            <div className="mt-2 p-3 border-2 border-gray-200 rounded-xl">
              <p className="text-black/70 font-bold">Recent Activity</p>
              <div className="product-details pt-3">
                {selectedProduct.activities.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.color === "green"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.color === "green" ? (
                        <ArrowUpOutlined />
                      ) : (
                        <ArrowDownOutlined />
                      )}
                    </div>

                    <div className="min-w-14">
                      <p
                        className={`font-semibold ${
                          item.color === "green"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.quantity}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">{item.type}</p>
                      <p className="text-gray-500 text-sm">{item.reference}</p>
                      <p className="text-gray-400 text-xs">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default Stock;
