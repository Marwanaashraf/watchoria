import { useDispatch, useSelector } from "react-redux";
import { addWatchList } from "../../Apis/WatchList/addWatchList.js";
import { deleteWatchList } from "../../Apis/WatchList/deleteWatchList.js";
import { useState } from "react";
import { BookmarkCheck, BookmarkPlus, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { getWatchList, setInWatchList } from "../../Redux/WatchlistSlice.js";
import ToolTipComponent from "../ToolTip/ToolTip.jsx";

export default function WatchlistBtn({ type, show }) {
  const disp = useDispatch();
  // getWatchList
  const { watchList, watchListLoading } = useSelector(
    (state) => state.watchList
  );
  // userlogged
  const { userData } = useSelector((state) => state.user);
  // loading in btn
  const [isLoading, setLoading] = useState(false);
  // watchlist checker
  const inWatchList = watchList?.find((ele) => ele.show_id === show.id);
  // show Data
  const showData = {
    type,
    show_id: show.id,
    title: type === "movie" ? show.title : show.name,
    poster_path: show.poster_path,
    rating_vote: show.vote_average,
    runtime: type === "movie" ? show.runtime : 0,
    release_date: type === "movie" ? show.release_date : show.first_air_date,
    number_of_seasons: type === "movie" ? 0 : show.number_of_seasons,
    number_of_episodes: type === "movie" ? 0 : show.number_of_episodes,
  };
  // add show in watchlist
  const handleWatchList = async () => {
    // user not logged
    if (!userData) {
      toast.error("Please login first");
      return;
    }

    // 1️⃣Remove from watchlist
    if (inWatchList) {
      setLoading(true);
      const res = await deleteWatchList(show.id);
      // Faild to delete
      if (!res) {
        toast.error("Something wrong please try again");
        setLoading(false);
      }
      // success delete
      else {
        // new array with delete
        const newWatchList = watchList.filter((ele) => ele.show_id !== show.id);
        disp(setInWatchList(newWatchList));
        setLoading(false);
        toast.success(
          `${type === "movie" ? show.title : show.name} deleted from watchlist`
        );
      }
    }
    // 2️⃣add to watchlist
    else {
      setLoading(true);
      const res = await addWatchList(showData);
      // faild to add in watchlist
      if (!res) {
        toast.error("Something wrong please try again");
        setLoading(false);
      }
      // success to add in watchlist
      else {
        // newArr add in watchlist slice
        const newWatchList = JSON.parse(JSON.stringify(watchList));
        newWatchList.push(showData);
        disp(setInWatchList(newWatchList));
        setLoading(false);
        toast.success(
          `${type === "movie" ? show.title : show.name} added in watchlist`
        );
      }
    }
  };

  return (
    <>
      <ToolTipComponent
        btn={
          <button
            disabled={isLoading || watchListLoading}
            onClick={handleWatchList}
            className="btn-trigger disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading || watchListLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : inWatchList ? (
              <BookmarkCheck />
            ) : (
              <BookmarkPlus />
            )}
          </button>
        }
        content={
          inWatchList ? "Remove from your watchlist" : "Add to your watchlist"
        }
      />
    </>
  );
}
