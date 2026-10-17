import React from "react";
import {
  FileTextOutlined,
  FilePdfOutlined,
  FileJpgOutlined,
  FileWordOutlined,
  FilePptOutlined,
  FileExcelOutlined,
  JavaScriptOutlined,
} from "@ant-design/icons";

export const fileExtensionType = (type = "file", type2) => {
  let fileExtension =
    type === "txt" || type === "file" ? (
      <FileTextOutlined style={{ fontSize: "26px", color: "#C43E1C" }} />
    ) : type === "csv" ? (
      <FileTextOutlined style={{ fontSize: "26px", color: "#107C41 " }} />
    ) : type === "xls" || type === "xlsx" ? (
      <FileExcelOutlined style={{ fontSize: "26px", color: "#107C41" }} />
    ) : type === "docx" || type === "doc" ? (
      <FileWordOutlined style={{ fontSize: "26px", color: "#2B579A" }} />
    ) : type === "ppt" || type === "pptx" ? (
      <FilePptOutlined style={{ fontSize: "26px", color: "#C43E1C" }} />
    ) : type === "jpg" ||
      type === "jpeg" ||
      type === "png" ||
      type === "gif" ? (
      <FileJpgOutlined style={{ fontSize: "26px", color: "#E17B34 " }} />
    ) : type === "pdf" ? (
      <FilePdfOutlined style={{ fontSize: "26px", color: "#FF0000" }} />
    ) : type === "svg" ? (
      <FileTextOutlined style={{ fontSize: "26px", color: "#FF0000" }} />
    ) : type === "js" ? (
      <JavaScriptOutlined style={{ fontSize: "26px", color: "#F7DF1E" }} />
    ) : (
      <FileTextOutlined style={{ fontSize: "26px", color: "#C43E1C" }} />
    );

  return fileExtension;
};

export const downloadFile = async (url, fileName) => {
  const blob = await fetch(url).then((res) => res.blob());

  const blobUrl = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = fileName;
  a.click();

  window.URL.revokeObjectURL(blobUrl);
};

export const downloadFile2 = async (url, fileName) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.log("Download failed", error);
  }
};
