import React, { useState } from "react";
import DownArrowOption from "@/src/assets/icons/DownArrowOption.svg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoData from "@/src/components/common/NoData";
import SelectBox from "@/src/components/common/SelectBox";

const ProductsCategory = () => {
  const [Ankit] = useAutoAnimate();

  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [optionsShow, setOptionsShow] = useState(false);
  const [homeHover, setHomeHover] = useState(false);
  const [arrowOptionsRotate, setArrowOptionsRotate] = useState(false);

  const listData = [
    { label: "Java", value: "asc1" },
    { label: "JavaScript", value: "asc2" },
    { label: "React", value: "asc3" },
    { label: "Python", value: "asc4" },
    { label: "Node", value: "asc5" },
    { label: "MongoDB", value: "asc6" },
    { label: "SQL", value: "asc7" },
    { label: "My SQL", value: "asc8" },
  ];

  return (
    <div className="hidden md:flex flex-wrap gap-9 pointer">
      <div>
        <div className="relative flex gap-3 text-[16px] font-medium items-baseline">
          <p className="text-(--badge-text) hover:text-[#8d7b68]">Home</p>
          <img alt="" src={DownArrowOption} width={12} className="icon" />
        </div>
      </div>

      <div className="flex gap-3 text-[16px] font-medium items-baseline">
        <p className="text-(--badge-text) hover:text-[#8d7b68]">Categories</p>
        <img alt="" src={DownArrowOption} width={12} className="icon" />
      </div>

      <div className="flex gap-3 text-[16px] font-medium items-baseline">
        <p className="text-(--badge-text) hover:text-[#8d7b68]">Products</p>
        <img alt="" src={DownArrowOption} width={12} className="icon" />
      </div>

      <div className="flex gap-3 text-[16px] font-medium items-baseline">
        <p className="text-(--badge-text) hover:text-[#8d7b68]">Blogs</p>
        <img alt="" src={DownArrowOption} width={12} className="icon" />
      </div>
    </div>
  );
};

export default ProductsCategory;
