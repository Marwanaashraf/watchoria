import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import NavBtn from "../NavBtn/NavBtn.jsx";
import { useNavigate } from "react-router-dom";

export default function Trending({ trending, type }) {
  let navigate = useNavigate();
  function navigateDetails(id) {
    if (type === "movie") {
      navigate(`/movie/${id}`);
    } else if (type === "tv") {
      navigate(`/tv-show/${id}`);
    }
  }
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={{
          nextEl: type === "movie" ? ".mtrending-next" : ".ttrending-next",
          prevEl: type === "movie" ? ".mtrending-prev" : ".ttrending-prev",
        }}
        modules={[Navigation]}
        breakpoints={{
          360: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {trending.map((ele, i) => {
          return (
            <SwiperSlide>
              <div>
                <div
                  onClick={() => {
                    navigateDetails(ele.id);
                  }}
                  className="cursor-pointer pl-2 relative group"
                >
                  <img
                    className="rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500/${ele.poster_path}`}
                    alt={type === "movie" ? ele.title : ele.name}
                  />
                  <div className="group-hover:bg-black/35 transition-all duration-[.6s] rounded-lg absolute top-0 left-2 right-0 bottom-0 "></div>
                </div>
                <div className="flex space-x-2 items-center">
                  <div>
                    <h1 className="font-bold text-7xl">{i + 1}</h1>
                  </div>
                  <div>
                    <h1 className="text-lg text-black dark:text-white font-semibold">
                      {type === "movie"
                        ? ele.title?.split(" ").slice(0, 3).join(" ")
                        : ele.name?.split(" ").slice(0, 3).join(" ")}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-500">
                      {ele.release_date?.split("-")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <NavBtn
        className={
          type === "movie"
            ? "mtrending-next absolute top-1/2 -right-10"
            : "ttrending-next absolute top-1/2 -right-10"
        }
        iconDir="right"
      />
      <NavBtn
        className={
          type === "movie"
            ? "mtrending-prev absolute top-1/2 -left-10"
            : "ttrending-prev absolute top-1/2 -left-10"
        }
        iconDir="left"
      />
    </>
  );
}
