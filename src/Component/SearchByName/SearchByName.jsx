import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../../Redux/SearchSlice.js";

export default function SearchByName({ top,setSearchToggle }) {
  const navigate = useNavigate();
  const disp = useDispatch();
  const { searchData, loading, err } = useSelector((d) => d.searchStore);
  //show search or hide
  const [searchList, setSearchList] = useState(false);
  //catch div (search )
  const searchTrack = useRef();
  const [notFound, setNotFound] = useState(null);
  //search
  const [val, setValue] = useState("");
  async function searchAll(e) {
    // getValue
    const val = e.target.value;
    //set value if change
    setValue(e.target.value);
    // open search track
    setSearchList(true);
    //getApi
    disp(getAllData({ value: val, page: 1 }));
    //close tab
    if (!val) {
      setSearchList(false);
    }
    // notfound
    if (searchData.length === 0 && val.length !== 1) {
      setNotFound(val);
    } else {
      setNotFound(null);
    }
  }
  function navigateToDetails(type, id) {
    if (type === "movie") {
      // close search track
      setSearchList(false);
      //set value in input
      setValue("");
      //navigate
      navigate(`/movie/${id}`);
    } else if (type === "tv") {
      // close search track
      setSearchList(false);
      //set value in input
      setValue("");
      //navigate
      navigate(`/tv-show/${id}`);
    }
  }
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!searchTrack?.current?.contains(e.target)) {
        setSearchList(false);
      }
    });
  }, []);

  return (
    <div ref={searchTrack}>
      {/* search input */}
      <div className="flex space-x-1">
        {/* input */}
        <div className="relative">
          <input
            onClick={() => {
              setSearchList(true);
            }}
            onChange={searchAll}
            className="p-2 w-80 text-slate-900 dark:text-slate-300 bg-transparent rounded-lg border-slate-400 dark:border-white  border focus:border-main  focus:dark:border-main focus:outline-none placeholder:text-slate-700 placeholder:dark:text-slate-400"
            type="text"
            placeholder="Search..."
            value={val}
          />
          <i
            className="fa-solid fa-magnifying-glass text-slate-700 dark:text-slate-300 absolute 
            top-[30%] left-[91%]"
          ></i>
        </div>

        {/* search btn */}
        <button
          disabled={!val}
          onClick={() => {
            navigate(`/search/${val}`);
            setValue("");
            setSearchList(false);
            setSearchToggle(false);
          }}
          className="bg-main px-2 py-0.5 rounded-lg hover:bg-main/85 duration-500 text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>
      {/* search track */}
      {searchList ? (
        <div className={`search-track top-${top}`}>
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="loader"></span>
            </div>
          ) : notFound != null ? (
            <div className="contain">
              <h3 className="text-lg my-5">
                No matching results "
                <span className="text-red-600">{notFound}</span>"
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 mt-2 gap-2">
              {searchData.map((ele, i) => {
                return (
                  <div key={ele.id}>
                    <div
                      onClick={() => {
                        navigateToDetails(ele.media_type, ele.id);
                      }}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-slate-200 hover:dark:bg-slate-900"
                    >
                      <img
                        className="w-14 rounded-md ms-1"
                        src={
                          ele.poster_path
                            ? "https://image.tmdb.org/t/p/w500/" +
                              ele.poster_path
                            : "https://image.tmdb.org/t/p/w500/" +
                              ele.profile_path
                        }
                        alt={ele?.name ? ele.name : ele.title}
                        loading="lazy"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-lg font-medium">
                          {ele?.name ? ele.name : ele.title}
                        </h3>
                        {ele?.media_type == "tv" ? (
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <i className="fa-solid fa-tv"></i> Tv Show
                          </p>
                        ) : ele?.media_type === "person" ? (
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <i className="fa-solid fa-user"></i> Actor
                          </p>
                        ) : (
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <i className="fa-solid fa-video"></i> Movie
                          </p>
                        )}
                      </div>
                    </div>
                    {searchData.length - 1 === i ? "" : <hr className="my-2" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
