"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import NextImage from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  sendComments,
  fetchCommentsByTaskId,
} from "@/src/redux/actions/taskAction";
import { useSelector, useDispatch } from "react-redux";
import sendIcon from "@/src/assets/icons/send.svg";
import attatchIcon from "@/src/assets/icons/attatch-icon.svg";
import emojiIcon from "@/src/assets/icons/emoji.svg";
import binIcon from "@/src/assets/icons/Bin.svg";
import parse from "html-react-parser";
import { Tooltip } from "antd";
import moment from "moment";
import Linkify from "linkify-react";

const Messages = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();
  const params = useParams();
  const userID = localStorage.getItem("userid");

  const [messageData, setMessageData] = useState([]);
  const [attachmentData, setAttachmentData] = useState([]);
  const [showMoreComm, setShowMoreComm] = useState(false);
  let displayQuantity = showMoreComm ? undefined : 5;

  const addTaskCommentsRes = useSelector(
    (state) => state.task.addTaskCommentsRes,
  );

  const fetchCommentsByTaskIdRes = useSelector(
    (state) => state.task.fetchCommentsByTaskIdRes,
  );

  useEffect(() => {
    dispatch(fetchCommentsByTaskId(props.taskID));
  }, [dispatch, props.taskID, addTaskCommentsRes]);

  useEffect(() => {
    if (fetchCommentsByTaskIdRes.status === true) {
      setMessageData(fetchCommentsByTaskIdRes.data);
    }
  }, [fetchCommentsByTaskIdRes]);

  const linkifyOptions = {
    attributes: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  };

  const formatFileSize = (size) => {
    return size >= 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  console.log("msg props", props);

  return (
    <>
      {/* comments section start */}
      <div ref={Ankit}>
        <div className="ps-6">
          {props.attachmentData?.map((item, index) => {
            return (
              <li className="list-disc ps-3 pt-2" key={index}>
                {item.name} ({formatFileSize(item.size)})
              </li>
            );
          })}

          {/* <p>{props.attachmentData.name}</p> */}
        </div>

        <div className="flex justify-between pt-3 px-2">
          <p className="text-[14px] text-[#212529] font-semibold">Comments</p>

          {messageData && messageData.length > 5 && (
            <p
              className="text-[14px] text-[#212529] font-semibold pointer"
              onClick={() => {
                setShowMoreComm(!showMoreComm);
              }}
            >
              {showMoreComm ? " Show less..." : "Show more..."}
            </p>
          )}
        </div>

        {messageData.slice(0, displayQuantity).map((item, index) => {
          return (
            <div key={index}>
              {/* <div
                className="commentsDiv my-3"
                dangerouslySetInnerHTML={{ __html: item.message }}
              /> */}

              <div className="ProseMirror commentsDiv my-3">
                {/* <Linkify options={linkifyOptions}>
                  {parse(item.message)}
                </Linkify> */}

                {item.isdeleted ? (
                  <span>This message was deleted</span>
                ) : (
                  <Linkify
                    options={{
                      attributes: {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                    }}
                  >
                    {parse(item.message)}
                  </Linkify>
                )}

                {/* Show attachments if exists */}
                {item?.attachments?.map((file, fileIndex) => {
                  return (
                    <div key={fileIndex}>
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        // download
                        className="text-[14px]"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            `/avion-documents/${file.fileName}?url=${encodeURIComponent(file.fileUrl)}
                            &fileName=${file.fileName}
                            &asc=AnkitSingh
                            &asc2=AnkitSingh2`,
                            "_blank",
                          );
                          // window.open(
                          //   file.fileUrl,
                          //   "_blank",
                          //   "noopener,noreferrer",
                          // );
                        }}
                      >
                        {file.fileName} ({formatFileSize(file.fileSize)})
                      </a>
                    </div>
                  );
                })}

                <div className="flex gap-2">
                  <Tooltip title="Delete Msg" color={"red"}>
                    <NextImage
                      src={binIcon}
                      alt=""
                      className="ms-auto w-[12px] pointer"
                      onClick={() => {
                        // asc
                      }}
                    />
                  </Tooltip>
                  <p className="mb-0 text-[14px]">
                    {moment(item.createdAt).format("DD.MM.YYYY,h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* comments section end */}
    </>
  );
};

export default Messages;
