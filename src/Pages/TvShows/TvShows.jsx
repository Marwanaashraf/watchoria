import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTvShows } from "../../Redux/SeriesSlice.js";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../../Component/Loading/Loading.jsx";
import ShowCard from "../../Component/ShowCard/ShowCard.jsx";
import Pagination from "../../Component/Pagination/Pagination.jsx";

export default function TvShows() {
  let [searchParams, setSearchParams] = useSearchParams();
  let { type } = useParams();
  let disp = useDispatch();

  let { seriesList, loading, totalPages } = useSelector((d) => d.tvshows);
  let [page, setPage] = useState(Number(searchParams.get("page") || 1));

  //All pages
  let pagesList = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesList.push(i);
  }
  const handlePagination = (newPage) => {
    setSearchParams({ page: newPage });
  };
  useEffect(() => {
    let currPage = Number(searchParams.get("page") || 1);
    setPage(currPage);
    disp(getTvShows({ type, page: currPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams, type]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Tvshows : {type.split("_").join(" ")}</title>
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
          <Pagination
            page={page}
            pagesList={pagesList}
            handlePagination={handlePagination}
            totalPages={totalPages}
          />
        </section>
      )}
    </>
  );
}
