import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import NavBtn from "../ui/NavBtn/NavBtn.jsx";
import { useNavigate } from "react-router-dom";
export default function Cast({ cast }) {
  let navigate = useNavigate();
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
          768: { slidesPerView: 3 },
          956: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        modules={[Navigation]}
      >
        {cast
          ?.filter((ele) => ele.profile_path)
          .map((ele) => {
            return (
              <SwiperSlide>
                <div
                  onClick={() => {
                    navigate(`/cast/${ele.id}`);
                  }}
                  className="rounded-lg h-full cursor-pointer hover:scale-[1.02] ease-out duration-300 text-sm md:text-base"
                >
                  <img
                    className="w-full rounded-t-lg"
                    src={"https://image.tmdb.org/t/p/w500/" + ele?.profile_path}
                    alt={ele.name}
                  />
                  <div className="rounded-b-lg shadow-lg text-center p-2 bg-slate-200 dark:bg-slate-800">
                    <h3 className="font-bold">
                      {ele.name?.split(" ").slice(0, 2).join(" ")}
                    </h3>
                    <h3 className="text-slate-500 dark:text-slate-400">
                      {ele.character?.split(" ").slice(0, 2).join(" ")}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <NavBtn className="cast-prev absolute top-1/2 -left-10" iconDir="left" />
      <NavBtn
        className="cast-next absolute top-1/2 -right-10"
        iconDir="right"
      />
    </>
  );
}
