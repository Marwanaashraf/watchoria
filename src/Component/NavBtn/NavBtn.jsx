import React from "react";

export default function NavBtn({ className, iconDir }) {
  return (
    <button
      className={`${className}  disabled:opacity-20 text-white cursor-pointer hover:text-main disabled:cursor-not-allowed z-20`}
    >
      <i className={`fa-solid fa-chevron-${iconDir} text-3xl`}></i>
    </button>
  );
}
