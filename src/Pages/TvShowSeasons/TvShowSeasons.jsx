import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import defaultImage from "../../assets/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
import Loading from "../../Component/Loading/Loading.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getTvShow } from "../../Redux/TvShowDetails.js";
import clsx from "clsx";
export default function TvShowSeasons() {
  //tvshow id
  let { id } = useParams();
  let disp = useDispatch();
  let navigate = useNavigate();
  //get tvshow and loading from slice
  let { tvShow, loading } = useSelector((d) => d.tvShow);

  useEffect(() => {
    disp(getTvShow(id));
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {tvShow.name ? tvShow.name + ": seasons" : "TvShow seasons"}
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className="contain my-28">
          {/* tv-show */}
          <div className="flex space-x-4 items-center bg-slate-200 dark:bg-slate-800 p-3 rounded-lg">
            {/* poster */}
            {tvShow.poster_path != null ? (
              <img
                className="w-20 rounded-lg"
                src={"https://image.tmdb.org/t/p/w500/" + tvShow.poster_path}
                alt={tvShow.name}
              />
            ) : (
              <img
                className="w-24 h-32 rounded-lg bg-gray-400"
                src={defaultImage}
                alt={tvShow.name}
                loading="lazy"
              />
            )}

            <div className="flex flex-col space-y-3">
              {/* head */}
              <h1 className="text-xl md:text-2xlfont-bold uppercase line-clamp-2">
                {tvShow.name}
              </h1>
              {/* year, seasons , Episodes */}
              <div className="flex space-x-2 md:text-base text-slate-600 dark:text-slate-400 text-xs ">
                <span>
                  {tvShow.first_air_date?.split("-")[0]}
                  {tvShow.first_air_date?.split("-")[0] ===
                  tvShow.last_air_date?.split("-")[0]
                    ? ""
                    : "-" + tvShow.last_air_date?.split("-")[0]}
                </span>

                <span>
                  {tvShow.number_of_seasons === 1
                    ? tvShow.number_of_seasons + " Season"
                    : tvShow.number_of_seasons + " Seasons"}
                </span>
                <span>{tvShow.number_of_episodes} Episodes</span>
              </div>
              <span
                onClick={() => {
                  navigate(`/tv-show/${id}`);
                }}
                className="text-slate-600 dark:text-slate-400 cursor-pointer hover:text-red-600 hover:dark:text-red-600 "
              >
                <i className="fa-solid fa-arrow-left"></i> Back To Main
              </span>
            </div>
          </div>

          <div className="my-8">
            {/* num of seasons */}
            <h1 className="text-3xl font-bold">
              Seasons{" "}
              <span className="text-slate-600 dark:text-slate-500">
                {tvShow?.number_of_seasons}
              </span>
            </h1>

            {/* Seasons */}
            <div className="grid grid-cols-1 gap-4 my-8 space-y-2">
              {tvShow.seasons?.map((ele, i) => {
                return ele.season_number > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-4  lg:grid-cols-7 gap-4 items-center ">
                      <div className=" lg:col-span-1 md:grid-cols-1">
                        {ele.poster_path != null ? (
                          <img
                            className="w-full rounded-lg"
                            src={
                              "https://image.tmdb.org/t/p/w500/" +
                              ele.poster_path
                            }
                            alt={ele.name}
                          />
                        ) : (
                          <img
                            className="w-full  rounded-lg bg-gray-300"
                            src={defaultImage}
                            alt={ele.name}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className=" md:col-span-3   lg:col-span-6 space-y-3">
                        <h3 className="font-bold text-3xl">
                          Season{ele.season_number}
                        </h3>
                        <div className="flex space-x-2">
                          <div
                            className={clsx(
                              "px-2 h-6 rounded-xl text-white flex space-x-1 items-center",
                              ele.vote_average === 0
                                ? ""
                                : ele.vote_average >= 7
                                ? "bg-green-500 "
                                : ele.vote_average >= 5
                                ? "bg-yellow-500"
                                : "bg-red-500 "
                            )}
                          >
                            {ele.vote_average <= 0 ? (
                              <>
                                <i className="fa-solid fa-star"></i>
                                <p>Not Rated</p>
                              </>
                            ) : (
                              <>
                                <i className="fa-solid fa-star"></i>
                                <p>{ele.vote_average?.toFixed(1)}</p>
                              </>
                            )}
                          </div>
                          <h5 className="text-lg text-slate-600 dark:text-slate-500">
                            {ele.air_date?.split("-")[0]}
                          </h5>
                          <h5 className="text-lg text-slate-600 dark:text-slate-500">
                            {ele.episode_count} Episodes
                          </h5>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 line-clamp-4">
                          {ele.overview}
                        </p>
                        <p
                          onClick={() => {
                            navigate(`${ele.season_number}`);
                          }}
                          className="text-lg cursor-pointer hover:text-red-600"
                        >
                          <i className="fa-solid fa-arrow-right"></i> view
                          Episodes
                        </p>
                      </div>
                    </div>
                    {tvShow.seasons?.length - 1 === i ? "" : <hr />}
                  </>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
