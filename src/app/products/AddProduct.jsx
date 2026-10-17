import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "./AddProduct.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Header from "../../layouts/Header";
import WarningPopup from "../../components/dialogs/WarningPopup";
import addicon from "../../assets/icons/addicon.svg";
import singleUser from "../../assets/icons/singleUser.svg";
import setting from "../../assets/icons/setting.svg";
import product from "../../assets/icons/product.svg";
import ASC22 from "../../assets/images/ASC22.jpg";
import DownArrowOption from "../../assets/icons/DownArrowOption.svg";
import Xicon from "../../assets/icons/Xicon.svg";
import searchicon from "../../assets/icons/search.svg";
import calendarIcon from "../../assets/icons/calendarIcon.svg";
import doubleUser from "../../assets/icons/doubleUser.svg";
import { generateSvg } from "./generateSvg";
import {
  addProduct,
  fetchProductById,
  updateProductById,
  checkProductCode,
} from "../../redux/actions/productAction";
import { singleUploadToS3 } from "../../redux/actions/commonAction";
import {
  ADD_PRODUCT,
  UPDATE_PRODUCT_BY_ID,
} from "../../redux/constants/productType";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Spin, ColorPicker, Button, Input } from "antd";
import toast from "../../components/notification/CustomToast";
import moment from "moment";
import NoData from "../../components/common/NoData";
import useDeviceType from "../../layouts/useDeviceType";
import {
  AddButton,
  CancelButton,
} from "../../components/buttons/GlobalButtons";
import { CurrencyInput } from "../../components/common/CurrencyInput";
import BarcodeGenerator from "../../components/Barcode/BarcodeGenerator";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  console.log("param", params.id);
  const isUpdating = Boolean(params.id);
  const deviceType = useDeviceType();
  const [Ankit] = useAutoAnimate();
  const hiddenFileInput = useRef(null);
  const { TextArea } = Input;

  const addProductRes = useSelector((state) => state.product.addProductRes);
  const fetchProductByIdRes = useSelector(
    (state) => state.product.fetchProductByIdRes,
  );
  const updateProductByIdRes = useSelector(
    (state) => state.product.updateProductByIdRes,
  );

  const checkProductCodeRes = useSelector(
    (state) => state.product.checkProductCodeRes,
  );

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [attachmentData, setAttachmentData] = useState([]);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productWidth, setProductWidth] = useState("");
  const [productHeight, setProductHeight] = useState("");
  const [productColor, setProductColor] = useState("#256d63");
  const [productCode, setProductCode] = useState("");
  const [productQty, setProductQty] = useState(1);
  const [productDescription, setProductDescription] = useState("");
  const [productID, setProductID] = useState("");
  const [warning, setWarning] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isProductCodeType, setIsProductCodeType] = useState(false);
  const [productCodeExists, setProductCodeExists] = useState(false);

  // asc cancel popup start
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = () => {
    // history.push("/InvoiceAllList");
    navigate(-1);
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end

  useEffect(() => {
    if (addProductRes?.status === true) {
      setShowLoader(false);

      toast.success({ description: `${productName} Added successfully` });
      navigate("/products");

      dispatch({
        type: ADD_PRODUCT,
        payload: {},
      });
    } else if (addProductRes?.status === false) {
      toast.error({ description: `Failed to add product ${productName}` });
    }
  }, [addProductRes]);

  const handleAddProduct = async () => {
    if (
      productName === "" ||
      productImage === "" ||
      productTitle === "" ||
      productPrice === "" ||
      productWidth === "" ||
      productHeight === "" ||
      productDescription === ""
    ) {
      setWarning(true);
      return false;
    }

    try {
      setShowLoader(true);

      // Generate SVG
      const svg = await generateSvg({
        productName,
        productTitle,
        productWidth,
        productHeight,
        productColor,
      });

      // Convert SVG string to File
      const file = new File([svg], `${productName || "product"}.svg`, {
        type: "image/svg+xml",
      });

      // Upload to Cloudinary
      const uploadRes = await dispatch(singleUploadToS3(file, () => {}));

      // payload
      await dispatch(
        addProduct({
          productName: productName,
          // productImage,
          productImage: uploadRes.secure_url, // productImage
          productTitle: productTitle,
          productDescription: productDescription,
          productPrice: productPrice,
          productWidth: Number(productWidth),
          productHeight: Number(productHeight),
          productColor: productColor,
          productQty: productQty,
          productCode: productCode,
        }),
      );
    } catch (error) {
      setShowLoader(false);
    } finally {
      setShowLoader(false);
    }
  };

  // fetch and update products below👇
  useEffect(() => {
    if (isUpdating) {
      dispatch(fetchProductById(params.id));
    }
  }, [isUpdating]);

  useEffect(() => {
    if (fetchProductByIdRes.status === true) {
      setProductName(fetchProductByIdRes.data.productName);
      setProductImage(fetchProductByIdRes.data.productImage);
      setProductTitle(fetchProductByIdRes.data.productTitle);
      setProductPrice(fetchProductByIdRes.data.productPrice);
      setProductWidth(fetchProductByIdRes.data.productWidth);
      setProductHeight(fetchProductByIdRes.data.productHeight);
      setProductCode(fetchProductByIdRes.data.productCode);
      setProductQty(fetchProductByIdRes.data.productQty);
      setProductDescription(fetchProductByIdRes.data.productDescription);
    }
  }, [fetchProductByIdRes]);

  const handleUpdateProduct = async () => {
    if (
      productName === "" ||
      productImage === "" ||
      productTitle === "" ||
      productDescription === "" ||
      productPrice === ""
    ) {
      setWarning(true);
      return false;
    }

    try {
      setShowLoader(true);

      // Generate SVG
      const svg = await generateSvg({
        productName,
        productTitle,
        productWidth,
        productHeight,
        productColor,
      });

      // Convert SVG string to File
      const file = new File([svg], `${productName || "product"}.svg`, {
        type: "image/svg+xml",
      });

      // Upload to Cloudinary
      const uploadRes = await dispatch(singleUploadToS3(file, () => {}));

      // payload
      await dispatch(
        updateProductById(params.id, {
          productName: productName,
          // productImage,
          productImage: uploadRes.secure_url, // productImage
          productTitle: productTitle,
          productDescription,
          productPrice: productPrice,
          productWidth: Number(productWidth),
          productHeight: Number(productHeight),
          productColor: productColor,
          productQty: productQty,
        }),
      );
    } catch (error) {
      setShowLoader(false);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    if (updateProductByIdRes?.status === true) {
      setShowLoader(false);

      toast.success({ description: `${productName} Updated successfully` });
      navigate("/products");

      dispatch({
        type: UPDATE_PRODUCT_BY_ID,
        payload: {},
      });
    } else if (updateProductByIdRes?.status === false) {
      toast.error({ description: `Failed to update product ${productName}` });
    }
  }, [updateProductByIdRes]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddProduct();
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    const preview = async () => {
      const svg = await generateSvg({
        productName,
        productTitle,
        productWidth,
        productHeight,
        productColor,
      });

      const svgUrl =
        "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);

      setProductImage(svgUrl);
    };

    preview();
  }, [productName, productTitle, productWidth, productHeight, productColor]);

  useEffect(() => {
    if (!productCode || !isProductCodeType) return;
    const timer = setTimeout(() => {
      dispatch(checkProductCode(productCode)).then((res) => {
        setProductCodeExists(res?.available);
      });
    }, 300); // debounce delay
    return () => clearTimeout(timer); // cleanup
  }, [dispatch, productCode, isProductCodeType]);

  const divWrapperCss = {
    background: "var(--card-bg)",
    padding: "30px 10px",
    borderRadius: "16px",
    boxShadow: "var(--my-shadow)",
  };

  return (
    <div>
      <Header
        // setQuery={setQuerystring}
        placeholder={"Search..."}
        leftComponent={
          <div className="leftComponentCss">
            <p className="text-[#5CAF90] font-medium text-[18px]">
              {/* You are in Products list */}
            </p>
          </div>
        }
      />

      {cancelPopupShow && (
        <WarningPopup
          open={cancelPopupShow}
          // onCancel={() => setCancelPopupShow(false)}
          onCancel={handleClose}
          onOk={handleYes}
          title={""}
          keyboard={true}
        />
      )}

      <div className="flex justify-center md:justify-end flex-wrap gap-4 pt-10 p-6 px-1">
        <CancelButton
          label={"Cancel"}
          className="w-full! sm:w-45!"
          onClick={() => {
            if (typeInScreen !== "") {
              setCancelPopupShow(true);
            } else {
              // history.goBack();
              navigate(-1);
            }
          }}
        />

        <AddButton
          disabled={
            showLoader || (isProductCodeType && !checkProductCodeRes?.available)
          }
          // onClick={handleAddProduct}
          onClick={() => {
            isUpdating ? handleUpdateProduct() : handleAddProduct();
          }}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          className="addButton w-full! sm:w-45!"
          extraComponent={
            showLoader ? (
              <div>
                <Spin size="small" className="btn-custom-spin" />
                <span className="px-2">Updating...</span>
              </div>
            ) : (
              <div className="flex gap-3 justify-center pe-">
                <img
                  className="icons mx-"
                  src={btnHover ? addicon : doubleUser}
                  alt=""
                />
                {isUpdating ? "Update Product" : "Add Product"}
              </div>
            )
          }
        />
      </div>

      <div className="sm:px-7!" style={divWrapperCss}>
        <Row gutter={[32, 16]} className="pt-1">
          <Col xs={24} sm={24} md={24} lg={12}>
            {/* circle img div start */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                // const droppedFile = Array.from(e.dataTransfer.files);
                // if (droppedFile.length > 0) {
                //   console.log("drop imgs", droppedFile);
                //   setAttachmentData(droppedFile);
                // }

                // single file upload👇
                const fileUploaded = e.dataTransfer.files[0];
                if (fileUploaded) {
                  const imageLink = URL.createObjectURL(fileUploaded);
                  // setProductImage({ url: imageLink, name: fileUploaded.name }); // Store both URL and name.
                  setProductImage(imageLink);
                  setTypeInScreen(imageLink);
                }
              }}
            >
              {/* no need to use ref if we use setting img under label */}
              <label>
                <img src={setting} alt="" width={20} />
                <input
                  type="file"
                  ref={hiddenFileInput}
                  multiple
                  accept="image/*"
                  // accept=".doc,.docx,.pdf,.xls,.xlsx,.xml,"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    console.log("fileList", e.target.files);
                    // setAttachmentData(e.target.files[0]); // single file upload.
                    const selectedFiles = Array.from(e.target.files);
                    setAttachmentData(selectedFiles);

                    // single file upload👇
                    const fileUploaded = e.target.files[0];
                    if (fileUploaded) {
                      const imageLink = URL.createObjectURL(fileUploaded);
                      // setProductImage({ url: imageLink, name: fileUploaded.name }); // Store both URL and name.
                      setProductImage(imageLink);
                      setTypeInScreen(imageLink);
                    }
                  }}
                />
              </label>
              {/* circle input img start */}
              <div className="circle-input-img m-auto">
                {productImage ? (
                  <img
                    src={productImage}
                    alt=""
                    className="selectedImg"
                    onClick={handleClick}
                  />
                ) : (
                  <>
                    <img
                      src={product}
                      alt=""
                      width={60}
                      className="icon pointer opacity-35"
                      onClick={handleClick}
                    />
                    <br />
                    <p className="opacity-60">Add or Drag a photo</p>
                  </>
                )}
              </div>
              {/* circle input img end */}
            </div>
            {/* circle img div end */}

            <div className="mt-6 mb-9 w-full">
              <BarcodeGenerator textValue={`BC${productCode}`} />
              <Input
                showCount
                maxLength={10}
                value={productCode}
                onChange={(e) => {
                  setProductCode(e.target.value);
                  setIsProductCodeType(true);
                }}
                placeholder="Product Code (SKU)"
                className="mt-2 text-center!"
                classNames={{
                  root: "text-center! bg-(--bg)! border-[1.5px]! border-[#d8cdc2]! shadow-none!",
                  input: "text-cente-r!",
                }}
              />
              {productCode && isProductCodeType && checkProductCodeRes && (
                <p
                  className={`mt-1 text-xs ${
                    checkProductCodeRes.available
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {checkProductCodeRes.available
                    ? "✓  Product code is available"
                    : "⚠ Product code already exists"}
                </p>
              )}
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12}>
            <div className="pt-4" ref={Ankit}>
              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText">Product Name</label>
                <input
                  type="text"
                  // disabled
                  autoFocus={true}
                  className="asc-Normal-Input"
                  style={{
                    border: warning && !productName && "1.5px solid #dc3545",
                  }}
                  placeholder="Enter your Product Name"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                    setTypeInScreen(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <span className="warningTxt ps-2">
                  {warning && !productName && "Please fill product name!"}
                </span>
              </div>

              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText">Product Title</label>
                <input
                  type="text"
                  // disabled
                  className="asc-Normal-Input"
                  style={{
                    border: warning && !productTitle && "1.5px solid #dc3545",
                  }}
                  placeholder="Enter your Product Title"
                  value={productTitle}
                  onChange={(e) => {
                    setProductTitle(e.target.value);
                    setTypeInScreen(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <span className="warningTxt ps-2">
                  {warning && !productTitle && "Please fill product title!"}
                </span>
              </div>

              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText">Product Price</label>
                <input
                  type="number"
                  min={1}
                  // disabled
                  className="asc-Normal-Input hidden"
                  style={{
                    border: warning && !productPrice && "1.5px solid #dc3545",
                  }}
                  placeholder="Enter your Product Price ₹"
                  value={productPrice}
                  // onChange={(e) => {
                  //   setProductPrice(e.target.value);
                  //   setTypeInScreen(e.target.value);
                  // }}

                  // onChange={(e) => {
                  //   let value = Number(e.target.value);
                  //   if (value < 1 || isNaN(value)) {
                  //     value = 1;
                  //   }
                  //   setProductPrice(value);
                  //   setTypeInScreen(value);
                  // }}

                  onInput={(e) => {
                    let value = Number(e.target.value);

                    // Prevent negative values and enforce minimum 100
                    if (value < 1 || isNaN(value)) {
                      value = 100;
                    }

                    setProductPrice(value);
                    setTypeInScreen(value);
                  }}
                  onKeyDown={handleKeyDown}
                />

                <CurrencyInput
                  className="asc-Normal-Input"
                  style={{
                    border: warning && !productPrice && "1.5px solid #dc3545",
                  }}
                  placeholder="Enter your Product Price"
                  value={productPrice}
                  onValueChange2={(values) => {
                    console.log("values", values);
                  }}
                  onValueChange={({ value }) => {
                    setProductPrice(Number(value));
                    setTypeInScreen(value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <span className="warningTxt ps-2">
                  {warning && !productPrice && "Please fill product price!"}
                </span>
              </div>

              <Row gutter={16}>
                <Col xs={24} sm={8} md={8} lg={8}>
                  <div className="asc-input-container" id="ascNewInput">
                    <label className="asc-top-label labelText">Width</label>
                    <input
                      type="number"
                      // disabled
                      className="asc-Normal-Input py-3"
                      style={{
                        border:
                          warning && !productWidth && "1.5px solid #dc3545",
                      }}
                      placeholder="Width"
                      value={productWidth}
                      onChange={(e) => {
                        setProductWidth(e.target.value);
                        setTypeInScreen(e.target.value);
                      }}
                      onKeyDown={handleKeyDown}
                    />
                    <br />
                    <span className="warningTxt ps-2">
                      {warning && !productWidth && "Please fill width!"}
                    </span>
                  </div>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8}>
                  <div className="asc-input-container" id="ascNewInput">
                    <label className="asc-top-label labelText">Height</label>
                    <input
                      type="number"
                      // disabled
                      className="asc-Normal-Input py-3"
                      style={{
                        border:
                          warning && !productHeight && "1.5px solid #dc3545",
                      }}
                      placeholder="Height"
                      value={productHeight}
                      onChange={(e) => {
                        setProductHeight(e.target.value);
                        setTypeInScreen(e.target.value);
                      }}
                      onKeyDown={handleKeyDown}
                    />
                    <br />
                    <span className="warningTxt ps-2">
                      {warning && !productHeight && "Please fill height!"}
                    </span>
                  </div>
                </Col>

                <Col xs={24} sm={8} md={8} lg={8}>
                  <div className="asc-input-container" id="ascNewInput">
                    <label className="asc-top-label labelText">Color</label>
                    <div
                      className="asc-Normal-Input py-3"
                      style={{
                        border:
                          warning && !productColor && "1.5px solid #dc3545",
                      }}
                    >
                      <ColorPicker
                        // size="small"
                        value={productColor}
                        showText
                        // onChange={setProductColor}
                        onChange={(color) => {
                          setProductColor(color.toHexString());
                          setTypeInScreen(color.toHexString());
                        }}
                      />
                    </div>
                    {/* <br /> */}
                    <span className="warningTxt ps-2">
                      {warning && !productColor && "Please fill color!"}
                    </span>
                  </div>
                </Col>
              </Row>

              <div className="asc-input-container" id="ascNewInput">
                <label className="asc-top-label labelText">
                  Product Description
                </label>
                <textarea
                  // disabled
                  className="asc-Normal-Input py-3 h-26.5!"
                  style={{
                    border:
                      warning && !productDescription && "1.5px solid #dc3545",
                  }}
                  placeholder="Enter your Product Description"
                  value={productDescription}
                  onChange={(e) => {
                    setProductDescription(e.target.value);
                    setTypeInScreen(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
                <br />
                <span className="warningTxt ps-2">
                  {warning &&
                    !productDescription &&
                    "Please fill product description!"}
                </span>
              </div>

              <div className="md:col-span-2 hidden">
                <div className="asc-input-container" id="ascNewInput">
                  <label className="asc-top-label labelText">
                    Product Image
                  </label>
                  <input
                    type="text"
                    // disabled
                    className="asc-Normal-Input"
                    style={{
                      border: warning && !productImage && "1.5px solid #dc3545",
                    }}
                    placeholder="Enter your Product image"
                    value={productImage}
                    onChange={(e) => {
                      setProductImage(e.target.value);
                      setTypeInScreen(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  <br />
                  <span className="warningTxt ps-2">
                    {warning && !productImage && "Please fill product image!"}
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {/* extra product img div start */}
        <div className="md:col-span-2">
          <div className="asc-input-container" id="ascNewInput">
            <label className="asc-top-label labelText">Product Image</label>
            <input
              type="text"
              // disabled
              className="asc-Normal-Input"
              style={{
                border: warning && !productImage && "1.5px solid #dc3545",
              }}
              placeholder="Enter your Product image"
              value={productImage}
              onChange={(e) => {
                setProductImage(e.target.value);
                setTypeInScreen(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <br />
            <span className="warningTxt ps-2">
              {warning && !productImage && "Please fill product image!"}
            </span>
          </div>
        </div>
        {/* extra product img div end */}
      </div>
    </div>
  );
};

export default AddProduct;
