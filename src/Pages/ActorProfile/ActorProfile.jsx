import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { options } from "../../Apis/options.js";
import { useParams } from "react-router-dom";
import Loading from "../../Component/Loading/Loading.jsx";
import ActingProfile from "../../Component/ActingProfile/ActingProfile.jsx";

export default function ActorProfile() {
  let { id } = useParams();
  // loading
  let [isLodaing, setLoading] = useState(false);
  //profileDate
  let [profileData, setProfile] = useState({});
  //cast
  let [cast, setCast] = useState([]);
  let [crew, setCrew] = useState([]);
  //biography
  let [readMore, setReadMore] = useState(false);
  // moviedropdown
  let [moviesDropDown, setMoviesDroupDown] = useState(false);
  let [tvsDropDown, setTvsDroupDown] = useState(false);
  async function getProfile(personId) {
    setLoading(true);
    try {
      let [pofileReq, actingReq] = await Promise.all([
        axios(
          `https://api.themoviedb.org/3/person/${personId}?language=en-US`,
          options
        ),
        axios(
          `https://api.themoviedb.org/3/person/${personId}/combined_credits?language=en-US`,
          options
        ),
      ]);
      setProfile(pofileReq.data);
      setCast(actingReq.data.cast.filter((ele) => ele.poster_path));
      setCrew(actingReq.data.crew);
      console.log(actingReq.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  function setBiography() {
    let biography = document.querySelector(".biography");
    if (readMore) {
      setReadMore(false);
      biography.classList.add("line-clamp-3");
    } else {
      setReadMore(true);
      biography.classList.remove("line-clamp-3");
    }
  }
  console.log(cast.filter((ele) => ele.media_type === "tv"));
  function toggleDropDown(type) {
    if (type === "movie") {
      if (moviesDropDown) {
        setMoviesDroupDown(false);
      } else {
        setMoviesDroupDown(true);
      }
    } else if (type === "tv") {
      if (tvsDropDown) {
        setTvsDroupDown(false);
      } else {
        setTvsDroupDown(true);
      }
    }
  }
  useEffect(() => {
    getProfile(id);
  }, []);
  return (
    <>
      {isLodaing ? (
        <Loading />
      ) : (
        <section className="contain py-28">
          {/* profile data */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {/* person Image */}
            <div className="sm:col-span-1 ">
              <img
                className="w-full rounded-lg"
                src={`https://image.tmdb.org/t/p/w500/${profileData?.profile_path}`}
                alt={profileData?.name}
              />
            </div>

            {/* person details */}
            <div className="lg:col-span-4 md:col-span-3 sm:col-span-2 space-y-3">
              {/* person name */}
              <h1 className="text-3xl uppercase font-bold">
                {profileData?.name}
              </h1>

              {/* department */}
              <h3
                className="text-2xl font-bold text-gray-600 
                dark:text-gray-500 capitalize"
              >
                Known for:{" "}
                <span className="text-lg text-black dark:text-slate-300 font-medium">
                  {profileData?.known_for_department}
                </span>
              </h3>

              {/* birthday*/}
              <h3
                className="text-2xl font-bold text-gray-600 
                dark:text-gray-500 capitalize"
              >
                birthday:{" "}
                <span className="text-lg text-black dark:text-slate-300 font-medium">
                  {profileData?.birthday?.split("-").reverse().join("-")}
                </span>
              </h3>

              {/* deathday */}
              {profileData?.deathday !== null ? (
                <h3
                  className="text-2xl font-bold text-gray-600 
                dark:text-gray-500"
                >
                  BirthDate:{" "}
                  <span className="text-lg text-black dark:text-slate-300 font-medium">
                    {profileData?.deathday?.split("-").reverse().join("-")}
                  </span>
                </h3>
              ) : (
                ""
              )}

              {/*  Place Of birth */}
              <h3
                className="text-2xl font-bold text-gray-600 
                dark:text-gray-500 capitalize"
              >
                Place Of birth:{" "}
                <span className="text-lg text-black dark:text-slate-300 font-medium">
                  {profileData?.place_of_birth}
                </span>
              </h3>

              {/* biography */}
              <h3
                className="text-2xl font-bold text-gray-600 
                dark:text-gray-500 capitalize"
              >
                biography:{" "}
                <span className="biography text-base text-black dark:text-slate-300 font-medium line-clamp-3">
                  {profileData?.biography}
                </span>{" "}
                <span
                  onClick={setBiography}
                  className="text-main text-lg cursor-pointer hover:text-red-700 font-medium"
                >
                  {readMore ? "Less More" : "Read More"}
                </span>
              </h3>
            </div>
          </div>

          {/* acting */}
          <div className="my-10">
            <h2 className="text-3xl font-semibold mb-2">
              Actor (<span className="text-slate-500 ">{cast.length}</span>)
            </h2>
            <hr />
            {/* movies acting */}
            <div className="border border-gray-300  dark:border-gray-700 p-3 ">
              {/* title */}
              <div
                onClick={() => {
                  toggleDropDown("movie");
                }}
                className="flex justify-between items-center cursor-pointer dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold">
                  Movies{" "}
                  <span className="text-slate-500">
                    ({cast.filter((ele) => ele.media_type === "movie").length})
                  </span>
                </h3>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              {/* data */}
              {moviesDropDown ? (
                <div className="grid grid-cols-1 gap-5 my-5">
                  {cast
                    .filter((ele) => ele.media_type === "movie")
                    .map((ele,i) => {
                      return (
                        <>
                          <ActingProfile show={ele} />
                          {i <
                          cast.filter((ele) => ele.media_type === "movie").length -
                            1 ? (
                            <hr />
                          ) : (
                            ""
                          )}{" "}
                        </>
                      );
                    })}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* tvshows acting */}
            <div className="border border-gray-300  dark:border-gray-700 p-3 ">
              {/* title */}
              <div
                onClick={() => {
                  toggleDropDown("tv");
                }}
                className="flex justify-between items-center cursor-pointer dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold">
                  Tv-Shows{" "}
                  <span className="text-slate-500">
                    ({cast.filter((ele) => ele.media_type === "tv").length})
                  </span>
                </h3>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
              {/* data */}
              {tvsDropDown ? (
                <div className="grid grid-cols-1 gap-5 my-5">
                  {cast
                    .filter((ele) => ele.media_type === "tv")
                    .map((ele, i) => {
                      return (
                        <>
                          <ActingProfile show={ele} />
                          {i <
                          cast.filter((ele) => ele.media_type === "tv").length -
                            1 ? (
                            <hr />
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
