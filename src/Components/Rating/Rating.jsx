import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { addRating } from "../../Apis/Rating/addRating.js";
import toast from "react-hot-toast";
import { editRating } from "../../Apis/Rating/editRating.js";
import { deleteRating } from "../../Apis/Rating/deleteRating.js";
const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function Rating({
  show,
  type,
  setRating,
  ratingData,
  setRatingData,
}) {
  // change rate
  const [rate, setRate] = useState(ratingData?.rating_vote || 0);
  // hover rate
  const [hover, setHover] = useState(0);
  // add and update loading
  const [addLoading, setAddLoading] = useState();
  // remove loading
  const [deleteLoading, setDeleteLoading] = useState();

  // add and upadate rating
  const handleRate = async () => {
    const body = {
      show_id: show.id,
      rating_vote: rate,
      type,
    };
    if (!ratingData) {
      setAddLoading(true);
      const res = await addRating(body);
      setAddLoading(false);
      if (res) {
        setRatingData(res);
        setRating(false);
      } else {
        toast.error("Something wrong try again");
      }
    } else {
      setAddLoading(true);
      const res = await editRating(show.id, rate, ratingData.user_id);
      setAddLoading(false);
      if (res) {
        setRatingData(res);
        setRating(false);
      } else {
        toast.error("Something wrong try again");
      }
    }
  };
  // delete rating
  const deleteRate = async () => {
    setDeleteLoading(true);
    const res = await deleteRating(show.id);
    setDeleteLoading(false);
    if (!res) {
      toast.error("Something wrong please try again");
    } else {
      // rate in prompt
      setRate(0);
      // rating data
      setRatingData(null);
      // close prompt
      setRating(false);
    }
  };

  // if enter esc , enter any way
  const secRef = useRef(null);
  const rateRef = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setRating(false);
    });
    secRef.current?.addEventListener("click", (e) => {
      if (!rateRef.current?.contains(e.target)) setRating(false);
    });
  }, []);

  return (
    <section
      ref={secRef}
      className="fixed top-0 right-0 left-0 bottom-0 
    bg-black/50 flex justify-center items-center z-50"
    >
      <div
        ref={rateRef}
        className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-1/2 h-[380px] bg-slate-200 dark:bg-slate-900 rounded-lg relative"
      >
        {/* shape */}
        <div className="flex  justify-center -translate-y-10 relative text-white">
          <i className="fa-solid fa-star text-8xl text-secondry"></i>
          <span className="absolute top-[30%] text-3xl">
            {rate === 0 ? "?" : rate}
          </span>
        </div>

        {/* header */}
        <h3 className="text-center text-lg sm:text-xl uppercase  text-light_rate dark:text-dark_rate font-semibold">
          Rate this
        </h3>
        <h3 className="text-center sm:text-2xl text-xl font-semibold my-2">
          {type === "movie" ? show?.title : show?.name}
        </h3>

        {/* rating values */}
        <div
          onMouseLeave={() => {
            setHover(0);
          }}
          className="flex gap-2 justify-center my-7"
        >
          {stars.map((ele) => {
            return (
              <i
                onMouseEnter={() => {
                  setHover(ele);
                }}
                onClick={() => {
                  setRate(ele);
                }}
                className={clsx(
                  " fa-star text-xl sm:text-2xl cursor-pointer",
                  ele <= rate || ele <= hover
                    ? "fa-solid text-yellow-500 dark:text-dark_rate "
                    : "fa-regular "
                )}
              ></i>
            );
          })}
        </div>

        {/* rate btn */}
        <div className="text-center ">
          <button
            onClick={handleRate}
            disabled={rate === 0 || addLoading}
            className="w-1/2 bg-light_rate hover:bg-light_rate/90 dark:bg-dark_rate/80 p-3 hover:dark:bg-dark_rate/75 rounded-full text-xl disabled:opacity-40 disabled:cursor-not-allowed text-white"
          >
            {addLoading ? (
              <i className="fa-solid fa-spinner animate-spin" />
            ) : (
              ""
            )}
            <span className="ms-1">Rate</span>
          </button>
        </div>

        {/* delete btn */}
        {!ratingData ? (
          ""
        ) : (
          <div className="text-center my-2">
            <button
              onClick={deleteRate}
              disabled={deleteLoading}
              className="w-1/2 hover:bg-secondry/25 p-2 rounded-full text-xl disabled:opacity-40 disabled:cursor-not-allowed text-secondry "
            >
              {deleteLoading ? (
                <i className="fa-solid fa-spinner animate-spin" />
              ) : (
                ""
              )}
              <span className="ms-1">Remove Rating</span>
            </button>
          </div>
        )}
        {/* exit */}
        <div
          onClick={() => {
            setRating(false);
          }}
          className="absolute -top-14 right-0 cursor-pointer hover:text-dark_rate rounded-full p-3"
        >
          <X className="w-8 h-8" />
        </div>
      </div>
    </section>
  );
}
