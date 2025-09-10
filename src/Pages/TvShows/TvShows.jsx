import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTvShows } from "../../Redux/SeriesSlice.js";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/Watchix.png";
import Loading from "../../Component/Loading/Loading.jsx";
import ShowCard from "../../Component/ShowCard/ShowCard.jsx";

export default function TvShows() {
  let { type } = useParams();
  let { seriesList, loading, totalPages, currentPage, err } = useSelector(
    (d) => d.tvshows
  );
  let [page, setPage] = useState(currentPage);
  let disp = useDispatch();
  useEffect(() => {
    disp(getTvShows({ type, page: 1 }));
  }, []);
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
    disp(getTvShows({ type, page }));
  }
  function nextPage() {
    // let nexPage = page + 1;
    if (page + 1 > totalPages) {
      setPage(totalPages);
    } else if (page + 1 <= totalPages) {
      setPage(++page);
    }
    disp(getTvShows({ type, page }));
  }
  function previousPage() {
    if (page - 1 < 1) {
      setPage(1);
    } else if (page - 1 >= 1) {
      setPage(--page);
    }
    disp(getTvShows({ type, page }));
  }
  console.log(seriesList);

  useEffect(() => {
    disp(getTvShows({ type, page }));
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>tvshows : {type.split("_").join(" ")}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <section className="contain py-28">
          {/*Header*/}
          <h1 className="text-3xl">
            <i className="fa-solid fa-tv text-main"></i>{" "}
            <span className="capitalize  font-bold">
              {type.split("_").join(" ")} TvShows
            </span>
          </h1>

          {/* series */}
          <div className="my-5 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4">
            {seriesList.map((ele) => {
              return <ShowCard show={ele} type="tv" />;
            })}
          </div>

          {/* pagination */}
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
