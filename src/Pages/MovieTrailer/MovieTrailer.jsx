import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiKey } from "../../assets/Default/Default.js";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/Watchix.png";
import Loading from "../../Component/Loading/Loading.jsx";

export default function MovieTrailer() {
  let { id } = useParams();
  let [trailer, setTrailer] = useState({});
  let [movieDetail, setMovieDetail] = useState({});
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  async function getTrailer() {
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmUzYjlhMjkxYzQxOThlZDY3M2VjMTExNGUzNjFlNyIsIm5iZiI6MTc1MTQwOTc1OC43NDIsInN1YiI6IjY4NjQ2NDVlYTAzZmZmYzRjMmNjZGM1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P5hWPGE6zh0J59tmTpJpZQaUftGDxS38lH7fT94GrgI",
      },
    };
    setLoading(true);
    try {
      let [trailerReq, movieReq] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}&language=en-US`,
          options
        ),
      ]);
      setTrailer(
        trailerReq.data.results.find(
          (ele) => ele.type === "Trailer" && ele.site === "YouTube"
        )
      );
      setMovieDetail(movieReq.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  function backToMovie() {
    navigate(`/movie/${id}`);
  }
  useEffect(() => {
    getTrailer();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {movieDetail.title
            ? movieDetail.title + ": Trailer"
            : "Movie trailer"}
        </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
                <Loading/>

      ) : (
        <>
          <div className="contain py-28">
            <div className="flex space-x-4 items-center bg-slate-200 dark:bg-slate-800 p-4 rounded-lg">
              <img
                className="w-20 rounded-lg"
                src={
                  "https://image.tmdb.org/t/p/w500/" + movieDetail?.poster_path
                }
                alt={movieDetail?.title}
              />
              <div className="flex flex-col space-y-3">
                <h3 className="text-4xl font-bold">{movieDetail?.title}</h3>
                
                <span
                  onClick={backToMovie}
                  className="text-slate-600 dark:text-slate-400 cursor-pointer hover:text-red-600 hover:dark:text-red-600 "
                >
                  <i className="fa-solid fa-arrow-left"></i> Back To Main
                </span>
              </div>
            </div>
            <div className=" flex justify-center items-center py-10">
              {trailer? <iframe
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
              ></iframe> : <div className="">
                <h3 className="text-4xl">No Found Trailer</h3>

              </div>
              }
              
            </div>
          </div>
        </>
      )}
    </>
  );
}
