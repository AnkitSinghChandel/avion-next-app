"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import NextImage from "next/image";
import warningIcon from "@/src/assets/icons/warning.svg";
import Footer from "@/src/layouts/Footer";
import {
  fetchAllCartProducts,
  fetchAllWishList,
} from "@/src/redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  DeleteOutlined,
  MinusOutlined,
  ArrowLeftOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tooltip, Popover, FloatButton, Empty } from "antd";
import "../checkout/cart.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  formatCurrency,
  universalFormatCurrency,
} from "@/src/utils/formatCurrency";

const WishListProducts = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const path = usePathname();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const userID = localStorage.getItem("userid");

  const fetchAllWishListRes = useSelector(
    (state) => state.product.fetchAllWishListRes,
  );

  const [wishListProducts, setWishListProducts] = useState([]);
  const [productQuantity, setProductQuantity] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    dispatch(fetchAllWishList(userID));
  }, []);

  useEffect(() => {
    if (fetchAllWishListRes.status === true) {
      setWishListProducts(fetchAllWishListRes.data);
      setTimeout(() => {
        setLoadingData(false);
      }, [1000]);
    }
  }, [fetchAllWishListRes]);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="overflow-hidden">
      <div className="flex gap-8 justify-between items-center px-">
        <p className="text-[18px] text-[#4b5966] font-[500] py-5">
          Wish List Products... &nbsp;
          <SyncOutlined spin={loadingData} />
        </p>

        <div
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-delay="300" // Delay increases per product.
          data-aos-duration="1000"
        >
          <Tooltip title="Back">
            <ArrowLeftOutlined
              onClick={() => {
                router.back();
              }}
              className="bg-(--badge-bg) rounded-[50%] shadow-lg p-2"
              style={{ color: "white", fontSize: "20px" }}
            />
          </Tooltip>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-">
        {wishListProducts.map((item, index) => {
          return (
            <div
              className="w-full max-w-full mx-auto py-3 px-2"
              key={item.productId}
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-delay={(index % 6) * 100}
              data-aos-duration="700"
            >
              <div className="bg-[lightgrey] p-1 w-[20-0px] min-h-40 rounded-xl">
                <NextImage
                  src={item?.products?.productImage}
                  alt=""
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                  // onLoad={}
                  onError={(e) => {
                    e.target.src = warningIcon;
                  }}
                />
              </div>

              <div className="pt-2 ps-3">
                <p className="productTitle">{item?.products?.productTitle}</p>
                <p className="productName pt-2 truncate">
                  {item?.products?.productDescription}
                </p>
                <p className="pt-2 text-(--badge-text) font-semibold">
                  {/* {`₹ ${item?.products?.productPrice}`} */}
                  {universalFormatCurrency(item?.products?.productPrice)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {wishListProducts?.length === 0 && (
        <div className="mt-20">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default WishListProducts;
