import { BookmarkPlus, ChevronDown, LogOut } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserData } from "../../Redux/userSlice.js";

export default function Account() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const disp = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  if (!userData) {
    return (
      <NavLink
        to="/auth/login"
        className="p-3 h-8 rounded-lg bg-slate-300 hover:bg-slate-200 dark:bg-slate-800 flex justify-center items-center hover:dark:bg-slate-700 duration-500 hover:scale-[0.93] border border-slate-400 dark:border-slate-700"
      >
        Login
      </NavLink>
    );
  }
  return (
    <div className="relative">
      {/*  */}
      <div className="flex items-center space-x-0">
        <div
          onClick={() => {
            dropDown ? setDropDown(false) : setDropDown(true);
          }}
          className="size-9 rounded-full bg-secondry flex justify-center items-center cursor-pointer text-white"
        >
          <span className="font-bold uppercase text-xl">
            {userData.userName?.slice(0, 1)}
          </span>
        </div>
        <ChevronDown className="w-5 h-5" />
      </div>
      {/* dropdown */}
      {dropDown ? (
        <div className="absolute top-11 -left-3  bg-slate-50 dark:bg-slate-800 p-2 w-36 h-32 rounded-lg z-10 shadow">
          <div
            onClick={() => {
              setDropDown(false);
              navigate("/watchlist");
            }}
            className="hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center space-x-1 text-xl font-semibold p-2 rounded-lg cursor-pointer my-1"
          >
            <BookmarkPlus className="w-6 h-6" />
            <span>Watchlist</span>
          </div>
          <hr />
          <div
            onClick={() => {
              setDropDown(false);
              localStorage.removeItem("user_token");
              disp(setUserData(null));
              navigate("/auth/login");
            }}
            className="hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center space-x-1 text-xl font-semibold p-2 rounded-lg cursor-pointer my-3"
          >
            <LogOut className="w-6 h-6" />
            <span>Logout</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
