import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWatchList } from "../../Redux/WatchlistSlice.js";
import Loading from "../../Components/Loading/Loading.jsx";
import { ChevronDown, Search, SearchIcon, User, X } from "lucide-react";
import noData from "../../assets/images/activities.svg";
import { Helmet } from "react-helmet";
import WatchlistCard from "../../Components/WatchlistCard/WatchlistCard.jsx";
import clsx from "clsx";
export default function Watchlist() {
  const disp = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { watchList, watchListLoading } = useSelector(
    (state) => state.watchList
  );
  //deep copy from watchlist
  const [originalList, setOrignalList] = useState([]);
  const [displayedList, setDisplayed] = useState([]);

  const [val, setVal] = useState("");
  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    if (val.trim() === "") {
      setVal(val);
      setDisplayed(originalList);
      return;
    }
    const filterdWatchList = originalList.filter((ele) =>
      ele.title?.toLowerCase().includes(val)
    );
    setDisplayed(filterdWatchList);
    setVal(val);
  };

  const sortList = [
    "List Order",
    "Top Rating",
    "Low Rating",
    "Relase Date: New",
    "Relase Date: Old",
  ];
  const [sort, setSort] = useState(0);
  const [sortDropDown, setDropDown] = useState(false);

  useEffect(() => {
    if (!watchList?.length) return;
    if (sort === 0) {
      setDisplayed([...watchList]);
      setOrignalList([...watchList]);
    } else if (sort === 1) {
      setDisplayed((prev) =>
        [...prev].sort((a, b) => b.rating_vote - a.rating_vote)
      );
      setOrignalList((prev) =>
        [...prev].sort((a, b) => b.rating_vote - a.rating_vote)
      );
    } else if (sort === 2) {
      setDisplayed((prev) =>
        [...prev].sort((a, b) => a.rating_vote - b.rating_vote)
      );
      setOrignalList((prev) =>
        [...prev].sort((a, b) => a.rating_vote - b.rating_vote)
      );
    } else if (sort === 3) {
      setDisplayed((prev) =>
        [...prev].sort(
          (a, b) =>
            new Date(b.release_date)?.getFullYear() -
            new Date(a.release_date)?.getFullYear()
        )
      );
    } else {
      setDisplayed((prev) =>
        [...prev].sort(
          (a, b) =>
            new Date(a.release_date)?.getFullYear() -
            new Date(b.release_date)?.getFullYear()
        )
      );
      setOrignalList((prev) =>
        [...prev].sort(
          (a, b) =>
            new Date(a.release_date)?.getFullYear() -
            new Date(b.release_date)?.getFullYear()
        )
      );
    }
  }, [sort, watchList]);
  useEffect(() => {
    disp(getWatchList());
  }, []);
  useEffect(() => {
    if (watchList?.length > 0) {
      const listCopy = [...watchList];
      setOrignalList(listCopy);
      setDisplayed(listCopy);
    }
  }, [watchList]);
  const searchBtn = useRef(undefined);

  if (watchListLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Watchoria | Watchlist</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <section className="py-28 contain">
        {/* header */}
        <div className="dark:bg-slate-800 bg-slate-200 w-full p-5 rounded-lg space-y-2">
          {/*header  */}
          <h1 className="text-3xl font-bold">Your WatchList</h1>
          <div className="flex gap-2 items-center">
            <div className="bg-secondry size-10 flex items-center justify-center text-lg font-bold rounded-full text-white">
              {userData ? (
                <span className="uppercase">
                  {userData?.userName?.slice(0, 1)}
                </span>
              ) : (
                <User className="w-6 h-6 " />
              )}
            </div>
            <h4 className="text-lg">
              {userData ? userData.email : "example@gmail.com"}
            </h4>
          </div>
          <p className="text-sm sm:text-base">
            Your Watchlist is the place to track the titles you want to watch,
            You can sort your Watchlist rating or release date and arrange your
            titles in the order you want to see them.
          </p>
        </div>

        {/* filter */}
        <div
          className={
            userData
              ? "md:flex justify-between items-center gap-2 my-8"
              : "hidden"
          }
        >
          {/* filterization */}
          <div className="flex items-center gap-3">
            {/* titles */}
            <h3 className="text-lg  text-gray-700 dark:text-gray-400">
              {displayedList?.length} Titles
            </h3>

            {/* sorting */}
            <div className="relative">
              {/* sort btn */}
              <div
                onClick={() => {
                  sortDropDown ? setDropDown(false) : setDropDown(true);
                }}
                className="flex gap-2 items-center"
              >
                <span className="text-lg">Sort By</span>
                <div
                  className={clsx(
                    "flex items-center gap-1 rounded-lg p-3 h-9 cursor-pointer text-secondry",
                    sortDropDown
                      ? "bg-secondry/20 dark:bg-secondry/35"
                      : "bg-secondry/15 dark:bg-secondry/25  hover:bg-secondry/20 hover:dark:bg-secondry/35 "
                  )}
                >
                  <span>{sortList[sort]}</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              {/* sorting list */}
              {sortDropDown ? (
                <div className="absolute top-10 left-16  bg-slate-200 dark:bg-slate-700 w-40 h-48 rounded-lg p-1 z-20 flex flex-col gap-y-1">
                  {sortList.map((item, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setDropDown(false);
                          setSort(i);
                        }}
                        className={clsx(
                          "cursor-pointer rounded-lg p-1",
                          sort === i
                            ? "bg-secondry/80 text-white"
                            : "hover:bg-secondry/80 duration-300 hover:text-white"
                        )}
                      >
                        <span>{item}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* search */}
          <div className="relative my-2 md:my-0 ">
            <input
              value={val}
              onChange={handleSearch}
              type="text"
              placeholder="search in watchlist.."
              className="form-input bg-transparent border-slate-300 dark:border-slate-600 focus:border-secondry focus:dark:border-secondry"
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            {val.length > 0 ? (
              <div
                onClick={() => {
                  setDisplayed(originalList);
                  setVal("");
                }}
                className="absolute top-1/2 -translate-y-1/2 right-1 text-gray-400 cursor-pointer hover:text-secondry"
              >
                <X className="w-5 h-5" />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* data */}
        <div className="border border-gray-300 dark:border-gray-800 rounded-lg p-3 shadow-sm my-4">
          {displayedList?.length > 0 && watchListLoading === false ? (
            <div className="grid grid-cols-1 gap-2">
              {displayedList?.map((item, i) => {
                return (
                  <div key={item.id}>
                    <WatchlistCard
                      setDisplayed={setDisplayed}
                      setVal={setVal}
                      show={item}
                      index={i}
                      displayedList={displayedList}
                      setSort={setSort}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center p-16 text-gray-500 dark:text-gray-400  text-lg gap-1.5">
              <img className="w-36" src={noData} alt="no data" />
              <p>Watchlist is empty</p>
              <p>
                {userData
                  ? "No results found for movies or TV shows. "
                  : "Please login first to add show in watchlist."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
