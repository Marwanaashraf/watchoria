import { useEffect, useState } from "react";
import Loading from "../../Components/ui/Loading/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { CircleAlert, User } from "lucide-react";
import noData from "../../assets/images/activities.svg";
import { useNavigate } from "react-router-dom";
import Rating from "../../Components/Rating/Rating.jsx";
import clsx from "clsx";
import { getRatings, setRatingList } from "../../Redux/RatingSlice.js";
export default function Ratings() {
  const navigate = useNavigate();
  const disp = useDispatch();
  const { ratingList, ratingLoading } = useSelector((state) => state.ratings);
  const [removeId, setRemoveId] = useState(null);
  const [ratingPrompt, setRating] = useState(false);
  const [ratingData, setRatingData] = useState(null);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    disp(getRatings());
  }, []);
  useEffect(() => {
    if (ratingList?.length > 0) {
      let ratingsCopy = [...ratingList];
      if (ratingData) {
        const showIndex = ratingsCopy.findIndex(
          (ele) => ele.id === ratingData.id
        );
        ratingsCopy.splice(showIndex, 1, ratingData);
        disp(setRatingList(ratingsCopy));
      } else {
        const showIndex = ratingsCopy.findIndex((ele) => ele.id === removeId);
        ratingsCopy.splice(showIndex, 1);
        disp(setRatingList(ratingsCopy));
      }
    }
  }, [ratingData]);
  if (ratingLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="py-28 contain">
        {/* header */}
        <div className="dark:bg-slate-800 bg-slate-200 w-full p-5 rounded-lg space-y-2">
          {/*header */}
          <h1 className="text-3xl font-bold">Your Rating</h1>
          <div className="flex gap-2 items-center">
            <div className="bg-secondry size-10 flex items-center justify-center text-lg font-bold rounded-full text-white">
              {userData ? (
                <span className="uppercase">
                  {userData?.userName?.slice(0, 1)}
                </span>
              ) : (
                <User className="w-6 h-6 " />
              )}
            </div>
            <h4 className="text-lg">
              {userData ? userData.email : "example@gmail.com"}
            </h4>
          </div>
          <p className="text-sm sm:text-base">
            This page compiles a list of titles you have rated, providing a
            convenient overview of all your ratings.
          </p>
        </div>
        <div className="my-7">
          <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300">
            {ratingList.length} Titles
          </h3>
        </div>
        {/* data */}
        <div className="border border-gray-300 dark:border-gray-800 rounded-lg p-3 shadow-sm my-4">
          {ratingList.length > 0 && !ratingLoading ? (
            <div className="grid grid-cols-1 gap-2">
              {ratingList?.map((item, i) => {
                return (
                  <>
                    <div
                      className="flex justify-between items-center gap-3"
                      key={item.id}
                    >
                      {/* show  */}
                      <div className="flex gap-2 items-center text-sm md:text-lg">
                        {/* poster */}
                        <img
                          className="w-16 sm:w-20 md:w-28 rounded-lg"
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.title}
                        />

                        {/* details */}
                        <div>
                          {/* title */}
                          <h3
                            onClick={() => {
                              item.type === "movie"
                                ? navigate(`/movie/${item.show_id}`)
                                : navigate(`/tv-show/${item.show_id}`);
                            }}
                            className="text-base md:text-2xl font-bold cursor-pointer hover:opacity-60  duration-500"
                          >
                            {i + 1}- {item.title}
                          </h3>

                          {/* details */}
                          <div className="text-gray-500  flex gap-2">
                            {/* date */}
                            <span>
                              {new Date(item.release_date)?.getFullYear()}
                            </span>
                            {/* seasons */}
                            {item.type === "tv" ? (
                              <span className="hidden md:block">
                                {item.number_of_seasons} Seasons
                              </span>
                            ) : (
                              ""
                            )}
                            {/* episodes */}
                            {item.type === "tv" ? (
                              <span>{item.number_of_episodes}eps</span>
                            ) : (
                              ""
                            )}
                            {/* runtime */}
                            {item.type === "movie" ? (
                              <p>
                                <span>{Math.floor(item.runtime / 60)}h </span>
                                <span>{item.runtime % 60}min</span>
                              </p>
                            ) : (
                              ""
                            )}

                            {/* type */}
                            <p className="capitalize">
                              {item.type === "movie" ? "movie" : "Tv-Series"}
                            </p>
                          </div>

                          {/* rating & remove */}
                          <div className="flex items-center gap-2">
                            {/* rating */}
                            <div className="flex items-center gap-1">
                              <i className="fa-solid fa-star text-yellow-400"></i>
                              <span> {item.show_rating?.toFixed(1)}</span>
                            </div>

                            {/* your rating */}
                            <div
                              onClick={() => {
                                setRatingData(item);
                                setRating(true);
                              }}
                              className={clsx(
                                "  px-3 py-1 rounded-full flex gap-2 items-center duration-500 cursor-pointer",
                                item.rating_vote >= 7
                                  ? "text-[#21D07A] hover:bg-[#21D07A]/25"
                                  : item.rating_vote >= 5
                                  ? "text-[#D2D531] hover:bg-[#D2D531]/25"
                                  : "text-[#DB2360] hover:bg-[#DB2360]/25"
                              )}
                            >
                              <i className="fa-solid fa-star " />
                              <span className="font-semibold">
                                {item.rating_vote} /10
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* icon */}
                      <div
                        onClick={() => {
                          item.type === "movie"
                            ? navigate(`/movie/${item.show_id}`)
                            : navigate(`/tv-show/${item.show_id}`);
                        }}
                        className="hover:bg-secondry/30 p-3 rounded-full cursor-pointer duration-500"
                      >
                        <CircleAlert className="w-5 h-5 md:w-7 md:h-7 text-secondry" />
                      </div>
                    </div>
                    {ratingList?.length - 1 === i ? (
                      ""
                    ) : (
                      <hr className="my-2 border-slate-300 dark:border-slate-800" />
                    )}
                  </>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center p-16 text-gray-500 dark:text-gray-400  text-lg gap-1.5">
              <img className="w-36" src={noData} alt="no data" />
              <p>Rating Data is empty</p>
              <p>
                {userData
                  ? "No results found for movies or TV shows. "
                  : "Please login first to add show in watchlist."}
              </p>
            </div>
          )}
        </div>
        {ratingPrompt ? (
          <Rating
            ratingData={ratingData}
            setRatingData={setRatingData}
            setRating={setRating}
            setRemoveId={setRemoveId}
          />
        ) : (
          ""
        )}
      </section>
    </>
  );
}
