import React, { useEffect, useState, useRef } from "react";
import { FloatButton } from "antd";

const Footer = (props) => {
  return (
    <div>
      <FloatButton.BackTop
        // visibilityHeight={0} // page load hote hi show krega.
        // visibilityHeight={300} // 300px scroll ke baad show
        visibilityHeight={props.visibilityHeight || 300}
        showProgress={props.showProgress}
        style={{ position: "fixed", bottom: "15px", right: "15px" }}
      />
    </div>
  );
};

export default Footer;
