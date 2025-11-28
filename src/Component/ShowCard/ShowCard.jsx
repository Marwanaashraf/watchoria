import { useNavigate } from "react-router-dom";

import clsx from "clsx";
import { useState } from "react";
import StaticImage from "../StaticImage/StaticImage.jsx";
export default function ShowCard({ show, type }) {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          type === "movie"
            ? navigate(`/movie/${show.id}`)
            : navigate(`/tv-show/${show.id}`);
        }}
        className="cursor-pointer relative group overflow-hidden text-center rounded-lg h-[305px] sm:h-[375px]"
      >
        {/* loading Img */}
        {imgLoaded === false && <StaticImage />}
        <img
          className="w-full h-full group-hover:scale-110 duration-300"
          src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
          alt={type === "movie" ? show.title : show.name}
          onLoad={() => {
            setImgLoaded(true);
          }}
          onError={() => {
            setImgLoaded(false);
          }}
        />

        <div className="group-hover:top-[70%] group-hover:bottom-0 bg-gradient-to-t from-35% from-black/90 to-transparent  duration-300  absolute top-full left-0 right-0 -bottom-20 mx-auto flex justify-center items-center">
          <div className="w-[90%] mx-auto ">
            <h1 className="text-base uppercase text-white font-bold text-shadow line-clamp-2">
              {type === "movie" ? show.title : show.name}
            </h1>
            <p className="text-base text-gray-300 text-shadow">
              <span>
                <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                {show.vote_average?.toFixed(1)}
              </span>{" "}
              <span className="text-gray-400">|</span>{" "}
              <span>
                {type === "movie"
                  ? show.release_date?.split("-")[0]
                  : show.first_air_date?.split("-")[0]}
              </span>{" "}
            </p>
          </div>
        </div>
        <div
          className={clsx(
            "absolute top-2 right-2 px-2 h-6 rounded-xl text-white flex space-x-1 items-center",
            show.vote_average === 0
              ? ""
              : show.vote_average >= 7
              ? "bg-green-500 "
              : show.vote_average >= 5
              ? "bg-yellow-500"
              : "bg-red-500 "
          )}
        >
          {show.vote_average == 0 ? (
            ""
          ) : (
            <>
              <i className="fa-solid fa-star"></i>
              <p>{show.vote_average?.toFixed(1)}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
