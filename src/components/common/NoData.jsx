import React from "react";
import { Empty } from "antd";

const NoData = (props) => {
  console.log("asc44", props);

  return (
    <div>
      {props.listData.length > 0 &&
        props.filterParameters.filter((item) =>
          item.toLowerCase().includes(props.searchValue.toLowerCase()),
        ).length === 0 && (
          <div className="font-normal text-center text-[#A9A9A9] p-2">
            {/* <img src={box} width={45} alt="" className="m-auto" /> */}
            {/* No data found! */}
            <Empty />
          </div>
        )}

      {/* Display a message when no data from API */}
      {props.listData.length === 0 && (
        <div className="font-normal text-center text-[#A9A9A9] p-2">
          {/* <img src={box} width={45} alt="" className="m-auto" /> */}
          {/* No data to display! */}
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
};

export default NoData;
