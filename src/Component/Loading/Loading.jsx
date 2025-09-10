import React from "react";
import logo from "../../assets/images/Watchix.png";

export default function Loading() {
  return (
    <div className="loading flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-slate-950 z-50">
      <img className="loader w-20" src={logo} alt="loaing" />
    </div>
  );
}
