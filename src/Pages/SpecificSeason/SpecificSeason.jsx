import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../assets/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
import { Helmet } from "react-helmet";
import Loading from "../../Component/Loading/Loading.jsx";
import { getEpisodesData } from "../../Apis/getEpisodes.js";
export default function SpecificSeason() {
  let { type, id, season } = useParams();
  let navigate = useNavigate();
  //season data
  let [seasonData, setSeason] = useState();
  let [loading, setLoading] = useState({});
  async function getEpisodes() {
    setLoading(true);
    let data = await getEpisodesData(id, season);
    if (data) {
      setLoading(false);
      setSeason(data);
    }
  }
  useEffect(() => {
    getEpisodes();
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {seasonData?.name
            ? seasonData?.name + ": " + seasonData?.overview
            : "TvShow Episodes"}
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-28 contain">
          <div className="flex space-x-4 items-center bg-slate-200 dark:bg-slate-800 p-3 rounded-lg">
            {seasonData?.poster_path != null ? (
              <img
                className="w-20 rounded-lg"
                src={
                  "https://image.tmdb.org/t/p/w500/" + seasonData.poster_path
                }
                alt={season.name}
              />
            ) : (
              <img
                src={defaultImage}
                className="w-20 h-32 rounded-lg bg-gray-400 p-3"
                alt={seasonData?.name}
                loading="lazy"
              />
            )}

            <div className="flex flex-col space-y-3">
              <h3 className="text-xl md:text-2xl font-bold line-clamp-2">
                {seasonData?.name}({seasonData?.air_date?.split("-")[0]})
              </h3>
              <span
                onClick={() => {
                  navigate(`/tv-show/${id}/seasons`);
                }}
                className="text-slate-600 dark:text-slate-400 cursor-pointer hover:text-red-600 hover:dark:text-red-600 "
              >
                <i className="fa-solid fa-arrow-left"></i> Back To Seasons List
              </span>
            </div>
          </div>
          <div className="my-8">
            <h3 className="text-4xl font-bold">
              Episodes{" "}
              <span className="text-slate-600 dark:text-slate-500">
                {seasonData?.episodes.length}
              </span>
            </h3>
            <div className="grid grid-cols-1 gap-4 my-8 space-y-5">
              {seasonData?.episodes?.map((ele) => {
                return (
                  <>
                    <div
                      key={ele.id}
                      className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-6 gap-4 items-center"
                    >
                      <div className="lg:col-span-1 md:col-span-2">
                        {ele.still_path != null ? (
                          <img
                            className="w-full rounded-lg"
                            src={
                              "https://image.tmdb.org/t/p/w500/" +
                              ele.still_path
                            }
                            alt={ele.name}
                          />
                        ) : (
                          <img
                            src={defaultImage}
                            className="w-full  rounded-lg bg-gray-400 p-3"
                            alt={ele.name}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="space-y-2 lg:col-span-4 md:col-span-4">
                        <h3 className="text-2xl font-semibold">
                          S{ele.season_number}.E{ele.episode_number} {ele.name}
                        </h3>
                        <div className="flex space-x-2">
                          <div
                            className={
                              ele.vote_average >= 7
                                ? `bg-green-500 
                  px-2 py-.5 rounded-xl text-white flex space-x-1 items-center`
                                : ele.vote_average >= 5
                                ? `bg-yellow-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                                : `bg-red-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                            }
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
                          {ele.runtime != null ? (
                            <h4 className="text-slate-600 dark:text-slate-500">
                              <i className="fa-solid fa-clock"></i>{" "}
                              {ele.runtime > 60
                                ? (ele.runtime / 60).toFixed(0) +
                                  "h " +
                                  (ele.runtime % 60) +
                                  "min"
                                : ele.runtime + "min"}
                            </h4>
                          ) : (
                            ""
                          )}

                          <h4 className="text-slate-600 dark:text-slate-500">
                            {ele.air_date}
                          </h4>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400">
                          {ele.overview}
                        </p>
                      </div>
                    </div>

                    <hr />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
