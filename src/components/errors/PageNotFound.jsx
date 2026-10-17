import React from "react";
import { AddButton } from "../buttons/GlobalButtons";
import { useNavigate } from "react-router";
import { Button, Result } from "antd";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <AddButton
            className="mt-3"
            label={"Go Back"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
    </div>
  );
};

export default PageNotFound;
