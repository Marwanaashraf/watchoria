import { CircleAlert } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ActingProfile({ show }) {
  let navigate = useNavigate();
  function navigateToDetails(id, type) {
    if (type === "movie") {
      navigate(`/movie/${id}`);
    } else if (type === "tv") {
      navigate(`/tv-show/${id}`);
    }
  }
  return (
    <div
      onClick={() => {
        navigateToDetails(show.id, show.media_type);
      }}
      className="cursor-pointer flex justify-between items-center"
    >
      <div className="flex items-center space-x-2" key={show.title}>
        <img
          className="w-20 rounded-lg"
          src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
          alt={show.title}
        />
        <div className="space-y-1">
          {/* title */}
          <h3 className="text-xl font-semibold">
            {show.media_type === "movie" ? show.title : show.name}
          </h3>
          {/* rating,type, year */}
          <p className="font-semibold text-slate-500 dark:text-slate-400">
            {show.vote_average?.toFixed(0) == 0 ? (
              ""
            ) : (
              <span>
                <i className="fa-solid fa-star text-yellow-400"></i>{" "}
                {show.vote_average?.toFixed(1)}
                {"  "}
              </span>
            )}
            <span>{show.media_type === "movie" ? "movie" : "Tv-show"}</span>{" "}
            <span>
              {show.media_type === "movie"
                ? show.release_date?.split("-")[0]
                : show.first_air_date?.split("-")[0]}
            </span>
          </p>
          <p className="font-semibold text-slate-500 dark:text-slate-400">
            {show.character}
          </p>
        </div>
      </div>

      <div className="bg-transparent hover:bg-main/30 hover:dark:bg-main/30  duration-300 w-12 h-12 rounded-full flex justify-center items-center text-main cursor-pointer">
        <CircleAlert className="w-5 h-5" />
      </div>
    </div>
  );
}
