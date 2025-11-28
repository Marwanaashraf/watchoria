import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getTvShow } from "../../Redux/TvShowDetails.js";
import Loading from "../../Component/Loading/Loading.jsx";
import Cast from "../../Component/Cast/Cast.jsx";
import Recomindations from "../../Component/Recomindations/Recomindations.jsx";
import NotFoundPage from "../../Component/NotFoundPage/NotFoundPage.jsx";
import StaticImage from "../../Component/StaticImage/StaticImage.jsx";
export default function TvShowDetails() {
  let { type, id } = useParams();
  let { tvShow, loading, cast, recomindations } = useSelector((d) => d.tvShow);
  let disp = useDispatch();
  useEffect(() => {
    disp(getTvShow(id));
  }, []);
  if (Object.keys(tvShow).length === 0 && !loading) {
    return <NotFoundPage />;
  }
  console.log(tvShow);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{tvShow.name ? tvShow.name : "TvShow Details"}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className="contain my-28">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-5">
            {/* image */}
            <div className="lg:col-span-1 md:col-span-2 relative">
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
            <div className="lg:col-span-3 md:col-span-3 mt-5 space-y-5">
              {/* head */}
              <h1 className="text-4xl font-bold uppercase">{tvShow.name}</h1>

              {/* year, seasons , Episodes */}
              <div className="flex space-x-2 text-base text-slate-600 dark:text-slate-400">
                <span>
                  {new Date(tvShow.first_air_date)?.getFullYear()}
                  {new Date(tvShow.first_air_date)?.getFullYear() ===
                  new Date(tvShow.last_air_date)?.getFullYear()
                    ? ""
                    : "-" + new Date(tvShow.last_air_date)?.getFullYear()}
                </span>

                <span>
                  {tvShow.number_of_seasons === 1
                    ? tvShow.number_of_seasons + " Season"
                    : tvShow.number_of_seasons + " Seasons"}
                </span>
                <span>{tvShow.number_of_episodes} Episodes</span>
              </div>

              {/* Genres */}
              <div className="flex space-x-3">
                {tvShow.genres.map((ele) => {
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
                  {!tvShow.created_by[0]?.name
                    ? "UnKnown"
                    : tvShow.created_by[0]?.name}
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
                  {cast.slice(0, 3).map((ele, i) => {
                    return (
                      <span
                        key={ele.name}
                        className=" text-lg text-black dark:text-white font-medium"
                      >
                        {ele.name} {i < cast.slice(0, 3).length - 1 ? ", " : ""}
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
                  {tvShow.overview}
                </span>
              </h3>

              {/* View Seasons */}
              <Link
                to={"/tv-show/" + id + "/seasons"}
                className="cursor-pointer text-white bg-red-600 hover:bg-red-700 transition-all duration-700 rounded-full px-3 py-2 inline-block"
              >
                <p>View Seasons</p>
              </Link>
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
                <Recomindations recomindations={recomindations} type="tv" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
