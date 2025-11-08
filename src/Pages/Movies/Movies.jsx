import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../Redux/MovieSlice.js";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../../Component/Loading/Loading.jsx";
import ShowCard from "../../Component/ShowCard/ShowCard.jsx";
import Pagination from "../../Component/Pagination/Pagination.jsx";
export default function Movies() {
  let { type } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  //from redux
  let { movieList, loading, totalPages, currentPage } = useSelector(
    (d) => d.movies
  );
  //currentpage
  let [page, setPage] = useState(Number(searchParams.get("page") || 1));
  let disp = useDispatch();

  //All pages
  let pagesList = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesList.push(i);
  }
  const start = Math.max(0, page - 3);
  const end = Math.min(totalPages, start + 5);

  function handlePagination(newPage) {
    setSearchParams({ page: newPage });
  }

  useEffect(() => {
    let currPage = Number(searchParams.get("page") || 1);
    setPage(currPage);
    disp(getAllMovies({ type, page: currPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams, type]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movies : {type.split("_").join(" ")}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <section className="contain py-28">
          {/* Header */}
          <h1 className="text-3xl">
            <i className="fa-solid fa-video text-main"></i>{" "}
            <span className="capitalize  font-bold ">
              {type.split("_").join(" ")} Movies
            </span>
          </h1>

          {/* Movies */}
          <div className="my-5 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4">
            {movieList.map((ele) => {
              return <ShowCard key={ele.id} type="movie" show={ele} />;
            })}
          </div>

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePagination={handlePagination}
            pagesList={pagesList}
          />
        </section>
      )}
    </>
  );
}
