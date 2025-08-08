import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiKey } from "../../assets/Default/Default.js";
import logo from "../../assets/images/Watchix.png";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getTvShow } from "../../Redux/TvShowDetails.js";

export default function TvShowDetails() {
  let { type, id } = useParams();
  let { tvShow, loading, cast, recomindations } = useSelector((d) => d.tvShow);
  let disp = useDispatch();
  function getRecommend(tvShowId) {
    disp(getTvShow(tvShowId));
  }
  //slider
  let settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    disp(getTvShow(id));
  }, []);
  console.log(tvShow);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{tvShow.name ? tvShow.name : "TvShow Details"}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <div className="loading flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-slate-950 z-50">
          <img className="loader w-20" src={logo} alt="" />
        </div>
      ) : (
        <div className="contain my-28">
          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-1 gap-5">
            <div className="xl:col-span-1 lg:col-span-2 md:col-span-2 relative">
              <img
                className="w-full rounded-lg"
                src={"https://image.tmdb.org/t/p/w500/" + tvShow?.poster_path}
                alt={tvShow.name}
              />
              <div
                className={
                  tvShow.vote_average >= 7
                    ? `absolute top-2 right-2 bg-green-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                    : tvShow.vote_average >= 5
                    ? `absolute top-2 right-2 bg-yellow-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                    : `absolute top-2 right-2 bg-red-500 
                  px-3 py-.5 rounded-xl text-white flex space-x-1 items-center`
                }
              >
                {tvShow.vote_average == 0 ? (
                  ""
                ) : (
                  <>
                    <i className="fa-solid fa-star"></i>
                    <p>{tvShow.vote_average?.toFixed(1)}</p>
                  </>
                )}
              </div>
            </div>
            <div className="xl:col-span-3  lg:col-span-4 md:col-span-3 space-y-3 mt-2">
              <h1 className="text-4xl font-bold">
                {tvShow.name}({tvShow.first_air_date?.split("-")[0]})
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-500">
                Tv-show . {tvShow.first_air_date?.split("-")[0]}-
                {tvShow.last_air_date?.split("-")[0]} .{" "}
                {tvShow.number_of_seasons} Seasons . {tvShow.number_of_episodes}{" "}
                Episodes
              </p>
              <h3 className="text-3xl font-bold font-serif">Overview</h3>
              <p className=" text-slate-600 dark:text-slate-500">
                {tvShow.overview}
              </p>
              <h3 className="text-3xl font-bold font-serif">Geners</h3>
              <div className="flex space-x-3">
                {tvShow.genres?.map((ele) => {
                  return (
                    <div
                      key={ele.id}
                      className="border border-solid border-red-600 text-red-600 px-3 py-1 rounded-lg"
                    >
                      <p>{ele.name.split("&")[0]}</p>
                    </div>
                  );
                })}
              </div>
              {tvShow.created_by.length > 0 ? (
                <>
                  <h3 className="text-3xl font-bold font-serif">Creators</h3>
                  <div className="flex space-x-4">
                    {tvShow.created_by?.map((ele) => {
                      return (
                        <div key={ele.id} className="flex flex-col space-y-1">
                          <h3 className="font-bold">{ele.name}</h3>
                          <h3 className="text-slate-500">Creator</h3>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                ""
              )}
              <Link
                to={"/tv-show/" + id + "/seasons"}
                className="cursor-pointer text-white bg-red-600 hover:bg-red-700 transition-all duration-[.5s] rounded-full px-3 py-2 inline-block"
              >
                <p>View Seasons</p>
              </Link>
            </div>
          </div>
          {cast.length == 0 ? (
            ""
          ) : (
            <div className="my-9">
              <h1 className="text-4xl text-main font-serif">All Cast</h1>
              <div className="w-[95%] mx-auto my-3">
                <Slider className=" p-3" {...settings}>
                  {cast
                    ?.filter((ele) => ele.profile_path)
                    .map((ele) => {
                      return (
                        <div className="rounded-lg shadow-lg pl-2 h-full">
                          <img
                            className="w-full rounded-t-lg"
                            src={
                              "https://image.tmdb.org/t/p/w500/" +
                              ele?.profile_path
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
                      );
                    })}
                </Slider>
              </div>
            </div>
          )}

          {recomindations.length == 0 ? (
            ""
          ) : (
            <div className="my-8">
              <h1 className="text-4xl text-main font-serif">Recommendations</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 w-[95%] mx-auto">
                {recomindations?.map((ele) => {
                  return (
                    <Link
                      onClick={() => {
                        getRecommend(ele.id);
                      }}
                      to={`/tv-shows/${type}/${ele.id}`}
                      key={ele.id}
                      className="relative shadow-xl bg-slate-50 dark:bg-slate-800 text-center cursor-pointer rounded-lg overflow-hidden"
                    >
                      <img
                        className="w-full rounded-t-lg hover:scale-[1.03] transition-all duration-[1s]"
                        src={
                          "https://image.tmdb.org/t/p/w500/" + ele.poster_path
                        }
                        alt={ele.name}
                        loading="lazy"
                      />
                      <div className=" p-3">
                        <h3 className="font-bold">
                          {ele.name} ({ele.first_air_date?.split("-")[0]})
                        </h3>
                      </div>
                      <div
                        className={
                          ele.vote_average >= 7
                            ? `absolute top-2 right-2 bg-green-500 
                                px-3 py-.5 rounded-xl text-white`
                            : ele.vote_average >= 5
                            ? `absolute top-2 right-2 bg-yellow-500 
                                px-3 py-.5 rounded-xl text-white`
                            : `absolute top-2 right-2 bg-red-500 
                                px-3 py-.5 rounded-xl text-white`
                        }
                      >
                        <p>
                          <i className="fa-solid fa-star"></i>
                          {ele.vote_average?.toFixed(1)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
