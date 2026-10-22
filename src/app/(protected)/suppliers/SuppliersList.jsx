"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import NextImage from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "@/src/app/(protected)/teams/TeamList.css";
import editIcon from "@/src/assets/icons/edit-2.svg";
import Pdficon from "@/src/assets/icons/pdf-icon.svg";
import binIcon from "@/src/assets/icons/Bin.svg";
import search from "@/src/assets/icons/search.svg";
import searchIcon from "@/src/assets/icons/searchicon.svg";
import Xicon from "@/src/assets/icons/x-circle.svg";
import upArrow from "@/src/assets/icons/upArrow.svg";
import ASC22 from "@/src/assets/images/ASC22.jpg";
import Header from "@/src/layouts/Header";
import WarningPopup from "@/src/components/dialogs/WarningPopup";
import { Tooltip, Empty, Skeleton, Pagination, Grid, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
  SyncOutlined,
  CloseCircleFilled,
  ArrowUpOutlined,
  UsergroupAddOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import CurrentWeekDates from "@/src/components/datePicker/CurrentWeekDates";
import toast from "@/src/components/notification/CustomToast";
import {
  SupplierPDFDownload,
  SupplierPDFPreview,
} from "@/src/components/pdfs/supplierPDF/SupplierPDF";

// Tan stack useHooks
import { useFetchSuppliers, useDeleteSupplier } from "./services/useSupplier";

const SuppliersList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const SearchInputRef = useRef(null);
  const debounceRef = useRef(null);
  const [Ankit] = useAutoAnimate();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  // screens.xs;
  // screens.sm;
  // screens.md;
  // screens.lg;
  // screens.xl;

  const [supplierListData, setSupplierListData] = useState([]);
  const [searching, setSearching] = useState("");
  const [orderBy, setOrderBy] = useState(false);
  const [apimessage, setApimessage] = useState("");
  const [searchBorderShow, setSearchBorderShow] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [deletedSupplierName, setDeletedSupplierName] = useState("");
  const [selectedSortShow, setSelectedSortShow] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  // pagination start
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  // pagination end

  // asc cancel popup start
  const [cancelPopupShow, setCancelPopupShow] = useState(false);
  const handleClose = () => setCancelPopupShow(false);

  const handleYes = () => {
    router.back();
  };
  const [typeInScreen, setTypeInScreen] = useState("");
  // asc cancel popup end

  useEffect(() => {
    // dispatch(TeamsGeneratePDF());
  }, []);

  useEffect(() => {
    let a;
    if (orderBy === true) {
      a = "ascending";
    } else if (orderBy === false) {
      a = "descending";
    }

    const timer = setTimeout(() => {
      // dispatch(fetchAllTeams(searching, selectedSort, a, currentPage, limit));
    }, 500); // debounce delay

    return () => clearTimeout(timer); // cleanup
  }, [dispatch, searching, orderBy, selectedSort, currentPage, limit]);

  // tan stack start.................................
  let a;
  if (orderBy === true) {
    a = "ascending";
  } else if (orderBy === false) {
    a = "descending";
  }

  // Tan stack fetch all suppliers
  const {
    data: fetchSuppliersRes, // all data
    isLoading: isSupplierLoading, // boolean value
    isError: isSupplierError, // boolean value
    error: suppliersError, // error msg
    isSuccess: isSupplierSuccess, // boolean value
    refetch: refetchSuppliers, // Refresh() // ye function hota hai
    isFetching: isSuppliersFetching, // Refreshing... // boolean value
  } = useFetchSuppliers({
    page: currentPage,
    limit,
    payload: {
      searchQuery: searching,
      technologyQuery: selectedSort,
      sortBy: a,
    },
  });

  useEffect(() => {
    if (fetchSuppliersRes?.status === true) {
      setSupplierListData(fetchSuppliersRes?.data);
      setTotalPages(fetchSuppliersRes?.pagination?.totalPages);
    }
    if (fetchSuppliersRes?.status === false) {
      setSupplierListData(fetchSuppliersRes?.data);
      setApimessage(fetchSuppliersRes?.message || "Failed to fetch team data.");
    }
  }, [fetchSuppliersRes]);

  const {
    mutateAsync: triggerDeleteSupplier, // trigger API
    data: deleteSupplierRes,
    isPending: isDeletingSupplier,
    isError: isDeleteSupplierError,
    error: deleteSupplierError,
    isSuccess: isDeleteSupplierSuccess,
    reset: resetDeleteSupplierState,
  } = useDeleteSupplier();

  const handleDeleteSupplier = () => {
    triggerDeleteSupplier(supplierId)
      .then((res) => {
        toast.success({
          description: `${deletedSupplierName} Deleted successfully`,
        });
        setCancelPopupShow(false);
      })
      .catch((error) => {
        console.log("asc23", error.response);
        toast.error({
          description:
            error?.response?.data?.message ||
            error?.message ||
            "Failed to delete team",
        });

        setCancelPopupShow(false);
      });
  };

  // const handleDeleteSupplier = (teamDltId) => {
  //   dispatch(deleteTeamById(teamDltId));
  // };

  const handleDeleteTeam2 = () => {
    // dispatch(deleteTeamById(supplierId));
  };

  useEffect(() => {
    if (searchBorderShow && SearchInputRef.current) {
      SearchInputRef.current.focus();
    }
  }, [searchBorderShow]);

  return (
    <div className="">
      <Header
        // setQuery={setSearching}
        setQuery={(value) => {
          clearTimeout(debounceRef.current);
          debounceRef.current = setTimeout(() => {
            setSearching(value);
          }, 800);
        }}
        placeholder={"Search..."}
        showProductsCategory={false}
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
          onOk={handleDeleteSupplier}
          loading={isDeletingSupplier}
          title={""}
          keyboard={true}
        />
      )}

      <sorting-and-searching-Div>
        <div className="flex sortingSearchingDiv py-2.5 px-2 pe-3 mt-4">
          <div className="flex gap-3 items-center">
            <div className="flex gap-4 items-center">
              <div className="bg-[#f1ece8] rounded-lg p-2 px-3">
                <UsergroupAddOutlined className="icon" />
              </div>
              <div>
                <p className="text-(--badge-bg) text-[14px] font-medium">
                  Supplier List
                </p>

                <p className="text-gray-500 text-[13px] font-medium">
                  Manage and view all your suppliers
                </p>
              </div>
            </div>

            <div className="relative ps-10 hidden" ref={Ankit}>
              <p
                className="text-[#8d7b68] text-[14px] font-medium pointer"
                onClick={() => setSelectedSortShow(!selectedSortShow)}
              >
                {selectedSort || "Select..."}
              </p>

              {selectedSortShow && (
                <div className="selectBox2 py-2 px-3 hidden">
                  <h6 className="mb-1 text-gray-400">Select...</h6>
                  <p
                    className="mb-1"
                    onClick={() => {
                      setSelectedSort("Active");
                      setSelectedSortShow(false);
                    }}
                  >
                    Active
                  </p>
                  <p
                    className="mb-1"
                    onClick={() => {
                      setSelectedSort("In Active");
                      setSelectedSortShow(false);
                    }}
                  >
                    Inactive
                  </p>
                </div>
              )}

              {/* another way */}
              {selectedSortShow && (
                <div className="selectBox2 py-2 px-3 lef-t-[200px]!">
                  <h6 className="mb-1 ps-2 text-gray-400">Status</h6>
                  {["Active", "Inactive"].map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer hover:bg-gray-100 px-2 py-2 rounded borderBottom"
                      onClick={() => {
                        setSelectedSort(item);
                        setSelectedSortShow(false);
                      }}
                    >
                      <span className="flex justify-between gap-2">
                        {item}

                        {selectedSort === item && (
                          <span className="ms-auto pe-2">✔</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-5 items-center ms-auto pt-3 sm:pt-0">
            <div className="border border-gray-300 rounded-lg flex items-center h-fit ripple">
              <SyncOutlined
                onClick={refetchSuppliers}
                spin={isSuppliersFetching}
                style={{
                  fontSize: "18px",
                  cursor: isSuppliersFetching ? "not-allowed" : "pointer",
                }}
                className="p-2"
              />
            </div>

            <div className="relative" ref={Ankit}>
              <div
                className="border border-gray-300 rounded-lg flex items-center px-3 h-fit pointer ripple"
                onClick={() => setSelectedSortShow(!selectedSortShow)}
              >
                <FilterOutlined />
                <ArrowUpOutlined
                  className={`icon text-(--badge-bg)! mx-2 ${arrowOptionsRotate ? "upArrow" : "downArrow"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setArrowOptionsRotate(!arrowOptionsRotate);
                    setOrderBy(!orderBy);
                  }}
                />

                <p className="text-(--badge-bg) text-[14px] font-medium pointer p-1">
                  {selectedSort || "Filter"}
                </p>

                {selectedSort && (
                  <CloseCircleFilled
                    style={{ color: "gray" }}
                    className="pointer ms-2 w-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSort("");
                      setSelectedSortShow(false);
                    }}
                  />
                )}
              </div>

              {selectedSortShow && (
                <div className="selectBox2 py-2 top-9! left-0! right-0">
                  <h6 className="mb-1 ps-4 text-[14px] text-gray-400">
                    Status
                  </h6>
                  {["Active", "Inactive"].map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer hover:bg-gray-100 px-2 ps-4 py-2 borderBottom"
                      onClick={() => {
                        setSelectedSort(item);
                        setSelectedSortShow(false);
                      }}
                    >
                      <span className="flex justify-between gap-2">
                        {item}

                        {selectedSort === item && (
                          <span className="ms-auto pe-2">✔</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="rounded-lg flex justify-center items-center px-3 h-10 bg-(--btn-primary-bg) hover:bg-(--btn-primary-bg-hover) text-white pointer ascButton w-40! shadow-(--my-shadow) ripple flex-grow"
              onClick={() => {
                router.push("/suppliers/create");
              }}
            >
              <PlusOutlined className="pe-1" />
              <p className="p-1 pb-1.5 font-mediu-m">Add Supplier</p>
            </div>
          </div>
        </div>
      </sorting-and-searching-Div>

      <div className="ascTableWrapper mt- px-0" id="ascTeamTable">
        <table className="tableContainer table">
          <thead>
            <tr className="tableHeading">
              <th className="txtField" style={{ width: "55px" }}>
                S.No
              </th>
              <th className="txtField" style={{ width: "100px" }}>
                Created On
              </th>
              <th className="txtField" style={{ width: "120px" }}>
                Supplier Name
              </th>
              <th className="txtField" style={{ width: "125px" }}>
                Company Name
              </th>
              <th className="txtField" style={{ width: "200px" }}>
                Email
              </th>
              <th
                className="txtField"
                title="Phone Number"
                style={{ width: "120px" }}
              >
                Phone Number
              </th>
              <th className="txtField text-center!" style={{ width: "95px" }}>
                Status
              </th>
              <th className="" style={{ width: "40px" }}>
                <EditOutlined />
              </th>
              <th className="" style={{ width: "40px" }}>
                <FilePdfOutlined />
              </th>
              <th className="" style={{ width: "40px" }}>
                <DeleteOutlined />
              </th>
              {/* <th className="invisible">ASC</th>
              <th className="invisible">ASC</th>
              <th className="invisible">ASC</th> */}
            </tr>
          </thead>
          <tbody ref={Ankit}>
            {/* {tableData.map((row) => (
                <tr key={row.id}>
                  <td data-label="ID">{row.id}</td>
                  <td data-label="Name">{row.name}</td>
                  <td data-label="Email">{row.email}</td>
                  <td data-label="Role">{row.role}</td>
                </tr>
              ))} */}

            {isSupplierLoading && (
              <tr>
                <td colSpan={9}>
                  <Skeleton active />
                </td>
              </tr>
            )}

            {isSupplierError && (
              <tr>
                <td colSpan={9} className="text-red-600">
                  {suppliersError?.response?.data?.message ||
                    suppliersError.message}
                </td>
              </tr>
            )}

            {!isSupplierLoading &&
              !isSupplierError &&
              supplierListData?.length === 0 && (
                <tr>
                  <td colSpan={9}>
                    <Empty />
                  </td>
                </tr>
              )}

            {supplierListData?.map((item, index) => {
              console.log("asc supp data", item);
              return (
                <tr key={item.supplierId}>
                  <td className="text-center!">{index + 1}</td>
                  <td>{moment(item.creationDate).format("DD.MM.YYYY")}</td>
                  <td title={item.name}>{item.name}</td>
                  <td title={item.companyName}>{item.companyName}</td>
                  <td className="hidden">
                    {item.technology ? item.technology : "No Technology"}
                  </td>
                  <td title={item.email}>{item.email}</td>
                  <td title={item.phone}>{item.phone}</td>
                  <td
                    title={item.status}
                    className={`roundedd hidden ${item.status === "ACTIVE" ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {item.status === "ACTIVE" ? "Active" : "Inactive"}
                  </td>

                  <td className="text-center!">
                    <Tag
                      color={item.status === "ACTIVE" ? "#16a34a" : "error"}
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        borderRadius: "999px",
                        padding: "4px 10px",
                      }}
                    >
                      {item.status === "ACTIVE" ? "Active" : "Inactive"}
                    </Tag>
                  </td>

                  <td style={{ width: "50px" }}>
                    <Tooltip title="Edit Supplier">
                      <NextImage
                        className="editIconClass pointer"
                        src={editIcon}
                        style={{ width: "14px", filter: "invert(1)" }}
                        alt=""
                        onClick={() =>
                          router.push(`/suppliers/${item.supplierId}/edit`, {
                            state: {
                              from: "TeamListScreen",
                              supplierId: item.supplierId,
                              asc: "asc",
                            },
                          })
                        }
                      />
                    </Tooltip>
                  </td>

                  <td style={{ width: "50px" }}>
                    <Tooltip title="Download PDF">
                      <NextImage
                        className="editIconClass pointer icon hidden"
                        src={Pdficon}
                        alt=""
                        onClick={() => {
                          // setSupplierId(item.supplierId);
                          // setDeletedSupplierName(item.firstName);
                          // downloadPDF(item.firstName);
                        }}
                      />
                      <SupplierPDFDownload supplierPDFData={[item]} />
                    </Tooltip>
                  </td>

                  <td style={{ width: "50px" }}>
                    <Tooltip title="Delete Supplier" color={"red"}>
                      <NextImage
                        className="editIconClass pointer"
                        src={binIcon}
                        style={{ width: "14px", filter: "invert(1)" }}
                        alt=""
                        // onClick={() => handleDeleteSupplier(item.supplierId)}
                        onClick={() => {
                          setCancelPopupShow(true);
                          setSupplierId(item.supplierId);
                          setDeletedSupplierName(item.name);
                        }}
                      />
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
            {/* {supplierListData?.length === 0 && (
              <tr>
                <td colSpan={11}>
                  <Empty />
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>

      <div className="py-5" id="supp-pagination">
        <Pagination
          align="start"
          classNames={{
            root: "root-pagination",
            item: "rounded-full!",
          }}
          className=""
          current={currentPage}
          pageSize={limit}
          // total={500}
          total={fetchSuppliersRes?.pagination?.totalSuppliers}
          showQuickJumper
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setLimit(pageSize);
          }}
          // size={screens.xs ? "small" : "medium"}
        />
      </div>

      {/* SEND PROPS DATA TO SupplierListPDF for PDF */}
      <div className="hidden">
        {supplierListData?.[0] && (
          <SupplierPDFPreview
            supplierPDFData={[supplierListData[0]]}
            // downloadPDF={downloadPDF}
          />
        )}
      </div>
    </div>
  );
};

export default SuppliersList;
