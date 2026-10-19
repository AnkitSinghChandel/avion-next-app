"use client";
import React, { useEffect, useState, useRef } from "react";
import NextImage from "next/image";
import { useRouter, useParams } from "next/navigation";
import "./ProductsList.css";
import Header from "@/src/layouts/Header";
import Footer from "@/src/layouts/Footer";
import WarningPopup from "@/src/components/dialogs/WarningPopup";
import {
  formatCurrency,
  universalFormatCurrency,
} from "@/src/utils/formatCurrency";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Rate, Tooltip, Skeleton, Pagination } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  PlusOutlined,
} from "@ant-design/icons";
import NoData from "@/src/components/common/NoData";
import Loader from "@/src/components/common/Loader";
import { SpinnerLoader } from "@/src/components/common/MultiLoader";
import { CustomLoader } from "@/src/components/customSVG/CustomLoader";
import {
  fetchAllProducts,
  deleteProductById,
  addReview,
  addToWishList,
} from "@/src/redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import toast from "@/src/components/notification/CustomToast";

const ProductsList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const userid = localStorage.getItem("userid");
  const globalDiscount = localStorage.getItem("globalDiscount");
  const isAdmin = process.env.NEXT_PUBLIC_ADMIN === userid;

  const fetchAllProductsRes = useSelector(
    (state) => state.product.fetchAllProductsRes,
  );

  const deleteProductByIdRes = useSelector(
    (state) => state.product.deleteProductByIdRes,
  );

  const addReviewRes = useSelector((state) => state.product.addReviewRes);

  const addToWishListRes = useSelector(
    (state) => state.product.addToWishListRes,
  );

  const fetchAllWishListRes = useSelector(
    (state) => state.product.fetchAllWishListRes,
  );

  // pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(12);
  // pagination end

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [ratingValue, setRatingValue] = useState(3);
  const [querystring, setQuerystring] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productID, setProductID] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [imgLoading, setImgLoading] = useState([]);

  // asc cancel popup start
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = () => {
    router.back();
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end

  useEffect(() => {
    dispatch(fetchAllProducts(currentPage, limit, querystring));
  }, [currentPage, limit, querystring, deleteProductByIdRes, addReviewRes]);

  useEffect(() => {
    if (fetchAllProductsRes.status === true) {
      setProductsData(fetchAllProductsRes?.data);
      // for infinity scroll end
      // if (currentPage === 1) {
      //   setProductsData(fetchAllProductsRes.data);
      // } else {
      //   setProductsData((prev) => [...prev, ...fetchAllProductsRes.data]);
      // }
      // isLoadingMoreRef.current = false;
      // for infinity scroll end
      setTotalPages(fetchAllProductsRes?.pagination?.totalPages);
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }
  }, [fetchAllProductsRes]);

  useEffect(() => {
    if (addReviewRes.status === true) {
      toast.success({
        description: `${productName} Rating added successfully`,
      });
    }
  }, [addReviewRes]);

  useEffect(() => {
    if (addToWishListRes.status === true) {
      toast.success({ description: `${addToWishListRes.message}` });
    }
  }, [addToWishListRes]);

  const handleDeleteTeam = () => {
    dispatch(deleteProductById(productID));
    setCancelPopupShow(false);
  };

  useEffect(() => {
    if (deleteProductByIdRes?.status === true) {
      toast.success({ description: `${productName} Deleted successfully` });
    }
  }, [deleteProductByIdRes]);

  // infinity scroll start
  const [loadingMore, setLoadingMore] = useState(false);

  const isLoadingMoreRef = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (isBottom && currentPage < totalPages && !isLoadingMoreRef.current) {
        isLoadingMoreRef.current = true;
        setLoadingMore(true);
        setCurrentPage((prev) => prev + 1);
      }
    };

    // window.addEventListener("scroll", handleScroll);

    return () => {
      // window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, totalPages]);
  // infinity scroll end

  return (
    <div className="">
      <Header
        setQuery={setQuerystring}
        placeholder={"Search..."}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products list */}
            </p>
          </div>
        }
      />

      {cancelPopupShow && (
        <WarningPopup
          open={cancelPopupShow}
          // onCancel={() => setCancelPopupShow(false)}
          onCancel={handleClose}
          onOk={handleDeleteTeam}
          title={""}
          keyboard={true}
        />
      )}

      {showLoader ? (
        <div className="flex justify-center items-center h-[60vh]">
          {/* <Loader size="large" description="" className="custom-spin" /> */}
          <CustomLoader size={90} />
        </div>
      ) : (
        <>
          <div
            className="add-product ascButton ripple pointer ms-auto mt-8 w-full! sm:w-40!"
            onClick={() => {
              router.push("/products/create");
            }}
          >
            <PlusOutlined className="pe-1" />
            <p className="p-1 pb-1.5 font-mediu-m">Add Product</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-15 p-0 sm:p-2 sm:pt-7">
            {productsData
              // .filter(
              //   (item) =>
              //     item.productTitle
              //       ?.toLowerCase()
              //       .includes(querystring.toLowerCase()) ||
              //     item.productDescription
              //       ?.toLowerCase()
              //       .includes(querystring.toLowerCase()) ||
              //     item.productName
              //       ?.toLowerCase()
              //       .includes(querystring.toLowerCase()),
              // )
              .map((item, index) => {
                const isLoading = imgLoading[index];
                return (
                  <div
                    className="productsBox p-4 w-full relative"
                    key={item.productId}
                  >
                    <div
                      className="productImage rounded-lg pointer"
                      onClick={() => {
                        router.push(`/products/${item.productId}`);
                      }}
                    >
                      {isLoading && <Skeleton.Image active />}
                      <NextImage
                        src={item.productImage}
                        alt="products"
                        width={198}
                        height={132}
                        className="rounded-lg w-full aspect-3/2 object-cover"
                        onLoad={() => {
                          // setImgLoading(false);
                          setImgLoading((prev) => {
                            const updated = [...prev];
                            updated[index] = false;
                            return updated;
                          });
                        }}
                        onError={(e) => {
                          // e.target.src = warningImg;
                          // setImgLoading(false);
                        }}
                        style={{ display: isLoading ? "none" : "block" }}
                      />
                    </div>

                    <div
                      className="ms-auto float-end pt-3 pointer ascButton absolute top-0 right-2.5"
                      onClick={(e) => {
                        e.stopPropagation(); // Event ko parent tak mat jane do.
                        // e.preventDefault(); // Browser ka default behavior mat hone do
                        dispatch(addToWishList(userid, item.productId));
                      }}
                    >
                      {fetchAllWishListRes?.data?.some(
                        (wish) => wish.productId === item.productId,
                      ) ? (
                        <HeartFilled style={{ color: "var(--badge-bg)" }} />
                      ) : (
                        <HeartOutlined />
                      )}
                    </div>

                    <div className="pt-5">
                      <p className="productTitle">{item.productTitle}</p>
                      <p className="pt-2 productName hidden">
                        {item.productName}
                      </p>

                      <div className="pt-2">
                        <Rate
                          tooltips={desc}
                          // onChange={setRatingValue}
                          // value={ratingValue}
                          onChange={(e) => {
                            setProductName(item.productTitle);
                            dispatch(addReview(userid, item.productId, e));
                          }}
                          value={item.ratings?.[0]?.rating}
                        />
                        <br />
                        {ratingValue && (
                          <span>{desc[item.ratings?.[0]?.rating - 1]}</span>
                        )}
                      </div>

                      <div className="font-bold text-[14px] text-(--badge-text) flex gap-4 pt-2">
                        {/* {`$ ${item.productPrice}`} */}
                        <span className="">
                          {/* {`₹ ${Number(
                            item.productPrice * (1 - globalDiscount / 100),
                          ).toFixed(2)}`} */}

                          {universalFormatCurrency(
                            item.productPrice * (1 - globalDiscount / 100),
                          )}
                        </span>
                        <span className="font-normal text-[#777] line-through">
                          {/* {`₹ ${Number(item.productPrice).toFixed(2)}`} */}
                          {universalFormatCurrency(item.productPrice)}
                        </span>
                      </div>

                      <Tooltip
                        title={"Only for Admin"}
                        color="#fff"
                        align={{ offset: [0, 5] }}
                      >
                        <div
                          className={`${!isAdmin && "pointerNone"} flex flex-wrap sm:flex-nowrap justify-between gap-2 pt-4 text-center`}
                        >
                          <div
                            className="bg-blue-200 text-(--badge-text) text-[14px] font-medium rounded-xl ps- w-full max-w-full p-1 pointer ascButton"
                            onClick={() => {
                              if (!isAdmin) return;
                              router.push(`/products/${item.productId}/edit`);
                            }}
                          >
                            <span className="ps-0">
                              <EditOutlined />
                            </span>
                            <span className="ps-2">Edit</span>
                          </div>

                          <div
                            className="bg-red-200 text-(--badge-text) text-[14px] font-medium rounded-xl ps- w-full max-w-full p-1 pointer ascButton"
                            onClick={() => {
                              setProductName(item.productName);
                              setProductID(item.productId);
                              setCancelPopupShow(true);
                            }}
                          >
                            <span className="ps-0">
                              <DeleteOutlined />
                            </span>
                            <span className="ps-2">Delete</span>
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* Display a message when no search are found */}
          <NoData
            listData={productsData}
            searchValue={querystring}
            filterParameters={productsData.map(
              (x) =>
                `${x.productTitle} ${x.productDescription} ${x.productName}`,
            )}
          />

          <div className="pt-6 pb-5" id="supp-pagination">
            <Pagination
              align="start"
              classNames={{
                root: "root-pagination",
                item: "rounded-full!",
              }}
              className=""
              current={currentPage}
              pageSize={limit}
              // total={500}
              total={fetchAllProductsRes?.pagination?.totalProducts}
              showQuickJumper
              onChange={(page, pageSize) => {
                setCurrentPage(page);
                setLimit(pageSize);
              }}
            />
          </div>

          {/* loader for infinity scroll */}
          {loadingMore && (
            <div className="flex justify-center py-5">
              <CustomLoader size={50} />
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default ProductsList;
