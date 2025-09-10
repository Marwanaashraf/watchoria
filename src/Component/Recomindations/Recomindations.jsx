import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import NavBtn from "../../Component/NavBtn/NavBtn.jsx";
import ShowCard from "../ShowCard/ShowCard.jsx";
import { getMovie } from "../../Redux/MovieDetails.js";
import { useDispatch } from "react-redux";
import { getTvShow } from "../../Redux/TvShowDetails.js";
export default function Recomindations({ recomindations, type }) {
  let disp = useDispatch();
  function getSpecificRecommend(id) {
    if (type === "movie") {
      disp(getMovie(id));
    } else if (type === "tv") {
      disp(getTvShow(id));
    }
  }
  return (
    <>
      <Swiper
        spaceBetween={20}
        navigation={{
          nextEl: ".reco-next",
          prevEl: ".reco-prev",
        }}
        breakpoints={{
          360: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        modules={[Navigation]}
      >
        {recomindations?.map((ele) => {
          return (
            <SwiperSlide
              onClick={() => {
                getSpecificRecommend(ele.id);
              }}
            >
              <ShowCard show={ele} type={type} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <NavBtn
        className="reco-prev absolute top-1/2 -left-10"
        iconDir="left"
      />
      <NavBtn
        className="reco-next absolute top-1/2 -right-10"
        iconDir="right"
      />
    </>
  );
}
