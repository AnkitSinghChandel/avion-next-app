"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import NextImage from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  sendComments,
  fetchCommentsByTaskId,
} from "@/src/redux/actions/taskAction";
import { multipleUploadToS3 } from "@/src/redux/actions/commonAction";
import { fetchAllUsers } from "@/src/redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import sendIcon from "@/src/assets/icons/send.svg";
import attatchIcon from "@/src/assets/icons/attatch-icon.svg";
import emojiIcon from "@/src/assets/icons/emoji.svg";
import binIcon from "@/src/assets/icons/Bin.svg";
import warningImg from "@/src/assets/icons/warning.svg";
import { DEFAULT_USER_AVATAR } from "@/src/components/common/DefaultUserAvatar";
import { Tooltip, notification, Progress, Empty } from "antd";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import Mention from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

import "./TaskEditor.css";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  UndoOutlined,
  RedoOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Messages from "./Messages";

function MentionList({ items, command }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "auto",
        maxHeight: "200px",
      }}
    >
      {items.map((item) => (
        <p
          className="pointer px-3 py-2 hover:bg-gray-100 rounded-lg flex gap-2 items-center"
          key={item.id}
          onClick={() => command(item)}
        >
          <NextImage
            src={item.image || DEFAULT_USER_AVATAR}
            alt=""
            onError={(e) => {
              e.target.src = warningImg;
            }}
            style={{ width: "25px", height: "25px", borderRadius: "50%" }}
          />
          @{item.label}
        </p>
      ))}

      {items.length === 0 && (
        <div className="mt-">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
}

const TaskEditor = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [Ankit] = useAutoAnimate();
  const params = useParams();
  const [toast, contextHolder] = notification.useNotification();

  const userID = localStorage.getItem("userid");
  const userFirstName = localStorage.getItem("userFirstName");
  const userLastName = localStorage.getItem("userLastName");

  const addTaskCommentsRes = useSelector(
    (state) => state.task.addTaskCommentsRes,
  );

  const multipleUploadToS3Res = useSelector(
    (state) => state.common.multipleUploadToS3Res,
  );

  const fetchAllUsersRes = useSelector((state) => state.user.fetchAllUsersRes);

  const addTaskRes = useSelector((state) => state.common.addTaskRes);

  const [messageContent, setMessageContent] = useState("");

  const [userListData, setUserListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apimessage, setApimessage] = useState("");
  const [attachmentData, setAttachmentData] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  useEffect(() => {
    if (fetchAllUsersRes.status === true) {
      // setUserListData(fetchAllUsersRes.data);
      const loginUserId = localStorage.getItem("userid");
      const sortedData = [...fetchAllUsersRes.data].sort((a, b) => {
        if (a.userId === loginUserId) return -1; // a top pe
        if (b.userId === loginUserId) return 1; // b top pe
        return 0; // baki same order
      });

      setUserListData(sortedData);
      setLoading(false);
    }
    if (fetchAllUsersRes.status === false) {
      setUserListData(fetchAllUsersRes.data);
      setApimessage(fetchAllUsersRes?.message || "Failed to fetch data.");
      setLoading(false);
    }
  }, [fetchAllUsersRes]);

  // Tip Tap Editor start 👇
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Heading.configure({ levels: [1, 2, 3] }),
        Placeholder.configure({
          placeholder: ({ editor }) => {
            return editor.getText().trim() === "" ? "Start writing..." : "";
          },
        }),
        // Emoji,
        Mention.configure({
          HTMLAttributes: {
            class: "mention_css",
          },
          suggestion: {
            items: ({ query }) => {
              const users = [
                { id: "1", label: "Ankit Singh" },
                { id: "2", label: "Ritika Tyagi" },
                { id: "3", label: "Ashu Goel" },
              ];
              // return users.filter((user) =>
              //   user.label.toLowerCase().includes(query.toLowerCase()),
              // );
              // if we use data from API 👇
              return userListData
                .filter((user) =>
                  user.firstName.toLowerCase().includes(query.toLowerCase()),
                )
                .map((user) => ({
                  id: user.userId,
                  label: `${user.firstName} ${user.lastName}`,
                  firstName: user.firstName,
                  image: user.image,
                }));
              // .slice(0, 5);
              // if we use data from API 👆
            },
            render: () => {
              let component;
              let popup;
              return {
                onStart: (props) => {
                  component = new ReactRenderer(MentionList, {
                    props,
                    editor: props.editor,
                  });

                  popup = tippy("body", {
                    getReferenceClientRect: () => props.clientRect?.(),
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                  });
                },

                onUpdate(props) {
                  component?.updateProps(props);
                  popup?.[0]?.setProps({
                    getReferenceClientRect: () => props.clientRect?.(),
                  });
                },

                onExit() {
                  popup?.[0]?.destroy();
                  component?.destroy();
                },
              };
            },
          },
        }),
      ],
      onUpdate: ({ editor }) => {
        setMessageContent(editor.getHTML()); // get messages
        if (editor.getText().trim() === "") {
          editor.commands.clearContent();
        }
      },
    },
    [userListData],
  );

  // Disable the send button if the content is empty
  const isEditorEmpty = editor.isEmpty;
  // Tip Tap Editor end 👆

  const fileUpload_old = (selectedFiles) => {
    console.log("asc34", selectedFiles);
    // dispatch(singleUploadToS3(selectedFiles[0])); // for single url.
    dispatch(multipleUploadToS3(selectedFiles)); // // for multiple urls.
  };

  const fileUpload = (selectedFiles) => {
    const onProgress = (percent) => {
      const key = "upload-progress";
      toast.open({
        key,
        title: "Uploading Files",
        description: (
          <Progress percent={percent} status="active" strokeColor="#5CAF90" />
        ),
        placement: "topRight",
        duration: 0,
        closeIcon: false,
      });

      if (percent === 100) {
        toast.success({
          key,
          title: "Upload Completed",
          description: "All files uploaded successfully",
          placement: "topRight",
          duration: 5, // 5 second
        });
      }
    };

    console.log("asc34", selectedFiles);
    // dispatch(singleUploadToS3(selectedFiles[0])); // for single url.
    dispatch(multipleUploadToS3(selectedFiles, onProgress)); // // for multiple urls.
  };

  useEffect(() => {
    if (multipleUploadToS3Res) {
      console.log("asc35", multipleUploadToS3Res);
    }
  }, [multipleUploadToS3Res]);

  const handleSendMessage = () => {
    if (isEditorEmpty) {
      return false;
    }

    const attachments = attachmentData?.map((x, index) => ({
      fileName: x.name,
      fileSize: x.size,
      // fileUrl: multipleUploadToS3Res[0], // for single url
      fileUrl: multipleUploadToS3Res[index], // for multiple urls by indexing.
      uploadedByFirstName: userFirstName,
      uploadedByLastName: userLastName,
      uploaderId: userID,
    }));

    dispatch(
      sendComments(userID, " ", props.taskID, messageContent, attachments),
    ).then((res) => {
      if (res?.status === true) {
        editor.commands.clearContent(); // to clear Editor content.
      }
    });
  };

  useEffect(() => {
    if (addTaskCommentsRes.status === true) {
      setAttachmentData([]);
    }
  }, [addTaskCommentsRes]);

  // useEffect(() => {
  //   if (props.modalFunction === "add" && addTaskRes?.status === true) {
  //     handleSendMessage();
  //   }
  // }, [props.modalFunction, dispatch, addTaskRes]);

  return (
    <div>
      {contextHolder}
      {/* Toolbar Buttons */}
      <div className="tipTapToolbar p-2">
        <button
          className={`toolbarIcon ${editor.isActive("bold") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldOutlined />
        </button>

        <button
          className={`toolbarIcon ${editor.isActive("italic") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicOutlined />
        </button>

        <button
          className={`toolbarIcon ${editor.isActive("underline") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineOutlined />
        </button>

        <button
          className={`toolbarIcon ${editor.isActive("strike") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughOutlined />
        </button>

        <button
          className="toolbarIcon"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoOutlined />
        </button>

        <button
          className="toolbarIcon"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoOutlined />
        </button>

        <button
          className={`toolbarIcon ${editor.isActive("orderedList") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <OrderedListOutlined />
        </button>

        <button
          className={`toolbarIcon ${editor.isActive("bulletList") ? "active" : ""}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <UnorderedListOutlined />
        </button>

        {/* Heading 1 */}
        <button
          className={`toolbarIcon ${editor.isActive("heading", { level: 1 }) ? "active" : ""}`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>

        {/* Heading 2 */}
        <button
          className={`toolbarIcon ${editor.isActive("heading", { level: 2 }) ? "active" : ""}`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        {/* Heading 3 */}
        <button
          className={`toolbarIcon ${editor.isActive("heading", { level: 3 }) ? "active" : ""}`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
      </div>

      <div
        className="flex gap-2 mt-2 relative"
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          padding: "10px",
          // minHeight: "200px",
          minHeight: "auto",
        }}
      >
        <EditorContent editor={editor} className="w-[86%]" />

        {/* attachment, emoji, send buttons div start */}
        <div className="flex gap-2 items-baseline self-end pointer">
          {/* attachment */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = Array.from(e.dataTransfer.files);
              if (droppedFile.length > 0) {
                console.log("drop imgs", droppedFile);
                setAttachmentData(droppedFile);
              }
            }}
          >
            <label className="pointer">
              <NextImage
                src={attatchIcon}
                alt=""
                width={12}
                className="opacity-50"
              />
              <input
                type="file"
                multiple
                // accept="image/*"
                // accept=".doc,.docx,.pdf,.xls,.xlsx,.xml,"
                // ref={hidden_Input_File}
                style={{ display: "none" }}
                onChange={(e) => {
                  console.log("fileList", e.target.files);
                  // setAttachmentData(e.target.files[0]); // single file upload.
                  const selectedFiles = Array.from(e.target.files);
                  setAttachmentData(selectedFiles);
                  fileUpload(selectedFiles);
                }}
              />
            </label>
          </div>

          {/* emoji */}
          <div className="relative">
            <div onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <NextImage
                src={emojiIcon}
                alt=""
                className="opacity-50"
                width={20}
              />
            </div>

            <EmojiPicker
              open={showEmojiPicker}
              emojiStyle={EmojiStyle.GOOGLE} // Apple-style emojis
              className="absolute! top-[30px] right-[-45px] z-1"
              onEmojiClick={(e) => {
                if (!editor) return;
                editor.chain().focus().insertContent(e.emoji).run();
              }}
            />
          </div>

          {/* send */}
          <div>
            <button
              className="pointer ascButton"
              disabled={isEditorEmpty && attachmentData.length === 0}
              onClick={() => {
                handleSendMessage();
                setShowEmojiPicker(false);
              }}
            >
              <NextImage
                src={sendIcon}
                alt=""
                width={25}
                className="opacity-50"
              />
            </button>
          </div>
        </div>
        {/* attachment, emoji, send buttons div end */}
      </div>

      <Messages
        editor={editor}
        taskID={props.taskID}
        messageContent={messageContent}
        attachmentData={attachmentData}
        isEditorEmpty={isEditorEmpty}
      />
    </div>
  );
};

export default TaskEditor;
