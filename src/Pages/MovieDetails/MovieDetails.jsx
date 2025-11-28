import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../../Redux/MovieDetails.js";
import Loading from "../../Component/Loading/Loading.jsx";

import Cast from "../../Component/Cast/Cast.jsx";
import Recomindations from "../../Component/Recomindations/Recomindations.jsx";
import clsx from "clsx";
import NotFoundPage from "../../Component/NotFoundPage/NotFoundPage.jsx";
export default function MovieDetails() {
  let { type, id } = useParams();
  let { movie, loading, cast, recomindations, director } = useSelector(
    (d) => d.movie
  );
  let navigate = useNavigate();
  let disp = useDispatch();

  function playTrailer() {
    navigate(`/movie/${id}/trailer`);
  }
  useEffect(() => {
    disp(getMovie(id));
  }, []);
  if (Object.keys(movie).length === 0 && !loading) {
    return <NotFoundPage />;
  }


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{movie.title ? movie.title : "MovieDetails"} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <section>
          <div className="contain py-28">
            {/* movie Details */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-5">
              {/* image */}
              <div className="lg:col-span-1 md:col-span-2 relative">
                <img
                  className="w-full rounded-lg shadow-lg"
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  alt={movie.title}
                />
                <div
                  className={clsx(
                    "absolute top-2 right-2 px-2 h-6 rounded-xl text-white flex space-x-1 items-center",
                    movie.vote_average === 0
                      ? ""
                      : movie.vote_average >= 7
                      ? "bg-green-500 "
                      : movie.vote_average >= 5
                      ? "bg-yellow-500"
                      : "bg-red-500 "
                  )}
                >
                  {movie.vote_average == 0 ? (
                    ""
                  ) : (
                    <>
                      <i className="fa-solid fa-star"></i>
                      <p>{movie.vote_average?.toFixed(1)}</p>
                    </>
                  )}
                </div>
              </div>

              {/* details */}
              <div className="lg:col-span-3 md:col-span-3 mt-5 space-y-5">
                {/* head */}
                <h1 className="text-4xl font-bold uppercase">{movie.title}</h1>

                {/* year,runtime */}
                <div className="flex space-x-3 text-base   text-slate-600 dark:text-slate-400">
                  <p className="">{movie.release_date?.split("-")[0]}</p>
                  {movie.runtime ? (
                    <p className="">
                      <i className="fa-solid fa-clock  text-sm"></i>{" "}
                      {(movie.runtime / 60).toFixed(0) != 0 ? (
                        <span>{(movie.runtime / 60).toFixed(0)}h</span>
                      ) : (
                        ""
                      )}{" "}
                      {movie.runtime % 60 != 0 ? (
                        <span>{movie.runtime % 60}min</span>
                      ) : (
                        ""
                      )}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                {/* Genres */}
                <div className="flex space-x-3">
                  {movie?.genres.map((ele) => {
                    return (
                      <div
                        key={ele.id}
                        className="text-black dark:text-white bg-slate-200 dark:bg-slate-800 rounded-lg w-fit p-3 h-8 flex justify-center items-center shadow"
                      >
                        <h3>{ele.name}</h3>
                      </div>
                    );
                  })}
                </div>

                {/* director */}
                <h3
                  className="text-2xl font-bold text-gray-600 
                dark:text-gray-500"
                >
                  Director:{" "}
                  <span className="text-lg text-black dark:text-slate-300 font-medium">
                    {!director ? "UnKnown" : director}
                  </span>
                </h3>

                {/* cast */}
                {cast.length === 0 ? (
                  ""
                ) : (
                  <h3
                    className="text-2xl font-bold text-gray-600 
                dark:text-gray-500"
                  >
                    Cast:{" "}
                    {cast?.slice(0, 3).map((ele, i) => {
                      return (
                        <span
                          key={ele.name}
                          className=" text-lg text-black dark:text-white font-medium"
                        >
                          {ele.name}
                          {i < cast.slice(0, 3).length - 1 ? ", " : ""}
                        </span>
                      );
                    })}
                  </h3>
                )}

                {/* Description */}
                <h3
                  className="text-2xl font-bold text-gray-600 
                dark:text-gray-500"
                >
                  Description:{" "}
                  <span className=" text-base text-black dark:text-white font-medium">
                    {movie.overview}
                  </span>
                </h3>

                <button
                  onClick={playTrailer}
                  className="bg-main hover:bg-red-700 duration-700 rounded-lg px-3 py-2 text-white"
                >
                  <i className="fa-solid fa-play"></i> Play trailer
                </button>
              </div>
            </div>

            {/* Cast */}
            {cast.length == 0 ? (
              ""
            ) : (
              <div className="py-16">
                <h1 className="text-4xl text-main font-serif">All Cast</h1>
                <div className="w-[90%] mx-auto my-5 relative ">
                  <Cast cast={cast} />
                </div>
              </div>
            )}

            {/* Recomindations */}
            {recomindations.length == 0 ? (
              ""
            ) : (
              <div className="py-8">
                <h1 className="text-4xl text-main font-bold font-serif">
                  Recommendations
                </h1>
                <div className="w-[90%] mx-auto my-5 relative ">
                  <Recomindations
                    recomindations={recomindations}
                    type="movie"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
