import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import warningIcon from "../../assets/icons/warning.svg";
import Footer from "../../../layouts/Footer";
import {
  fetchAllCartProducts,
  fetchAllWishList,
} from "../../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  DeleteOutlined,
  MinusOutlined,
  ArrowLeftOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tooltip, Popover, FloatButton, Empty } from "antd";
import "../../styles/cart.css";
import "../../styles/asc_Anime.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  formatCurrency,
  universalFormatCurrency,
} from "../../../utils/formatCurrency";

const WishListProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
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
                navigate(-1);
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
                <img
                  src={item?.products?.productImage}
                  alt=""
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
