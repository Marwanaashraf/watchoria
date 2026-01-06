import React, { useEffect, useState } from "react";
import NotData from "../../Components/NotData/NotData.jsx";
import { Film } from "lucide-react";
import Loading from "../../Components/ui/Loading/Loading.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTvTrailer } from "../../Apis/Series/getTrailer.js";
import { getTvShow } from "../../Redux/TvShowDetails.js";
import { Helmet } from "react-helmet";

export default function TvShowTrailer() {
  const { id } = useParams();
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const disp = useDispatch();
  const navigate = useNavigate();
  //get tvShow data and trailer
  const { tvShow, loading } = useSelector((state) => state.tvShow);
  const getData = async () => {
    setLoading(true);
    const data = await getTvTrailer(id);
    setTrailer(data);
    setLoading(false);
  };
  useEffect(() => {
    disp(getTvShow(id));
  }, [id]);
  useEffect(() => {
    getData();
  }, []);
  if (loading && isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {tvShow.title ? tvShow.title + ": Trailer" : "Tvshow trailer"}
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <>
        <div className="contain py-28">
          {/* movie data */}
          <div className="flex space-x-4 items-center bg-slate-200 dark:bg-slate-800 p-4 rounded-lg">
            <img
              className="w-20 rounded-lg"
              src={"https://image.tmdb.org/t/p/w500/" + tvShow?.poster_path}
              alt={tvShow?.name}
            />
            <div className="flex flex-col space-y-3">
              <h3 className="text-xl md:text-2xl font-bold line-clamp-2">
                {tvShow?.name}
              </h3>

              <span
                onClick={() => {
                  navigate(`/tvShow/${id}`);
                }}
                className="text-slate-600 dark:text-slate-400 cursor-pointer hover:text-red-600 hover:dark:text-red-600 "
              >
                <i className="fa-solid fa-arrow-left"></i> Back To Main
              </span>
            </div>
          </div>

          {/* trailer */}
          <div className=" flex justify-center items-center py-10">
            {trailer && !isLoading ? (
              <iframe
                className="aspect-video "
                src={
                  trailer?.key
                    ? `https://www.youtube.com/embed/${trailer?.key}`
                    : ""
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <NotData
                icon={
                  <Film className="w-16 h-16  text-gray-300 dark:text-gray-800" />
                }
                header="Trailer Not Found"
                details="Trailer data not available now."
              />
            )}
          </div>
        </div>
      </>
    </>
  );
}
