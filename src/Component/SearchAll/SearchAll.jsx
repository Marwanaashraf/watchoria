import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../Redux/SearchSlice.js";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
export default function SearchAll() {
  let { searchData, loading, err } = useSelector((d) => d.searchStore);
  let [notFound, setNotFound] = useState(null);
  let disp = useDispatch();
  let navigate = useNavigate();
  //search
  async function searchMulti(e) {
    let val = e.target.value;
    //open tap
    if (val != " ") {
      $(".searchData").removeClass("hidden");
    }
    //close tab
    if (!val) {
      $(".searchData").addClass("hidden");
    }
    if (searchData == 0 && val.length != 1) {
      setNotFound(val);
    } else {
      setNotFound(null);
    }
    //api
    disp(getAllData(val));
  }
  function closeSearch() {
    searchData = [];
    navigate("/");
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-slate-200 dark:bg-slate-900 overflow-y-auto scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-red-600 dark:scrollbar-track-slate-700">
      <div className="h-[100vh] relative">
        <div
          onClick={closeSearch}
          className="absolute top-3 right-3 hover:text-red-600 cursor-pointer"
        >
          <i className="fa-solid fa-x text-xl"></i>
        </div>
        <div className="py-20 contain h-full">
          <div className="relative">
            <input
              onChange={searchMulti}
              className="search-small p-3 pl-11 w-full text-3xl text-slate-700 dark:text-slate-400 bg-transparent border-b-slate-400  dark:border-b-white border-b-solid border-b placeholder:text-slate-700 placeholder:dark:text-slate-400 focus:outline-none"
              type="text"
              placeholder="Search..."
              // value={val}
            />
            {loading ? (
              <i
                className="fa-solid fa-circle-notch text-red-600 fa-spin absolute 
            top-1/4 left-0 text-3xl"
              ></i>
            ) : (
              <i
                className="fa-solid fa-magnifying-glass text-slate-700 dark:text-slate-400 absolute 
            top-1/4 left-0 text-3xl"
              ></i>
            )}
          </div>
          {notFound != null? (
            <div>
              <h3 className="text-3xl my-8">
                Not Found "<span className="text-red-600">{notFound}</span>"
              </h3>
            </div>
          ) : (
            <div className="searchData grid grid-cols-2 md:grid-cols-4 gap-5 my-8">
              {searchData.map((ele) => {
                return (
                  <Link
                    to={
                      ele.media_type == "movie"
                        ? `/movie/` + ele.id
                        : ele.media_type == "tv"
                        ? `/tv-show/` + ele.id
                        : ""
                    }
                    key={ele.id}
                    className="relative shadow-xl bg-slate-50 dark:bg-slate-800 text-center cursor-pointer rounded-lg overflow-hidden"
                  >
                    <img
                      className="w-full rounded-t-lg hover:scale-[1.03] transition-all duration-[1s]"
                      src={"https://image.tmdb.org/t/p/w500/" + ele.poster_path}
                      alt={ele.title}
                      loading="lazy"
                    />
                    <div className=" p-2">
                      <h3 className="text-lg font-medium">
                        {ele?.name ? ele.name : ele.title}
                      </h3>
                      {ele?.media_type == "tv" ? (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <i className="fa-solid fa-tv"></i> Tv Show
                        </p>
                      ) : (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <i className="fa-solid fa-video"></i> Movie
                        </p>
                      )}
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
          )}
        </div>
      </div>
    </div>
  );
}
