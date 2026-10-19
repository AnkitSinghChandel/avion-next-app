"use client";
import { useState } from "react";
import Image from "next/image";
import warningImg from "@/src/assets/icons/warning.svg";

const localAvatar =
  "https://res.cloudinary.com/dlu4uc0ff/image/upload/v1792414305/br7srprdhh7zextd5zkn.jpg";

export const NextImagePreview = (props) => {
  const [preview, setPreview] = useState(false);

  return (
    <div className="group relative inline-block">
      <Image
        src={(props?.image || localAvatar).trim()}
        alt="image"
        onError={(e) => {
          e.target.src = warningImg;
        }}
        width={70}
        height={70}
        style={{
          width: "70px",
          height: "70px",
          // 👇 Parent ka style yaha hoga
          ...props.style,
        }}
        className={`userImg pointer transition duration-200 hover:brightness-75 ${props?.className}`}
        styles={{
          cover: {
            borderRadius: "50%",
          },
        }}
        onClick={() => setPreview(true)}
      />

      <span
        onClick={() => setPreview(true)}
        className="absolute inset-0 flex pointer items-center justify-center
      rounded-full bg-black/30 text-sm text-white tracking-wider
      opacity-0 transition-opacity group-hover:opacity-100"
      >
        Preview
      </span>

      {preview && (
        <div
          onClick={() => setPreview(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
        >
          <button
            type="button"
            aria-label="Close image preview"
            onClick={() => setPreview(false)}
            className="absolute right-6 top-4 text-4xl text-white pointer"
          >
            &times;
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[80vh] w-[90vw] max-w-4xl"
          >
            <Image
              src={props?.image}
              alt="Image preview"
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
