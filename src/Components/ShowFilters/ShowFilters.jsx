import ShowCard from "../ShowCard/ShowCard.jsx";
import DropDown from "../ui/DropDown/DropDown.jsx";
import { Film, Loader } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getTvFilters } from "../../Apis/Series/getTvFilters.js";
import { useSearchParams } from "react-router-dom";
import { getMoviesFilters } from "../../Apis/Movies/getMoviesFilters.js";
import Loading from "../ui/Loading/Loading.jsx";
import Pagination from "../ui/Pagination/Pagination.jsx";
import { getTvGenres } from "../../Apis/Series/getGenres.js";
import { getMoviesGenres } from "../../Apis/Movies/getGenres.js";

const years = Array.from(
  { length: new Date().getFullYear() - 1939 },
  (_, i) => ({ apiName: String(new Date().getFullYear() - i) }),
);

const ratingList = [
  { apiName: "9", name: "+ 9" },
  { apiName: "8", name: "+ 8" },
  { apiName: "7", name: "+ 7" },
  { apiName: "6", name: "+ 6" },
  { apiName: "5", name: "+ 5" },
  { apiName: "4", name: "+ 4" },
  { apiName: "3", name: "+ 3" },
  { apiName: "2", name: "+ 2" },
  { apiName: "1", name: "+ 1" },
];

const sortOptions = [
  { name: "Popularity Descending", apiName: "popularity.desc" },
  { name: "Popularity Ascending", apiName: "popularity.asc" },
  { name: "Rating Descending", apiName: "vote_average.desc" },
  { name: "Rating Ascending", apiName: "vote_average.asc" },
];

