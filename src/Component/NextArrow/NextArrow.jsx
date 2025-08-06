import React from "react";

export default function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="text-slate-600 dark:text-white absolute top-1/2 -right-7 cursor-pointer hover:text-red-600 hover:dark:text-red-600 "
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-right text-3xl "></i>
    </div>
  );
}
