import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../Redux/MovieSlice.js";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/images/Watchix.png";
export default function Movies() {
  let { type } = useParams();
  //from redux
  let { movieList, loading, totalPages, currentPage } = useSelector(
    (d) => d.movies
  );
  //currentpage
  let [page, setPage] = useState(currentPage);
  let disp = useDispatch();
  //All pages
  let pagesList = [];
  for (let i = 0; i <= totalPages; i++) {
    pagesList.push(i);
  }
  let diplayedPages = [];
  let pages = currentPage + 5;
  diplayedPages = pagesList.slice(currentPage, pages);
  function getPage(page) {
    setPage(page);
    disp(getAllMovies({ type, page }));
  }
  function nextPage() {
    // let nexPage = page + 1;
    if (page + 1 > totalPages) {
      setPage(totalPages);
    } else if (page + 1 <= totalPages) {
      setPage(++page);
    }
    disp(getAllMovies({ type, page }));
  }
  function previousPage() {
    if (page - 1 < 1) {
      setPage(1);
    } else if (page - 1 >= 1) {
      setPage(--page);
    }
    disp(getAllMovies({ type, page }));
  }
  useEffect(() => {
    disp(getAllMovies({ type, page }));
  }, []);
  console.log(movieList);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Moives : {type.split("_").join(" ")}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <div className="loading flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 bg-slate-950 z-50">
          <img className="loader w-20" src={logo} alt="" />
        </div>
      ) : (
        <section className="contain py-28">
          <h1 className="text-3xl">
            <i className="fa-solid fa-video text-main"></i>{" "}
            <span className="capitalize  font-bold ">
              {type.split("_").join(" ")} Movies
            </span>
          </h1>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4   md:grid-cols-3 gap-4">
            {movieList.map((ele) => {
              return ele.poster_path != null ? (
                <Link
                  to={`/movies/${type}/${ele.id}`}
                  key={ele.id}
                  className="relative shadow-xl bg-slate-50 dark:bg-slate-800 text-center cursor-pointer rounded-lg overflow-hidden"
                >
                  <img
                    className="w-full rounded-t-lg hover:scale-[1.03] transition-all duration-[1s]"
                    src={"https://image.tmdb.org/t/p/w500/" + ele.poster_path}
                    alt={ele.title}
                    loading="lazy"
                  />
                  <div className=" p-3">
                    <h3 className="font-bold">{ele.title}</h3>
                    <p className="line-clamp-3 text-slate-500 dark:text-slate-400">
                      {ele.overview}
                    </p>
                  </div>
                  <div
                    className={
                      ele.vote_average >= 7
                        ? `absolute top-2 right-2 bg-green-500 
                  px-3 py-.5 rounded-xl text-white`
                        : ele.vote_average >= 5
                        ? `absolute top-2 right-2 bg-yellow-500 
                  px-3 py-.5 rounded-xl text-white`
                        : ele.vote_average < 5 && ele.vote_average != 0
                        ? `absolute top-2 right-2 bg-red-500 
                  px-3 py-.5 rounded-xl text-white`
                        : ""
                    }
                  >
                      {ele.vote_average <= 0 ? "" :  <p>
                      <i className="fa-solid fa-star"></i>
                      {ele.vote_average?.toFixed(1)}
                    </p>}
                   
                  </div>
                </Link>
              ) : (
                ""
              );
            })}
          </div>
          <div className="pagination my-8 text-center flex space-x-4 justify-center">
            <button
              disabled={currentPage == 1 ? true : false}
              onClick={previousPage}
              className="previous dark:bg-slate-700 bg-slate-200 
              shadow-xlg p-2 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-default disabled:dark:opacity-40"
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <div className="pages space-x-2 flex">
              {diplayedPages.map((ele) => {
                return (
                  <h3
                    onClick={() => {
                      getPage(ele);
                    }}
                    className={
                      ele == currentPage
                        ? " bg-red-600 text-white rounded-lg shadow-xlg   px-4 py-2 cursor-pointer"
                        : "dark:bg-slate-600 rounded-lg bg-slate-200 shadow-xlg  px-4 py-2 cursor-pointer"
                    }
                  >
                    {ele}
                  </h3>
                );
              })}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage == totalPages ? true : false}
              className="Next  dark:bg-slate-700 bg-slate-200 
              shadow-xlg p-2 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-default disabled:dark:opacity-40"
            >
              <h3 className="">
                <i className="fa-solid fa-angle-right"></i>
              </h3>
            </button>
          </div>
        </section>
      )}
    </>
  );
}
