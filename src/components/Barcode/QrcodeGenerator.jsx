import React from "react";
import { QRCodeSVG } from "qrcode.react";

// npm i html-to-image
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

const QrcodeGenerator = ({ textValue, url, isDisabled }) => {
  const handleDownloadQR = async () => {
    const node = document.getElementById("user-QR-ID");

    const dataUrl = await toPng(node);

    const link = document.createElement("a");
    link.download = "profile-qr.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <>
      <div
        id="user-QR-ID"
        // id={`user-qr-${userID}`}
        style={{
          background: "#fff",
          borderRadius: "12px",
          // padding: "20px 40px",
          padding: "10px",
          border: "1.5px solid #6a5a50",
        }}
      >
        <p className="pb-3 text-center pointer text-[#6a5a50] font-semibold hidden">
          Scan to view profile
        </p>

        <QRCodeSVG
          value={textValue ?? ""}
          // size={200}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      <p
        className="pt-3 text-center pointer text-[#6a5a50] font-semibold"
        onClick={handleDownloadQR}
      >
        Tab to Download
      </p>
    </>
  );
};

export default QrcodeGenerator;
