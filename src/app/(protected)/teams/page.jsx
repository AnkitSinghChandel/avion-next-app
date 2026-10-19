"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./TeamList.css";
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
import { Tooltip, Empty, Skeleton, Pagination, Grid } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FilePdfOutlined,
  SyncOutlined,
  CloseCircleFilled,
  UsergroupAddOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  fetchAllTeams,
  deleteTeamById,
  TeamsGeneratePDF,
} from "@/src/redux/actions/teamAction";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { CurrencyInput } from "@/src/components/common/CurrencyInput";
import CurrentWeekDates from "@/src/components/datePicker/CurrentWeekDates";
import toast from "@/src/components/notification/CustomToast";
import {
  TeamListPDFPreview,
  TeamListPDFDownload,
} from "@/src/components/pdfs/teamsPDF/TeamListPDF";
import {
  TeamSinglePDFPreview,
  TeamSinglePDFDownload,
} from "@/src/components/pdfs/teamsPDF/TeamSinglePDF";
import { universalFormatCurrency } from "@/src/utils/formatCurrency";
import Image from "next/image";

const TeamsList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const SearchInputRef = useRef(null);
  const [Ankit] = useAutoAnimate();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  // screens.xs;
  // screens.sm;
  // screens.md;
  // screens.lg;
  // screens.xl;

  const fetchTeamRes = useSelector((state) => state.team.fetchTeamRes);
  const { data, loading, error } = useSelector(
    (state) => state.team.fetchTeamRes,
  );
  const deleteTeamRes = useSelector((state) => state.team.deleteTeamRes);
  console.log("asc23", fetchTeamRes);

  const [teamListData, setTeamListData] = useState([]);
  const [searching, setSearching] = useState("");
  const [orderBy, setOrderBy] = useState();
  const [apimessage, setApimessage] = useState("");
  const [searchBorderShow, setSearchBorderShow] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [teamDeleteName, setTeamDeleteName] = useState("");
  const [selectedSortShow, setSelectedSortShow] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [refreshTeams, setRefreshTeams] = useState(false);

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
    // dispatch(fetchAllTeams(searching, selectedSort, a));

    const timer = setTimeout(() => {
      dispatch(fetchAllTeams(searching, selectedSort, a, currentPage, limit));
    }, 500); // debounce delay

    return () => clearTimeout(timer); // cleanup
  }, [
    dispatch,
    searching,
    orderBy,
    selectedSort,
    currentPage,
    limit,
    refreshTeams,
  ]);

  useEffect(() => {
    if (fetchTeamRes.data) {
      setTeamListData(fetchTeamRes.data.data);
      setTotalPages(fetchTeamRes?.data?.pagination?.totalPages);
    }
    if (fetchTeamRes.status === false) {
      setTeamListData(fetchTeamRes.data);
      setApimessage(fetchTeamRes?.message || "Failed to fetch team data.");
    }
  }, [fetchTeamRes]);

  useEffect(() => {
    if (deleteTeamRes?.data?.status === true) {
      toast.success({
        description: `${teamDeleteName} Deleted successfully`,
      });
      dispatch(fetchAllTeams());
      setCancelPopupShow(false);
    } else if (deleteTeamRes?.data?.status === false || deleteTeamRes?.error) {
      setCancelPopupShow(false);
      toast.error({
        description:
          deleteTeamRes?.error ||
          deleteTeamRes?.data?.message ||
          "Failed to delete team",
      });
    }
  }, [deleteTeamRes]);

  // const handleDeleteTeam = (teamDltId) => {
  //   dispatch(deleteTeamById(teamDltId));
  // };

  const handleDeleteTeam = () => {
    dispatch(deleteTeamById(teamId));
  };

  useEffect(() => {
    if (searchBorderShow && SearchInputRef.current) {
      SearchInputRef.current.focus();
    }
  }, [searchBorderShow]);

  return (
    <div className="">
      <Header
        setQuery={setSearching}
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
          onOk={handleDeleteTeam}
          loading={deleteTeamRes?.loading}
          title={""}
          keyboard={true}
        />
      )}

      <sorting-and-searching-Div>
        <div className="flex sortingSearchingDiv py-2.5 px-2 mt-4">
          <div className="flex gap-3 items-center">
            <div className="flex gap-4 items-center">
              <div className="bg-[#f1ece8] rounded-lg p-2 px-3">
                <UsergroupAddOutlined className="icon" />
              </div>
              <div>
                <p className="text-(--badge-bg) text-[14px] font-medium">
                  Team List
                </p>

                <p className="text-gray-500 text-[13px] font-medium">
                  Manage and view all your teams
                </p>
              </div>
            </div>

            <div className="relative hidden" ref={Ankit}>
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
                      setSelectedSort("React");
                      setSelectedSortShow(false);
                    }}
                  >
                    React
                  </p>
                  <p
                    className="mb-1"
                    onClick={() => {
                      setSelectedSort("Node");
                      setSelectedSortShow(false);
                    }}
                  >
                    Node
                  </p>
                  <p
                    className="mb-1"
                    onClick={() => {
                      setSelectedSort("JavaScript");
                      setSelectedSortShow(false);
                    }}
                  >
                    <span className="flex justify-between gap-2">
                      JavaScript
                      {selectedSort === "JavaScript" && (
                        <span className="ms-auto pe-2">✔</span>
                      )}
                    </span>
                  </p>
                </div>
              )}

              {/* another way */}
              {selectedSortShow && (
                <div className="selectBox2 py-2 px-3 lef-t-[200px]!">
                  <h6 className="mb-1 ps-2 text-gray-400">Select</h6>
                  {["React", "Node", "JavaScript", "Python"].map((item) => (
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
                // onClick={refetchSuppliers}
                onClick={() => setRefreshTeams((prev) => !prev)}
                spin={loading}
                style={{
                  fontSize: "18px",
                  cursor: loading ? "not-allowed" : "pointer",
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
                <div className="selectBox2 py-2 top-9! left-0!">
                  <h6 className="mb-1 ps-4 text-[14px] text-gray-400">
                    Select
                  </h6>
                  {["React", "Node", "JavaScript", "Python"].map((item) => (
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
              className="border border-gray-300 rounded-lg flex justify-center items-center px-3 h-10 bg-(--btn-primary-bg) hover:bg-(--btn-primary-bg-hover) text-white pointer ascButton w-40! shadow-(--my-shadow) ripple flex-grow"
              onClick={() => {
                router.push("/teams/create");
              }}
            >
              <PlusOutlined className="pe-1" />
              <p className="p-1 pb-1.5 font-mediu-m">Add Team</p>
            </div>
          </div>
        </div>
      </sorting-and-searching-Div>

      <div className="ascTableWrapper mt- px-0" id="">
        <table className="tableContainer table" id="ascTeamTable">
          <thead>
            <tr className="tableHeading">
              <th className="txtField" style={{ width: "55px" }}>
                S.No
              </th>
              <th className="txtField" style={{ width: "100px" }}>
                Date
              </th>
              <th className="txtField" style={{ width: "100px" }}>
                First Name
              </th>
              <th className="txtField" style={{ width: "100px" }}>
                Last Name
              </th>
              <th className="txtField" style={{ width: "100px" }}>
                Technology
              </th>
              <th className="txtField" style={{ width: "200px" }}>
                Email
              </th>
              <th
                className="txtField"
                title="Phone Number"
                style={{ width: "110px" }}
              >
                Phone Number
              </th>
              <th
                className="txtField"
                title="Developer's Price"
                style={{ width: "100px" }}
              >
                Developer's Price
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
          <tbody>
            {/* {tableData.map((row) => (
                <tr key={row.id}>
                  <td data-label="ID">{row.id}</td>
                  <td data-label="Name">{row.name}</td>
                  <td data-label="Email">{row.email}</td>
                  <td data-label="Role">{row.role}</td>
                </tr>
              ))} */}

            {loading && (
              <tr>
                <td colSpan={11}>
                  <Skeleton active />
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan={11} className="text-red-600">
                  {error}
                </td>
              </tr>
            )}

            {!loading && teamListData?.length === 0 && (
              <tr>
                <td colSpan={11}>
                  <Empty />
                </td>
              </tr>
            )}

            {teamListData?.map((item, index) => {
              console.log("asc team data", item);
              return (
                <tr key={item.teamId}>
                  <td className="text-center!">{index + 1}</td>
                  <td>{moment(item.creationDate).format("DD.MM.YYYY")}</td>
                  <td title={item.firstName}>{item.firstName}</td>
                  <td title={item.lastName}>{item.lastName}</td>
                  <td>{item.technology ? item.technology : "No Technology"}</td>
                  <td title={item.email}>{item.email}</td>
                  <td title={item.phoneNumber}>{item.phoneNumber}</td>
                  <td title={universalFormatCurrency(item.devsPrice)}>
                    {/* {`₹ ${item.devsPrice}`} */}
                    <CurrencyInput
                      className=""
                      placeholder=""
                      value={item.devsPrice}
                    />
                  </td>

                  <td style={{ width: "50px" }}>
                    <Tooltip title="Edit Team">
                      <NextImage
                        className="editIconClass pointer"
                        src={editIcon}
                        width={14}
                        height={14}
                        style={{ filter: "invert(1)" }}
                        alt=""
                        onClick={() =>
                          router.push(`/teams/${item.teamId}/edit`, {
                            state: {
                              from: "TeamListScreen",
                              teamId: item.teamId,
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
                      />
                      {/* <TeamListPDFDownload teamListPDFData={teamListData} /> */}
                      <TeamSinglePDFDownload teamListPDFData={[item]} />
                    </Tooltip>
                  </td>

                  <td style={{ width: "50px" }}>
                    <Tooltip title="Delete Team" color={"red"}>
                      <NextImage
                        className="editIconClass pointer"
                        src={binIcon}
                        style={{ width: "14px", filter: "invert(1)" }}
                        alt=""
                        // onClick={() => handleDeleteTeam(item.teamId)}
                        onClick={() => {
                          setCancelPopupShow(true);
                          setTeamDeleteName(item.firstName);
                          setTeamId(item.teamId);
                        }}
                      />
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
            {/* {teamListData?.length === 0 && (
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
          total={fetchTeamRes?.data?.pagination?.totalTeams}
          showQuickJumper
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setLimit(pageSize);
          }}
          // size={screens.xs ? "small" : "medium"}
        />
      </div>

      {/* SEND PROPS DATA TO TeamListPDF for PDF */}
      <div className="hidden">
        {/* <TeamListPDFPreview teamListPDFData={teamListData} /> */}
        {teamListData?.[0] && (
          <TeamSinglePDFPreview teamListPDFData={[teamListData[0]]} />
        )}
      </div>
    </div>
  );
};

export default TeamsList;
