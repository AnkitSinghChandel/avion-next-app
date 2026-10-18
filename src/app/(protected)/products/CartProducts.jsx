import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import warningIcon from "../../assets/icons/warning.svg";
import Footer from "../../layouts/Footer";
import { fetchAllCartProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  SyncOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Tooltip, Checkbox, Empty } from "antd";
import "../../styles/cart.css";
import "../../styles/asc_Anime.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  formatCurrency,
  universalFormatCurrency,
} from "../../utils/formatCurrency";

const CartProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const userID = localStorage.getItem("userid");

  const fetchAllCartProductsRes = useSelector(
    (state) => state.product.fetchAllCartProductsRes,
  );

  const [cartProducts, setCartProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    dispatch(fetchAllCartProducts(userID));
  }, []);

  useEffect(() => {
    if (fetchAllCartProductsRes.status === true) {
      setCartProducts(fetchAllCartProductsRes.data);
      setTimeout(() => {
        setLoadingData(false);
      }, [1000]);
    }
  }, [fetchAllCartProductsRes]);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleIncrease = (index, productId) => {
    const updatedList = [...cartProducts];
    updatedList[index] = { ...updatedList[index] }; // object ke bhi copy
    updatedList[index].productQuantity = updatedList[index].productQuantity + 1;

    console.log("index, productId", index, productId);
    console.log("Updated index Product:", updatedList[index]);
    console.log("Updated Product List:", updatedList); // पूरी updated list

    setCartProducts(updatedList);
  };

  const handleIncrease_Best = (productId) => {
    setCartProducts((prev) =>
      prev.map((item) =>
        item.products.productId === productId
          ? {
              ...item,
              productQuantity: item.productQuantity + 1,
            }
          : item,
      ),
    );
  };

  const handleDecrease = (index, productId) => {
    const updatedList = [...cartProducts];
    updatedList[index] = { ...updatedList[index] };
    updatedList[index].productQuantity = Math.max(
      updatedList[index].productQuantity - 1,
      1, // prevent going below 1
    );
    setCartProducts(updatedList);
  };

  console.log("asc223", cartProducts);

  return (
    <div>
      <div className="flex gap-8 justify-between items-center px-">
        <p className="text-[18px] text-[#4b5966] font-[500] py-5">
          Check Out Products... &nbsp;
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

      {cartProducts.map((item, index) => {
        return (
          <div
            className="border-b border-dashed py-5 ps-2 lg:ps-3"
            key={item.productId}
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay={(index % 4) * 100}
            data-aos-duration="700"
          >
            <Checkbox onChange={onChange}>
              <div className="flex gap-3 items-center ps-3">
                <img
                  src={item?.products?.productImage}
                  alt=""
                  className="w-[100px] h-[60px] object-cover rounded-lg"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = warningIcon;
                  }}
                />

                <div className="productTitle w-auto">
                  <p>{item?.products?.productTitle}</p>
                  {/* <p>{item?.products?.productDescription}</p> */}
                  <p>
                    {item?.products?.productDescription.length > 30
                      ? item?.products?.productDescription.slice(0, 30) + "..."
                      : item?.products?.productDescription}
                  </p>
                </div>
              </div>
            </Checkbox>

            <div className="flex gap-4 items-center pt-3 ps-2 text-center">
              <div className="bg-(--card-btn-primary) text-[white] text-[16px] rounded-lg w-[150px] max-w-full my-3 p-2 flex gap-5 justify-center pointer">
                <span
                  onClick={() => handleDecrease(index, item.products.productId)}
                >
                  <MinusOutlined />
                </span>

                <p>{item.productQuantity}</p>

                <span
                  onClick={() => handleIncrease(index, item.products.productId)}
                >
                  <PlusOutlined />
                </span>
              </div>

              <div className="w-[100px] text-(--badge-text) font-bold">
                {/* <p>{`₹ ${item?.products?.productPrice}`}</p> */}
                <p>{universalFormatCurrency(item?.products?.productPrice)}</p>
              </div>

              <div>
                <DeleteOutlined className="text-[red]! hover:text-[#8d7b68]! pointer" />
              </div>
            </div>
          </div>
        );
      })}
      {cartProducts?.length === 0 && (
        <div className="mt-20">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CartProducts;
