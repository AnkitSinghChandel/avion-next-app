import React from "react";
import "./MyPhoneInput.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const MyPhoneInput = React.memo(
  ({ value, onChange, disabled = false, className, style }) => {
    return (
      <PhoneInput
        hideDropdown={false}
        disabled={disabled}
        placeholder="Enter your Phone Number"
        defaultCountry="in"
        value={value}
        onChange={onChange}
        className={className}
        style={style}
      />
    );
  },
);

export default MyPhoneInput;
