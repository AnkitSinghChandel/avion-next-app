import React from "react";
import PhoneInput from "antd-phone-input";
import "./MyPhoneInput.css";

const MyPhoneInput = React.memo(({ value, onChange, disabled = false }) => {
  return (
    <PhoneInput
      useSVG
      distinct
      // enableArrow
      disabled={disabled}
      enableSearch
      disableParentheses
      placeholder="Enter your Phone Number"
      country="in"
      value={value}
      onChange={onChange}
    />
  );
});

export default MyPhoneInput;