export default function ShowFilters({ type }) {
  //>>>>DropDowns
  const [yearDropDown, setYearDropDown] = useState(false);
  const [ratingDropDown, setRatingDropDown] = useState(false);
  const [sortDropDown, setSortDropDown] = useState(false);

  // filterLoading
  const [isFilterLoading, setFilterLoading] = useState(false);

  //>>>> params
  // searchParams
  const [searchParams, setSearchParams] = useSearchParams();

  // years
  const [yearParams, setYearParams] = useState(
    searchParams.get("year") || "",
  );

  // rating
  const [ratingParams, setRatingParams] = useState(
    searchParams.get("rating") || "",
  );

  // sortong
  const [sortingParams, setSortingParams] = useState(
    searchParams.get("sorting") || "",
  );
  // genreList
  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.getAll("genres") || [],
  );

  //   getGenres
  const getGenres = async () => {
    let data;
    if (type === "movie") {
      data = await getMoviesGenres();
      if (data) {
        setGenreList(data);
      }
    } else {
      data = await getTvGenres();
      if (data) {
        setGenreList(data);
      }
    }
  };

  // get Shows => first req and change page
  const [isLoading, setLoading] = useState(false);
  const [showList, setShowList] = useState([]);
  const getShows = async () => {
    setLoading(true);
    let data;
    if (type === "movie") {
      data = await getMoviesFilters(
        ratingParams,
        sortingParams,
        selectedGenre,
        yearParams,
        page,
      );
    } else {
      data = await getTvFilters(
        ratingParams,
        sortingParams,
        selectedGenre,
        yearParams,
        page,
      );
    }
    setLoading(false);
    if (data) {
      // set shows
      setTotalPages(data.total_pages);
      setShowList(data.results);
    }
  };

  // filter shows
  const handleFilters = async () => {
    let data;
    setPage(1);
    setFilterLoading(true);
    if (type === "movie") {
      data = await getMoviesFilters(
        ratingParams,
        sortingParams,
        selectedGenre,
        yearParams,
      );
    } else {
      data = await getTvFilters(
        ratingParams,
        sortingParams,
        selectedGenre,
        yearParams,
      );
    }
    setFilterLoading(false);
    if (data) {
      setSearchParams({
        page: 1,
        genres: selectedGenre,
        year: yearParams,
        sorting: sortingParams,
        rating: ratingParams,
      });
      // close dropdowns
      setSortDropDown(false);
      setYearDropDown(false);
      setRatingDropDown(false);
      // set shows
      setTotalPages(data.total_pages);
      setShowList(data.results);
    }
  };

  //   handle genres
  const handleGenres = (id) => {
    // deep copy orignal genreslist
    let GenresCopy = [...selectedGenre];
    // check id in array or not
    if (GenresCopy?.find((item) => item == id)) {
      GenresCopy = GenresCopy.filter((item) => item != id);
    } else {
      GenresCopy.push(id);
    }
    setSelectedGenre(GenresCopy);
  };

  //>>>> pagination
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  //All pages
  let pagesList = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesList.push(i);
  }
  function handlePagination(newPage) {
    setSearchParams({
      page: newPage,
      genres: selectedGenre,
      year: yearParams,
      sorting: sortingParams,
      rating: ratingParams,
    });
    setPage(newPage);
  }

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    getShows();
  }, [page]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* filterization and shows */}
      <div className="block md:grid md:grid-cols-5 lg:grid-cols-4 gap-5">
        {/* filterization */}
        <div className="md:col-span-2 lg:col-span-1 bg-slate-200 dark:bg-slate-900 p-3 space-y-4 rounded-lg my-5 h-fit">
          {/* header */}
          <h3 className="text-2xl font-semibold">Filters</h3>
          <hr />

          {/* sort by */}
          <div>
            <h3 className="text-2xl font-semibold">Sort By</h3>
            <DropDown
              dropDown={sortDropDown}
              setDropDown={setSortDropDown}
              list={sortOptions}
              name="Sort By"
              params={sortingParams}
              setParams={setSortingParams}
            />
          </div>
          <hr />

          {/* Rating */}
          <div>
            <h3 className="text-2xl font-semibold">Rating</h3>
            <DropDown
              dropDown={ratingDropDown}
              setDropDown={setRatingDropDown}
              list={ratingList}
              name="rating"
              params={ratingParams}
              setParams={setRatingParams}
            />
          </div>
          <hr />

          {/* years */}
          <div>
            <h3 className="text-2xl font-semibold">Years</h3>
            <DropDown
              dropDown={yearDropDown}
              setDropDown={setYearDropDown}
              list={years}
              name="years"
              params={yearParams}
              setParams={setYearParams}
            />
          </div>
          <hr />

          {/* genres */}
          <div>
            <h3 className="text-2xl font-semibold">Genres</h3>
            <div className="flex flex-wrap gap-2 my-2">
              {genreList.map((ele) => {
                return (
                  <button
                    key={ele.id}
                    onClick={() => {
                      handleGenres(ele.id);
                    }}
                    className={clsx(
                      "px-4 py-1 flex justify-center items-center  border border-slate-300 dark:border-slate-700 rounded-full gap-2 cursor-pointer disabled:cursor-default",
                      selectedGenre?.find((item) => item == ele.id)
                        ? "bg-main text-white border-none"
                        : "hover:bg-main hover:text-white hover:border-none",
                    )}
                  >
                    <span>{ele.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* filterBtn */}
          <button
            disabled={isFilterLoading}
            onClick={handleFilters}
            className="w-full h-10 bg-main text-white hover:opacity-85 flex justify-center items-center rounded-lg text-lg gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isFilterLoading ? <Loader className="w-5 h-5 animate-spin" /> : ""}
            <span>Search</span>
          </button>
        </div>

        {/* shows */}
        {showList.length === 0 && isLoading === false ? (
          // shows not found
          <div className="md:col-span-3 my-5  flex flex-col justify-center items-center gap-2">
            <Film className="w-24 h-24 text-slate-200 dark:text-slate-800 " />
            <h3 className="text-xl md:text-3xl text-slate-500 dark:text-slate-600  font-semibold">
              Oops! No shows match your filters{" "}
            </h3>
            <p className="text-base md:text-lg">Try tweaking them a bit</p>
          </div>
        ) : (
          <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5 my-5">
            {showList.map((ele) => {
              return (
                <div key={ele.id}>
                  <ShowCard show={ele} type={type} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 ? (
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePagination={handlePagination}
          pagesList={pagesList}
        />
      ) : (
        ""
      )}
    </>
  );
}
