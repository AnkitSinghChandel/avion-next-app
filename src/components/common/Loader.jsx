import React from "react";
import { Spin } from "antd";

const Loader = (props) => {
  console.log("asc loader props", props);

  const contentStyle = {
    padding: 50,
    background: "transparent",
    borderRadius: 4,
  };

  const content = <div style={contentStyle} />;

  return (
    <div>
      {/* <style>
        {`
          .custom-spin .ant-spin-dot i {
            background-color: red !important;
          }
        `}
      </style> */}

      {/* <Spin size="small" /> */}

      <Spin description="Loading" size="small" className="hidden">
        {content}
      </Spin>

      <Spin
        description={props.description}
        size={props.size}
        // className="custom-spin" // to change spin color.
        className={props.className}
      >
        {content}
      </Spin>
    </div>
  );
};

export default Loader;
