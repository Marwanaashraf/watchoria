import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import NavBtn from "../../Component/NavBtn/NavBtn.jsx";
export default function Cast({ cast }) {
  return (
    <>
      <Swiper
        spaceBetween={20}
        navigation={{
          nextEl: ".cast-next",
          prevEl: ".cast-prev",
        }}
        breakpoints={{
          360: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        modules={[Navigation]}
      >
        {cast
          ?.filter((ele) => ele.profile_path)
          .map((ele) => {
            return (
              <SwiperSlide>
                <div className="rounded-lg shadow-lg pl-2 h-full ">
                  <div className="h-full">
                    <img
                      className="w-full rounded-t-lg"
                      src={
                        "https://image.tmdb.org/t/p/w500/" + ele?.profile_path
                      }
                      alt={ele.name}
                    />
                    <div className="rounded-b-lg shadow-lg text-center p-2 bg-slate-100 dark:bg-slate-800">
                      <h3 className="font-bold">
                        {ele.name?.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <h3 className="text-slate-500 dark:text-slate-400">
                        {ele.character?.split(" ").slice(0, 2).join(" ")}
                      </h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <NavBtn
        className="cast-prev absolute top-1/2 -left-10"
        iconDir="left"
      />
      <NavBtn
        className="cast-next absolute top-1/2 -right-10"
        iconDir="right"
      />
    </>
  );
}
