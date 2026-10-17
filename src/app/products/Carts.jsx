import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import {
  fetchAllCartProducts,
  fetchAllWishList,
} from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
  ShoppingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../../styles/cart.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Carts = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("param", params.id);
  const [Ankit] = useAutoAnimate();

  const userID = localStorage.getItem("userid");
  const cartItem = localStorage.getItem("cartItem") ?? 0;

  const addToCartRes = useSelector((state) => state.product.addToCartRes);

  const fetchAllCartProductsRes = useSelector(
    (state) => state.product.fetchAllCartProductsRes,
  );

  const addToWishListRes = useSelector(
    (state) => state.product.addToWishListRes,
  );

  const fetchAllWishListRes = useSelector(
    (state) => state.product.fetchAllWishListRes,
  );

  const [totalWishItem, setTotalWishItem] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [isOpenAccBox, setIsOpenAccBox] = useState(false);

  useEffect(() => {
    if (addToCartRes.status === true) {
      // setTotalCartItem(addToCartRes.data.productQuantity);
      // localStorage.setItem("cartItem", addToCartRes.data.productQuantity);
    }
  }, [addToCartRes]);

  useEffect(() => {
    dispatch(fetchAllCartProducts(userID));
  }, [addToCartRes]);

  useEffect(() => {
    dispatch(fetchAllWishList(userID));
  }, [addToWishListRes]);

  useEffect(() => {
    if (fetchAllCartProductsRes.status === true) {
      setTotalCartItem(fetchAllCartProductsRes.length);
    }
  }, [fetchAllCartProductsRes]);

  useEffect(() => {
    if (fetchAllWishListRes.status === true) {
      setTotalWishItem(fetchAllWishListRes.length ?? 0);
    }
  }, [fetchAllWishListRes]);

  return (
    <div className="flex flex-wrap gap-4 md:gap-8 font-medium">
      <div
        className="flex items-center gap-2 pointer carts relative"
        onClick={() => setIsOpenAccBox(!isOpenAccBox)}
      >
        {/* <img alt="" src="" /> */}
        <UserOutlined
          className="carts-icons"
          // style={{ fontSize: "25px" }}
        />
        <div
          onClick={() => {
            router.push(`/profile/${userID}`);
          }}
        >
          <p className="carts-main-label">Account</p>
          <p className="carts-label">LOGIN</p>
        </div>
      </div>

      <div
        className="flex items-center gap-2 pointer carts"
        onClick={() => {
          router.push("/wishlist");
        }}
      >
        {/* <img alt="" src="" /> */}
        <HeartOutlined className="carts-icons" />
        <div>
          <p className="carts-main-label">Wishlist</p>
          <div className="carts-label">
            <p className="totalWish">{`${totalWishItem}`}</p>&nbsp;items
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-2 pointer carts"
        onClick={() => {
          router.push("/checkout");
        }}
      >
        {/* <img alt="" src="" /> */}
        <ShoppingCartOutlined className="carts-icons" />
        <div>
          <p className="carts-main-label">Cart</p>
          <div className="carts-label">
            <p className="totalWish">{`${totalCartItem || cartItem}`}</p>
            &nbsp;items
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
