const initialState = {
  addProductRes: {},
  fetchAllProductsRes: {},
  fetchProductByIdRes: {},
  updateProductByIdRes: {},
  deleteProductByIdRes: {},
  addReviewRes: {},
  addToCartRes: {},
  fetchAllCartProductsRes: {},
  addToWishListRes: {},
  discountPropsApiRes: {},
  fetchAllWishListRes: {},
  timerStartRes: {},
  timerStopRes: {},
  fetchTimerByProductIdRes: {},
  fetchTimerByProductIdInHeaderRes: {},
  setTimerPropsApiRes: {},
  checkProductCodeRes: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        addProductRes: action.payload,
      };

    case "FETCH_ALL_PRODUCTS":
      return {
        ...state,
        fetchAllProductsRes: action.payload,
      };

    case "FETCH_PRODUCT_BY_ID":
      return {
        ...state,
        fetchProductByIdRes: action.payload,
      };

    case "UPDATE_PRODUCT_BY_ID":
      return {
        ...state,
        updateProductByIdRes: action.payload,
      };

    case "DELETE_PRODUCT_BY_ID":
      return {
        ...state,
        deleteProductByIdRes: action.payload,
      };

    case "ADD_REVIEW":
      return {
        ...state,
        addReviewRes: action.payload,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        addToCartRes: action.payload,
      };

    case "FETCH_ALL_CART_PRODUCTS":
      return {
        ...state,
        fetchAllCartProductsRes: action.payload,
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        addToWishListRes: action.payload,
      };

    case "FETCH_ALL_WISHLIST_PRODUCTS":
      return {
        ...state,
        fetchAllWishListRes: action.payload,
      };

    case "TIMER_START":
      return {
        ...state,
        timerStartRes: action.payload,
      };

    case "TIMER_STOP":
      return {
        ...state,
        timerStopRes: action.payload,
      };

    case "FETCH_TIMER_BY_PRODUCT_ID":
      return {
        ...state,
        fetchTimerByProductIdRes: action.payload,
      };

    case "FETCH_TIMER_BY_PRODUCT_ID_IN_HEADER":
      return {
        ...state,
        fetchTimerByProductIdInHeaderRes: action.payload,
      };

    case "CHECK_PRODUCT_CODE":
      return {
        ...state,
        checkProductCodeRes: action.payload,
      };

    // ASC REDUX PROPS START //
    case "DISCOUNT_PROPS_API":
      console.log("discount state:", action.payload);
      return {
        ...state,
        discountPropsApiRes: action.payload,
      };

    case "SET_TIMER_RUNNING_PROPS_API":
      console.log("timer state:", action.payload);
      return {
        ...state,
        setTimerPropsApiRes: action.payload,
      };
    // ASC REDUX PROPS END //

    default:
      return state;
  }
};

export default productReducer;
