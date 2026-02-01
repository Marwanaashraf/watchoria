import { ChevronDown, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserData } from "../../Redux/userSlice.js";
import { getAvatar } from "../../Redux/avatarSlice.js";
import clsx from "clsx";
import { motion } from "framer-motion";
const profileList = [
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
export default function Account() {
  const navigate = useNavigate();
  const disp = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { userAvatar, isLoading } = useSelector((state) => state.avatar);
  const [dropDown, setDropDown] = useState(false);
  const [logout, setLogout] = useState(false);
  // get avatar
  useEffect(() => {
    disp(
      getAvatar(JSON.parse(localStorage.getItem("user_token"))?.accessToken),
    );
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setLogout(false);
    });
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
                : "bg-secondry",
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
                {item.name === "Logout" ? (
                  <div
                    onClick={() => {
                      setLogout(true);
                    }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center space-x-1 text-[17px] p-2 rounded-lg cursor-pointer my-1 text-slate-800 dark:text-white"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setDropDown(false);

                      navigate(`${item.path}`);
                    }}
                    className="hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center space-x-1 text-[17px] p-2 rounded-lg cursor-pointer my-1 text-slate-800 dark:text-white"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                )}
                {profileList.length - 1 === i ? "" : <hr />}
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}

      {/* logout prompt */}
      {logout ? (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="absolute top-[10%] left-[11%] sm:left-[20%] md:left-[30%] lg:left-[40%] ">
            {/* prompt */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="w-80 sm:w-96 p-3 bg-slate-200 dark:bg-slate-900 rounded-lg border-2 border-slate-50 dark:border-slate-700 space-y-3"
            >
              {/* title */}
              <h2 className="text-2xl font-semibold  ">Logout</h2>
              <hr className="border-slate-50 dark:border-slate-800"/>
              {/* description */}
              <p className="text-slate-600 dark:text-slate-400 text-base">
                Are you sure you want to log out? You will need to sign in again
                to access your account.
              </p>
              <hr className="border-slate-50 dark:border-slate-800"/>
              {/* buttons */}
              <div className="flex justify-end gap-3 mt-4">
                {/* cancel */}
                <button
                  onClick={() => {
                    setLogout(false);
                  }}
                  className="bg-slate-400 dark:bg-slate-800 px-4 py-2 rounded-lg hover:opacity-70 duration-500 text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // remove token
                    localStorage.removeItem("user_token");
                    disp(setUserData(null));
                    // close dropdown
                    setDropDown(false);
                    // close logout
                    setLogout(false);
                    navigate("/auth/login");
                  }}
                  className="bg-main px-4 py-2 rounded-lg hover:opacity-70 duration-500 text-white"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
