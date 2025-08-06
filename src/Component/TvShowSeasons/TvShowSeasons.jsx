import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApiKey } from "../../assets/Default/Default.js";
import axios from "axios";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/Watchix.png";
import defaultImage from "../../assets/images/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
export default function TvShowSeasons() {
  let {  id } = useParams();
  let [tvShow, setTvShow] = useState({});
  let [loading, setLoading] = useState({});
  let navigate = useNavigate();
  async function getTvShow(tvShowId = id) {
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmUzYjlhMjkxYzQxOThlZDY3M2VjMTExNGUzNjFlNyIsIm5iZiI6MTc1MTQwOTc1OC43NDIsInN1YiI6IjY4NjQ2NDVlYTAzZmZmYzRjMmNjZGM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P5hWPGE6zh0J59tmTpJpZQaUftGDxS38lH7fT94GrgI",
      },
    };
    try {
      setLoading(true);
      let req = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${ApiKey}&language=en-US`,
        options
      );
      console.log(req.data);

      setTvShow(req.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  function backToTvShow() {
    navigate(`/tv-show/${id}`);
  }
  function goToEpisodes(season) {
    navigate(`${season}`);
  }
  useEffect(() => {
    getTvShow();
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
        <div className="loading flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-slate-950 z-50">
          <img className="loader w-20" src={logo} alt="" />
        </div>
      ) : (
        <div className="contain my-28">
          <div className="flex space-x-4 items-center bg-slate-200 dark:bg-slate-800 p-3 rounded-lg">
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
              <h3 className="text-4xl font-bold">
                {tvShow.name} ({tvShow.first_air_date?.split("-")[0]})
              </h3>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                .{tvShow.number_of_seasons} Seasons .
                {tvShow.number_of_episodes} Episodes
              </p>
              <span
                onClick={backToTvShow}
                className="text-slate-600 dark:text-slate-400 cursor-pointer hover:text-red-600 hover:dark:text-red-600 "
              >
                <i className="fa-solid fa-arrow-left"></i> Back To Main
              </span>
            </div>
          </div>

          <div className="my-8">
            <h1 className="text-4xl font-bold">Seasons <span className="text-slate-600 dark:text-slate-500">
                {tvShow?.number_of_seasons}
              </span></h1>
            <div className="grid grid-cols-1 gap-4 my-8 space-y-2">
              {tvShow.seasons?.map((ele) => {
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
                            {ele.vote_average <=0? <>
                            <i className="fa-solid fa-star"></i>
                            <p>Not Rated</p>
                            </> : <>
                            <i className="fa-solid fa-star"></i>
                            <p>{ele.vote_average?.toFixed(1)}</p>
                            </>}
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
                            goToEpisodes(ele.season_number);
                          }}
                          className="text-lg cursor-pointer hover:text-red-600"
                        >
                          <i className="fa-solid fa-arrow-right"></i> view
                          Episodes
                        </p>
                      </div>
                    </div>
                    <hr />
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
