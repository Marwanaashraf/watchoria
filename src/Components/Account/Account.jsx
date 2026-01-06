import { ChevronDown, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserData } from "../../Redux/userSlice.js";
import { getAvatar } from "../../Redux/avatarSlice.js";
import clsx from "clsx";

export default function Account() {
  const navigate = useNavigate();
  const disp = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { userAvatar, isLoading } = useSelector((state) => state.avatar);
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    disp(getAvatar(JSON.parse(localStorage.getItem("user_token"))?.accessToken));
  }, []);
  // token expired
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
  let profileList = [
    {
      name: "Profile",
      icon: <i className="fa-solid fa-user"></i>,
      path: "/profile",
    },
    {
      name: "WatchList",
      icon: <i className="fa-solid fa-bookmark"></i>,
      path: "/watchlist",
    },
    {
      name: "Ratings",
      icon: <i className="fa-solid fa-star"></i>,
      path: "/ratings",
    },
    {
      name: "Logout",
      icon: <LogOut className="w-6 h-6" />,
      path: "/auth/login",
    },
  ];

  return (
    <div className="relative">
      {/* logo */}
      <div className="flex items-center space-x-0">
        <div
          onClick={() => {
            dropDown ? setDropDown(false) : setDropDown(true);
          }}
          style={
            userAvatar !== ""
              ? { backgroundImage: `url("${userAvatar}")` }
              : undefined
          }
          className={clsx(
            "size-9 rounded-full flex justify-center items-center cursor-pointer text-white",
            isLoading
              ? "animate-pulse dark:animate-pulse bg-slate-400  dark:bg-slate-600"
              : userAvatar !== ""
              ? "bg-cover bg-center"
              : "bg-secondry"
          )}
        >
          {userAvatar === "" ? (
            <span className="font-bold uppercase text-xl">
              {userData.userName?.slice(0, 1)}
            </span>
          ) : (
            ""
          )}
        </div>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* dropdown */}
      {dropDown ? (
        <div className="absolute top-11 -left-2  bg-slate-50 dark:bg-slate-800 p-1.5 w-36 h-52 rounded-lg z-10 shadow">
          {profileList.map((item, i) => {
            return (
              <>
                <div
                  onClick={() => {
                    setDropDown(false);
                    if (item.name === "Logout") {
                      localStorage.removeItem("user_token");
                      disp(setUserData(null));
                      navigate(`${item.path}`);
                    }
                    navigate(`${item.path}`);
                  }}
                  className="hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center space-x-1 text-[17px] p-2 rounded-lg cursor-pointer my-1 text-slate-800 dark:text-white"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {profileList.length - 1 === i ? "" : <hr />}
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
