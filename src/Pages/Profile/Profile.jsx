import clsx from "clsx";
import { SquarePen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "../../Apis/profile/uploadAvatar.js";
import { getUser } from "../../Apis/profile/getUser.js";
import { setUserAvatar } from "../../Redux/avatarSlice.js";
import { supabase } from "../../supabaseClient.js";
import Watchlist from "./Components/Watchlist.jsx";
import Ratings from "./Components/Ratings.jsx";
import UpdateProfile from "./Components/UpdateProfile.jsx";
import NotFoundPage from "../../Components/NotFoundPage/NotFoundPage.jsx";
export default function Profile() {
  const disp = useDispatch();
  const [user, setUser] = useState({});
  const fileRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [actions, setActions] = useState(false);

  // upload file
  const handleFile = async (e) => {
    const selectedFile = e.target.files[0];
    const folder = `avatars/users/${user.id}`;
    if (!selectedFile) return;
    // upload file
    setLoading(true);
    const data = await uploadAvatar(folder, selectedFile);
    setUser(data);
    disp(setUserAvatar(data.user_metadata?.avatar_url));
    setLoading(false);
  };
  // remove profile
  const handleRemoveFile = async () => {
    setLoading(true);
    const { data } = await supabase.auth.updateUser({
      data: {
        avatar_url: "",
      },
    });
    setLoading(false);
    if (data) {
      setUser(data.user);
      disp(setUserAvatar(""));
    }
  };

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("user_token")).accessToken;
    if (!token) {
      setUser(null);
    }
    const data = await getUser(token);
    setUser(data);
    disp(setUserAvatar(data.user_metadata.avatar_url));
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(user);

  if (!user && !isLoading) {
    return <NotFoundPage />;
  }
  return (
    <section className="my-28 contain">
      {/* header */}
      <div className="flex gap-3  items-center ">
        <div
          style={
            user?.user_metadata?.avatar_url && !isLoading
              ? { backgroundImage: `url(${user?.user_metadata?.avatar_url})` }
              : undefined
          }
          className={clsx(
            "relative size-28 rounded-full  flex justify-center items-center",
            isLoading
              ? "animate-pulse bg-slate-400  dark:bg-slate-600"
              : user?.user_metadata?.avatar_url !== "" && !isLoading
              ? "bg-cover bg-center"
              : "bg-secondry"
          )}
        >
          {user?.user_metadata?.avatar_url === "" && !isLoading ? (
            <span className="font-bold uppercase text-6xl">
              {user.user_metadata?.userName?.slice(0, 1)}
            </span>
          ) : (
            ""
          )}

          <div className="absolute top-20 left-20">
            <div
              onClick={() => {
                actions ? setActions(false) : setActions(true);
              }}
              className="relative size-8 bg-slate-300 dark:bg-slate-900 rounded-full flex justify-center items-center border border-slate-200 dark:border-slate-600 cursor-pointer"
            >
              <SquarePen className="text-black dark:text-white w-4 h-4" />
              <input
                hidden
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
              />
              {actions ? (
                <div className="absolute top-9 left-2 w-40 h-20 bg-slate-50 dark:bg-slate-900 rounded-lg p-1.5 border border-slate-300 dark:border-slate-600 space-y-2">
                  <div
                    onClick={() => {
                      fileRef.current?.click();
                    }}
                    className="hover:bg-slate-200 hover:dark:bg-slate-800 p-0.5 rounded-md "
                  >
                    <h3>Upload a photo...</h3>
                  </div>
                  <div
                    onClick={handleRemoveFile}
                    className="hover:bg-slate-200 hover:dark:bg-slate-800 p-0.5 rounded-md "
                  >
                    <h3>Remove photo</h3>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div>
          <h3
            className={
              isLoading ? "load w-40 h-5" : "text-main text-2xl font-medium"
            }
          >
            {user && !isLoading ? user.user_metadata?.userName : ""}
          </h3>
          <p className={isLoading ? "load my-1 w-60 h-5" : ""}>
            {user && !isLoading ? user.email : ""}
          </p>
        </div>
      </div>

      {/* personal information */}
      <UpdateProfile user={user} setUser={setUser} isLoading={isLoading} />

      {/* Watchlist */}
      <Watchlist />

      {/* Ratings */}
      <Ratings />
    </section>
  );
}
