import { Image, Space } from "antd";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import warningImg from "../../assets/icons/warning.svg";

const localAvatar =
  "https://s3.spire-solutions-1.res.trans-ix.whitesky.cloud/spiresolutions-dev/localAvatar.avif";

export const SmallImageAvatar = (props) => {
  return (
    <div>
      <Image
        width={30}
        height={30}
        alt="image"
        onError={(e) => {
          e.target.src = warningImg;
        }}
        src={props?.image || localAvatar}
        className={`userImg ${props?.className}`}
        // classNames={{
        //   // cover: "image-cover",
        //   cover: "rounded-full",
        // }}
        styles={{
          cover: {
            borderRadius: "50%",
          },
        }}
        preview={{
          mask: true,
          cover: (
            <Space vertical align="center">
              Preview
            </Space>
          ),
        }}
      />
    </div>
  );
};

export const BigImageAvatar = (props) => {
  return (
    <div>
      <Image
        src={props?.image || localAvatar}
        alt="image"
        onError={(e) => {
          e.target.src = warningImg;
        }}
        style={{
          width: "70px",
          height: "70px",
          // 👇 Parent ka style yaha hoga
          ...props.style,
        }}
        className={`userImg ${props?.className}`}
        // classNames={{
        //   // cover: "image-cover",
        //   cover: "rounded-full",
        // }}
        styles={{
          cover: {
            borderRadius: "50%",
          },
        }}
        preview={{
          mask: true,
          cover: (
            <Space vertical align="center">
              Preview
            </Space>
          ),
        }}
      />
    </div>
  );
};

export const AdvImageAvatar = (props) => {
  return (
    <div>
      <Image
        src={props?.image || localAvatar}
        alt="image"
        onError={(e) => {
          e.target.src = warningImg;
        }}
        style={{
          width: "",
          height: "",
          // 👇 Parent ka style yaha hoga
          ...props.style,
        }}
        className={`userImg ${props?.className}`}
        // classNames={{
        //   // cover: "image-cover",
        //   cover: "rounded-full",
        // }}
        styles={{
          cover: {
            borderRadius: "50%",
          },
        }}
        preview={{
          cover: (
            <div className="flex items-center justify-center gap-4">
              <EyeOutlined style={{ fontSize: 22 }} />
              <DeleteOutlined
                style={{ fontSize: 22 }}
                onClick={(e) => {
                  e.stopPropagation(); // important
                  props?.clearImage(null);
                }}
              />
            </div>
          ),
        }}
      />
    </div>
  );
};
