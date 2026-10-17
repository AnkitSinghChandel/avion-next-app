import React from "react";
import { DatePicker } from "antd";
import "../../styles/CustomDatePicker.css";

const CustomDatePicker = (
  value,
  className,
  style,
  format,
  onChange,
  variant,
  multiple,
  allowClear,
  onKeyDown,
  prefix,
  suffixIcon,
  renderExtraFooter,
) => {
  return (
    <div>
      <DatePicker
        size="large"
        className="asc-Normal-Input"
        style={{
          ...style,
        }}
        classNames={{
          root: "",
          popup: {
            root: "",
          },
        }}
        placeholder="Select a Date"
        // open={calendarOpen}
        value={value}
        defaultValue={new Date()}
        // format={"DD-MM-YYYY"}
        format={{
          format: "DD-MM-YYYY",
          type: "mask",
        }}
        onChange={onChange}
        onKeyDown={onKeyDown}
        variant="borderless"
        // prefix={<img src={calendarIcon} alt="calendar" />}
        prefix={prefix}
        suffixIcon={suffixIcon}
        // allowClear={false}
        multiple={false}
        showWeek={false}
        renderExtraFooter={renderExtraFooter}
      />
    </div>
  );
};

export default CustomDatePicker;
