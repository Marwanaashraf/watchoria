import clsx from "clsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RatingBtn({ ratingData, ratingLoading, setRating }) {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleRating = () => {
    if (userData) {
      setRating(true);
    } else {
      toast.error("Please login first");
      navigate("/auth/login");
    }
  };
  return (
    <button
      disabled={ratingLoading}
      onClick={handleRating}
      className={clsx(
        "relative size-16 rounded-full p-[5px]  box-border cursor-pointer hover:scale-105 duration-300 disabled:cursor-not-allowed",
        !ratingData && ratingLoading
          ? "bg-[conic-gradient(#666666_0%_100%)] "
          : !ratingData?.rating_vote
          ? "bg-[conic-gradient(#666666_0%_100%)] "
          : ratingData?.rating_vote === 1
          ? "bg-[conic-gradient(#DB2360_0%_10%,#571435_10%_100%)] "
          : ratingData?.rating_vote === 2
          ? "bg-[conic-gradient(#DB2360_0%_20%,#571435_20%_100%)] "
          : ratingData?.rating_vote === 3
          ? "bg-[conic-gradient(#DB2360_0%_30%,#571435_30%_100%)] "
          : ratingData?.rating_vote === 4
          ? "bg-[conic-gradient(#D2D531_0%_40%,#423D0F_40%_100%)]"
          : ratingData?.rating_vote === 5
          ? "bg-[conic-gradient(#D2D531_0%_50%,#423D0F_50%_100%)]"
          : ratingData?.rating_vote === 6
          ? "bg-[conic-gradient(#D2D531_0%_60%,#423D0F_60%_100%)]"
          : ratingData?.rating_vote === 7
          ? "bg-[conic-gradient(#21d07a_0%_70%,#204529_70%_100%)]"
          : ratingData?.rating_vote === 8
          ? "bg-[conic-gradient(#21d07a_0%_80%,#204529_80%_100%)]"
          : ratingData?.rating_vote === 9
          ? "bg-[conic-gradient(#21d07a_0%_90%,#204529_90%_100%)]"
          : ratingData?.rating_vote === 10
          ? "bg-[conic-gradient(#21d07a_0%_100%)]"
          : ""
      )}
    >
      <div className="bg-[#081c22] w-full h-full rounded-full flex items-center justify-center">
        <span
          className={clsx(
            " font-bold",
            ratingData && !ratingLoading ? "text-white" : "text-[#666666]"
          )}
        >
          {ratingData && !ratingLoading
            ? `${ratingData?.rating_vote}/10`
            : "NR"}
        </span>
      </div>
    </button>
  );
}
