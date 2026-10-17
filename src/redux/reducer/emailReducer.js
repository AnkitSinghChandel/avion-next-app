const initialState = {
  sendEmailRes: {},
  sendOTPEmailRes: {},
  veryfyOtpRes: {},
};

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_EMAIL_SUCCESS":
      return {
        ...state,
        sendEmailRes: action.payload,
      };

    case "SEND_OTP_EMAIL_SUCCESS":
      return {
        ...state,
        sendOTPEmailRes: action.payload,
      };

    case "VERIFY_OTP":
      return {
        ...state,
        veryfyOtpRes: action.payload,
      };

    default:
      return state;
  }
};

export default emailReducer;
