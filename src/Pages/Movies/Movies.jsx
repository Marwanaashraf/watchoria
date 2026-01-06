import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../Redux/MovieSlice.js";
import { useParams, useSearchParams } from "react-router-dom";

import ShowCard from "../../Components/ShowCard/ShowCard.jsx";
import Pagination from "../../Components/ui/Pagination/Pagination.jsx";
import NotFoundPage from "../../Components/NotFoundPage/NotFoundPage.jsx";
import Loading from "../../Components/ui/Loading/Loading.jsx";
export default function Movies() {
  let { type } = useParams();
  const disp = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  //from redux
  let { movieList, loading, totalPages, currentPage } = useSelector(
    (d) => d.movies
  );
  //currentpage
  let [page, setPage] = useState(Number(searchParams.get("page") || 1));

  //All pages
  let pagesList = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesList.push(i);
  }

  function handlePagination(newPage) {
    setSearchParams({ page: newPage });
  }

  useEffect(() => {
    let currPage = Number(searchParams.get("page") || 1);
    setPage(currPage);
    disp(getAllMovies({ type, page: currPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams, type]);

  if (movieList.length === 0 && !loading) {
    return <NotFoundPage />;
  }
  console.log(movieList);

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
          <div className="flex gap-2 items-center">
            <span className="before-head"></span>
            <h1 className="text-3xl capitalize  font-bold">
              {type.split("_").join(" ")} Movies
            </h1>
          </div>
          <hr className="my-2.5" />
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
