const initialState = {
  loginRes: {},
  signupRes: {},
  fetchUserRes: {},
  fetchAllUsersRes: {},
  updateUserByIdRes: {},
  deleteUserByIdRes: {},
  forgotPasswordRes: {},
  resetPasswordRes: {},
  isSidebarOpenRes: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loginRes: action.payload,
      };

    case "SIGNUP":
      return {
        ...state,
        signupRes: action.payload,
      };

    case "FETCH_USER_BY_ID":
      return {
        ...state,
        fetchUserRes: action.payload,
      };

    case "FETCH_ALL_USERS":
      return {
        ...state,
        fetchAllUsersRes: action.payload,
      };

    case "UPDATE_USER_BY_ID":
      return {
        ...state,
        updateUserByIdRes: action.payload,
      };

    case "DELETE_USER_BY_ID":
      return {
        ...state,
        deleteUserByIdRes: action.payload,
      };

    case "FORGOT_PASSWORD":
      return {
        ...state,
        forgotPasswordRes: action.payload,
      };

    case "RESET_PASSWORD":
      return {
        ...state,
        resetPasswordRes: action.payload,
      };

    /////////////////////////////////////////////////
    case "SIDEBAR_PROPS_API":
      return {
        ...state,
        isSidebarOpenRes: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
