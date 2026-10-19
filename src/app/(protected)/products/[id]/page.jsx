"use client";
import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { useRouter, useParams } from "next/navigation";
import "../ProductsList.css";
import Header from "@/src/layouts/Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Flex, Rate, Skeleton } from "antd";
import {
  UserOutlined,
  ShoppingFilled,
  CheckCircleFilled,
  ArrowLeftOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import NoData from "@/src/components/common/NoData";
import Loader from "@/src/components/common/Loader";
import { fetchProductById, addToCart } from "@/src/redux/actions/productAction";
import { ADD_TO_CART } from "@/src/redux/constants/productType";
import { useSelector, useDispatch } from "react-redux";
import toast from "@/src/components/notification/CustomToast";
import ProductTimer from "@/src/timer/ProductTimer";
import {
  formatCurrency,
  universalFormatCurrency,
} from "@/src/utils/formatCurrency";

const ProductItems = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const userid = localStorage.getItem("userid");
  const globalDiscount = localStorage.getItem("globalDiscount") || 0;

  const fetchProductByIdRes = useSelector(
    (state) => state.product.fetchProductByIdRes,
  );

  const addToCartRes = useSelector((state) => state.product.addToCartRes);

  const fetchAllCartProductsRes = useSelector(
    (state) => state.product.fetchAllCartProductsRes,
  );

  const discountPropsApiRes = useSelector(
    (state) => state.product.discountPropsApiRes,
  );

  const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
  const [ratingValue, setRatingValue] = useState(3);

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRating, setProductRating] = useState("");
  const [productID, setProductID] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [globalProductDiscount, setGlobalProductDiscount] = useState(50);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchProductById(params.id));
  }, []);

  useEffect(() => {
    if (fetchProductByIdRes.status === true) {
      setProductName(fetchProductByIdRes.data.productName);
      setProductImage(fetchProductByIdRes.data.productImage);
      setProductTitle(fetchProductByIdRes.data.productTitle);
      setProductDescription(fetchProductByIdRes.data.productDescription);
      setProductPrice(fetchProductByIdRes.data.productPrice);
      setProductID(fetchProductByIdRes.data.productId);
      setProductRating(fetchProductByIdRes.data?.ratings?.[0]?.rating);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [fetchProductByIdRes]);

  useEffect(() => {
    if (addToCartRes.status === true) {
      setShowLoader(false);

      toast.success({ description: `${productName} ${addToCartRes.message}` });
      // router.push("/teams");

      dispatch({
        type: ADD_TO_CART,
        payload: {},
      });
    } else if (addToCartRes.status === false) {
      toast.error({ description: `${addToCartRes.error}` });
    }
  }, [addToCartRes]);

  useEffect(() => {
    if (discountPropsApiRes) {
      setGlobalProductDiscount(discountPropsApiRes.discount1);
      console.log("asc678", discountPropsApiRes);
    }
  }, [discountPropsApiRes]);

  // const asc_discountPercentage = Number(globalProductDiscount);
  const asc_discountPercentage = Number(globalDiscount);
  const asc_totalPrice = productPrice * productQuantity;
  const asc_discountedPrice =
    asc_totalPrice * (1 - asc_discountPercentage / 100);

  const divWrapperCss = {
    background: "var(--card-bg)",
    marginTop: "50px",
    borderRadius: "16px",
    boxShadow: "var(--my-shadow2)",
  };

  return (
    <div>
      <Header
        // setQuery={setQuerystring}
        placeholder={"Search..."}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products list */}
            </p>
          </div>
        }
      />

      <Skeleton
        avatar
        active
        loading={loading}
        paragraph={{ rows: 4 }}
        className="p-1 md:p-10 pt-10"
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 pb-4 px-6 2xl:mt-20!"
          style={divWrapperCss}
        >
          <div className="">
            <NextImage
              width={100}
              height={100}
              className="rounded-2xl object-cover w-dvw max-h-[360px]"
              src={productImage}
              alt="product image"
            />
          </div>

          <div className="pt-2">
            <p className="text-(--card-text) text-[16px] font-semibold">
              {productTitle}
            </p>

            <p className="text-[#8d7b68] font-semibold text-[16px]">
              {productDescription}
            </p>

            <div className="pt-2">
              <Rate
                tooltips={desc}
                // onChange={setRatingValue}
                // value={ratingValue}
                onChange={(e) => {
                  // dispatch(addReview(userid, item.productId, e));
                }}
                value={productRating}
              />
              <span className="ps-5">
                {ratingValue && <span>{desc[productRating - 1]}</span>}
              </span>
            </div>

            <div className="bg-(--card-btn-primary) text-[white] text-[16px] rounded-lg w-[150px] max-w-full my-3 p-2 flex gap-5 justify-center pointer">
              <span
                onClick={() => {
                  // setProductQuantity((prev) => prev - 1);
                  // can not enter negative values stop in 0👇
                  // setProductQuantity((prev) => Math.max(prev - 1, 0));

                  // can not enter negative values stop in 1👇
                  setProductQuantity((prev) => Math.max(prev - 1, 1));
                }}
              >
                <MinusOutlined />
              </span>

              <p>{productQuantity}</p>

              <span
                onClick={() => {
                  setProductQuantity((prev) => prev + 1);
                }}
              >
                <PlusOutlined />
              </span>
            </div>

            <p className="ps-2 text-[16px] font-semibold text-(--badge-text)">
              {/* {`-70% ₹${productPrice * productQuantity}`} */}
              {/* {`-${globalDiscount}% ₹ ${asc_discountedPrice.toFixed(2)}`} */}
              {`-${globalDiscount}% 
              ${universalFormatCurrency(asc_discountedPrice)}`}
            </p>
            <p className="pt-2 ps-2 text-[14px] font-semibold text-[#4b5966]">
              {/* {`M.R.P : ${productPrice * productQuantity}`} */}
              {/* {`M.R.P : ${asc_totalPrice.toFixed(2)}`} */}
              {`M.R.P : ${universalFormatCurrency(asc_totalPrice)}`}
            </p>

            <div className="flex gap-3 items-center">
              <div
                className="bg-(--card-btn-primary) text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-2 pointer"
                onClick={() => {
                  dispatch(addToCart(userid, productID, productQuantity));
                }}
              >
                <span className="ps-1">
                  <ShoppingCartOutlined />
                </span>
                <span className="ps-3">Add to cart</span>
              </div>

              <div>
                {fetchAllCartProductsRes?.data?.some(
                  (wish) => wish.products.productId === productID,
                ) && <CheckCircleFilled style={{ color: "#8d7b68 " }} />}
              </div>
            </div>

            <div
              className="bg-(--card-btn-primary) text-[white] text-[16px] rounded-lg ps-4 w-[150px] max-w-full my-3 p-2 pointer"
              onClick={() => {
                router.back();
              }}
            >
              <span className="ps-1">
                <ArrowLeftOutlined />
              </span>
              <span className="ps-3">Go Back</span>
            </div>
          </div>
        </div>
      </Skeleton>
      {/* product timer div start */}
      <ProductTimer />
      {/* product timer div end */}
    </div>
  );
};

export default ProductItems;
