import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleAlert, Trash2 } from "lucide-react";
import { deleteWatchList } from "../../../Apis/WatchList/deleteWatchList.js";
import { setInWatchList } from "../../../Redux/WatchlistSlice.js";

export default function WatchlistCard({
  displayedList,
  show,
  setDisplayed,
  setVal,
  index,
  setSort,
}) {
  const navigate = useNavigate();
  const disp = useDispatch();

  const { watchList, watchListLoading } = useSelector(
    (state) => state.watchList
  );
  // loading delete btn
  const [isLoading, setLoading] = useState(false);
  // show's id you want to delete it
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleting = async (show) => {
    setLoading(true);
    setDeleteId(show.id);
    const res = await deleteWatchList(show.show_id);
    if (!res) {
      toast.error("Something Wrong Please try again");
      setLoading(false);
    } else {
      // delete show
      const newWatchList = watchList.filter((ele) => ele.id !== show.id);
      // set new value
      disp(setInWatchList(newWatchList));
      // set displayed
      setDisplayed(newWatchList);
      // empty input
      setVal("");
      setSort(0);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center gap-3">
        {/* show  */}
        <div className="flex gap-2 items-center text-sm md:text-lg">
          {/* poster */}
          <img
            className="w-16 sm:w-20 md:w-28 rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.title}
          />

          {/* details */}
          <div>
            {/* title */}
            <h3 className="text-lg md:text-2xl font-bold">
              {index + 1}- {show.title}
            </h3>

            {/* details */}
            <div className="text-gray-500  flex gap-2">
              {/* date */}
              <span>{new Date(show.release_date)?.getFullYear()}</span>
              {/* seasons */}
              {show.type === "tv-series" ? (
                <span className="hidden md:block">
                  {show.number_of_seasons} Seasons
                </span>
              ) : (
                ""
              )}
              {/* episodes */}
              {show.type === "tv-series" ? (
                <span>{show.number_of_episodes}eps</span>
              ) : (
                ""
              )}
              {/* runtime */}
              {show.type === "movie" ? (
                <p>
                  <span>{Math.floor(show.runtime / 60)}h </span>
                  <span>{show.runtime % 60}min</span>
                </p>
              ) : (
                ""
              )}

              {/* type */}
              <p className="capitalize">{show.type}</p>
            </div>

            {/* rating & remove */}
            <div className="flex items-center gap-2">
              {/* rating */}
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span> {Number(show.rating_vote)?.toFixed(1)}</span>
              </div>

              {/* delete */}
              <div
                onClick={() => {
                  handleDeleting(show);
                }}
                className="flex gap-0.5 items-center text-main hover:dark:bg-main/25 hover:bg-main/15 p-1.5 md:p-2 rounded-full cursor-pointer"
              >
                {isLoading && deleteId === show.id ? (
                  <i className="fa-solid fa-spin fa-spinner text-[12px] md:text-base"></i>
                ) : (
                  <Trash2 className="w-3 h-3 md:w-5 md:h-5 inline" />
                )}
                <span className="text-base font-medium">
                  Remove 
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* icon */}
        <div
          onClick={() => {
            show.type === "movie"
              ? navigate(`/movie/${show.show_id}`)
              : navigate(`/tv-show/${show.show_id}`);
          }}
          className="hover:bg-secondry/30 p-3 rounded-full cursor-pointer duration-500"
        >
          <CircleAlert className="w-5 h-5 md:w-7 md:h-7 text-secondry" />
        </div>
      </div>
      {displayedList?.length - 1 === index ? (
        ""
      ) : (
        <hr className="my-2 border-slate-300 dark:border-slate-800" />
      )}
    </>
  );
}
