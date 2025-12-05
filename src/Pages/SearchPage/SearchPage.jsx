import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loading from "../../Component/Loading/Loading.jsx";
import ShowCard from "../../Component/ShowCard/ShowCard.jsx";
import StaticImage from "../../Component/StaticImage/StaticImage.jsx";
import { getSearch } from "../../Apis/getSearch.js";
import NotFoundPage from "../../Component/NotFoundPage/NotFoundPage.jsx";
import Pagination from "../../Component/Pagination/Pagination.jsx";

export default function SearchPage() {
  const { q } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // page
  const page = Number(searchParams.get("page")) || 1;
  // data of search
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }
  const handlePagination = (page) => {
    setSearchParams({ page });
  };
  // loading image
  const [imgLoaded, setImgLoaded] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await getSearch(q, page).catch(() => {
      setError(true);
    });
    setSearchData(data?.results);
    setTotalPages(data?.total_pages);
    setLoading(false);
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, [page, q]);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <NotFoundPage />;
  }

  return (
    <section className="py-28 contain">
      {/* search head */}
      <div className="flex space-x-1 items-center">
        <Search className="w-7 h-7" />
        <h1 className="text-3xl">
          Search results for: <span className="text-main">{q}</span>
        </h1>
      </div>

      {/* searchList */}
      <div className="my-5 grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4">
        {searchData.map((item) => {
          return item.media_type === "person" ? (
            <div
              key={item.id}
              onClick={() => {
                navigate(`/cast/${item.id}`);
              }}
              className="cursor-pointer relative group overflow-hidden text-center rounded-lg h-[305px] sm:h-[375px]"
            >
              {/* loading Img */}
              {imgLoaded === false ||
                (item.profile_path === null && <StaticImage />)}
              <img
                className="w-full h-full group-hover:scale-110 duration-300"
                src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt={item.name}
                onLoad={() => {
                  setImgLoaded(true);
                }}
                onError={() => {
                  setImgLoaded(true);
                }}
              />

              <div className="show-details">
                <div className="w-[90%] mx-auto ">
                  <h1 className="text-base uppercase text-white font-bold text-shadow line-clamp-2">
                    {item.name}
                  </h1>
                </div>
              </div>
            </div>
          ) : item.media_type === "movie" ? (
            <div key={item.id}>
              <ShowCard key={item.id} show={item} type="movie" />
            </div>
          ) : (
            <div key={item.id}>
              <ShowCard key={item.id} show={item} type="tv" />
            </div>
          );
        })}
      </div>

      {/* pagination */}
      {totalPages > 0 ? (
        <Pagination
          page={page}
          totalPages={totalPages}
          pagesList={pageList}
          handlePagination={handlePagination}
        />
      ) : (
        ""
      )}
    </section>
  );
}
