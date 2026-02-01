import React, { useEffect } from "react";
import { getWatchList } from "../../../Redux/WatchlistSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import NavBtn from "../../../Components/ui/NavBtn/NavBtn.jsx";

export default function Watchlist() {
  const navigate = useNavigate();
  const disp = useDispatch();
  // watchlist
  const { watchList, watchListLoading } = useSelector(
    (state) => state.watchList
  );

  useEffect(() => {
    disp(getWatchList());
  }, []);
  return (
    <div className="border border-slate-300 dark:border-slate-800 rounded-md p-3 my-8">
      {/* header */}
      <div className="flex items-center justify-between">
        {/* head */}
        <div className="flex gap-2 items-center cursor-pointer group">
          <span className="bg-main w-[5px] h-8 rounded-lg"></span>
          <div onClick={()=>{navigate("/watchList")}} className="flex gap-1 items-center">
            <h2 className="text-xl md:text-3xl font-medium">Watchlist</h2>
            <span className="text-gray-600 dark:text-gray-500 ms-3 text-lg">
              {watchList?.length}
            </span>
            <ChevronRight className="w-8 h-8 group-hover:text-main duration-300" />
          </div>
        </div>

        {/* view */}

        <button
          onClick={() => {
            navigate("/watchList");
          }}
          className="px-4 py-1 border border-main rounded-full flex items-center justify-center gap-1.5 text-main hover:bg-main hover:scale-[0.98] hover:text-white duration-500"
        >
          <Eye className="w-5 h-5" />
          <span>View</span>
        </button>
      </div>

      {/* data */}
      <div className="w-[85%] lg:w-[94%] mx-auto my-7 relative ">
        <Swiper
          spaceBetween={20}
          navigation={{
            nextEl: ".watch-next",
            prevEl: ".watch-prev",
          }}
          breakpoints={{
            360: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            956: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          modules={[Navigation]}
          className="my-8 items-stretch"
          autoHeight={false}
        >
          {watchList?.map((ele) => {
            return (
              <SwiperSlide className="h-auto">
                <div
                  onClick={() => {
                    ele.type === "movie"
                      ? navigate(`/movie/${ele.show_id}`)
                      : navigate(`/tv-show/${ele.show_id}`);
                  }}
                  className="flex flex-col h-full cursor-pointer rounded-lg group"
                >
                  {/* image */}
                  <img
                    className="w-full rounded-t-lg"
                    src={"https://image.tmdb.org/t/p/w500/" + ele?.poster_path}
                    alt={ele.title}
                  />

                  {/* details */}
                  <div className="flex flex-col justify-between items-center flex-1 p-2 bg-slate-200 dark:bg-slate-900 rounded-b-lg py-2">
                    {/* title */}
                    <h3 className="font-bold line-clamp-1 group-hover:underline">
                      {ele.title}
                    </h3>

                    {/* ratings */}
                    <div className="flex gap-2 items-center justify-center mt-2 text-lg">
                      <div className="space-x-1">
                        <i className="fa-solid fa-star text-yellow-500 " />
                        <span>{ele.rating_vote?.toFixed(1)}</span>
                      </div>
                      <div>
                        <span>| {ele.release_date?.split("-")[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <NavBtn
          className="watch-prev absolute top-1/2 -left-10"
          iconDir="left"
        />
        <NavBtn
          className="watch-next absolute top-1/2 -right-10"
          iconDir="right"
        />
      </div>
    </div>
  );
}
