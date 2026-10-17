import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router";

const PDFviewer = () => {
  const location = useLocation();
  const { state } = useLocation();

  // const queryParams = new URLSearchParams(window.location.search);
  const queryParams = new URLSearchParams(location.search);
  const fileName = queryParams.get("fileName");
  const fileUrl = queryParams.get("url");
  const asc = queryParams.get("asc");
  const asc2 = queryParams.get("asc2");

  // agar param me kuch set / update karna hai to
  queryParams.set("asc3", "AnkitSinghUpdated");

  const PDFName = state?.fileName || fileName;
  const PDFUrl = state?.fileUrl || fileUrl;

  useEffect(() => {
    document.title = PDFName;
  }, [PDFName]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe src={PDFUrl} width="100%" height="100%"></iframe>
    </div>
  );
};

export default PDFviewer;
