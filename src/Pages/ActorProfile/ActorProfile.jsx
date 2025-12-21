import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../../Apis/options.js";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading.jsx";
import ActingProfile from "../../Components/ActingProfile/ActingProfile.jsx";
import clsx from "clsx";
import NotFoundPage from "../../Components/NotFoundPage/NotFoundPage.jsx";

export default function ActorProfile() {
  const { id } = useParams();
  // loading
  const [isLodaing, setLoading] = useState(false);
  //profileDate
  const [profileData, setProfile] = useState({});
  //cast
  const [cast, setCast] = useState([]);
  //biography
  const [readMore, setReadMore] = useState(false);
  // moviedropdown
  const [moviesDropDown, setMoviesDroupDown] = useState(false);
  const [tvsDropDown, setTvsDroupDown] = useState(false);
  async function getProfile(personId) {
    setLoading(true);
    try {
      const [pofileReq, actingReq] = await Promise.all([
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    getProfile(id);
  }, [id]);

  if (Object.keys(profileData).length === 0 && !isLodaing) {
    return <NotFoundPage />;
  }
  if (isLodaing) {
    return <Loading />;
  }
  return (
    <>
      <section className="contain py-28">
        {/* profile data */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 items-center">
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
            <div className="flex gap-2 items-center">
              <h3 className="head-details">Known for:</h3>
              <span className="text-lg font-medium">
                {profileData?.known_for_department}
              </span>
            </div>

            {/* birthday */}
            <div className="flex gap-2 items-center">
              <h3 className="head-details"> birthday:</h3>
              <span className="text-lg font-medium">
                {profileData?.birthday?.split("-").reverse().join("-")}
              </span>
            </div>

            {/* deathday */}
            {profileData?.deathday !== null ? (
              <div className="flex gap-2 items-center">
                <h3 className="head-details"> Deathday:</h3>
                <span className="text-lg font-medium">
                  {profileData?.deathday?.split("-").reverse().join("-")}
                </span>
              </div>
            ) : (
              ""
            )}

            {/*  Place Of birth */}
            <div className="flex gap-2 items-center">
              <h3 className="head-details"> Place Of birth:</h3>
              <span className="text-lg font-medium">
                {profileData?.place_of_birth}
              </span>
            </div>

            {/* biography */}
            <div className="flex flex-col ">
              <h3 className="head-details"> biography:</h3>
              <span
                className={clsx(
                  " font-medium ",
                  readMore ? "text-sm" : "line-clamp-3 text-base"
                )}
              >
                {profileData?.biography}
              </span>
              {/* read or less more */}
              <span
                onClick={() => {
                  readMore ? setReadMore(false) : setReadMore(true);
                }}
                className="text-secondry cursor-pointer hover:opacity-70 font-medium duration-300"
              >
                {readMore ? "Less More" : "Read More"}
              </span>
            </div>
          </div>
        </div>

        {/* acting */}
        <div className="my-16">
          <h2 className="text-3xl font-semibold mb-4">
            {profileData?.known_for_department} (
            <span className="text-secondry ">{cast.length}</span>)
          </h2>
          {/* movies acting */}
          <div className="border border-gray-300  dark:border-gray-700 p-3 ">
            {/* title */}
            <div
              onClick={() => {
                moviesDropDown
                  ? setMoviesDroupDown(false)
                  : setMoviesDroupDown(true);
              }}
              className="flex justify-between items-center cursor-pointer dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold">
                Movies (
                <span className="text-secondry">
                  {cast.filter((ele) => ele.media_type === "movie").length}
                </span>
                )
              </h3>
              <i className="fa-solid fa-chevron-down"></i>
            </div>

            {/* data */}
            {moviesDropDown ? (
              <div className="grid grid-cols-1 gap-5 my-5">
                {cast
                  .filter((ele) => ele.media_type === "movie")
                  .map((ele, i) => {
                    return (
                      <div key={ele.id}>
                        <ActingProfile show={ele} />
                        {i <
                        cast.filter((ele) => ele.media_type === "movie")
                          .length -
                          1 ? (
                          <hr className="my-3" />
                        ) : (
                          ""
                        )}{" "}
                      </div>
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
                tvsDropDown ? setTvsDroupDown(false) : setTvsDroupDown(true);
              }}
              className="flex justify-between items-center cursor-pointer dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold">
                Tv-Shows (
                <span className="text-secondry">
                  {cast.filter((ele) => ele.media_type === "tv").length}
                </span>
                )
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
                      <div key={ele.id}>
                        <ActingProfile show={ele} />
                        {i <
                        cast.filter((ele) => ele.media_type === "tv").length -
                          1 ? (
                          <hr />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
}
