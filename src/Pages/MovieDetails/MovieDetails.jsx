import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../../Redux/MovieDetails.js";
import NotFoundPage from "../../Components/NotFoundPage/NotFoundPage.jsx";
import { getWatchList } from "../../Redux/WatchlistSlice.js";
import Rating from "../../Components/Rating/Rating.jsx";
import ShowDetails from "../../Components/ShowDetails/ShowDetails.jsx";
import { getRatingData } from "../../Apis/Rating/getRating.js";
import ShowNavs from "../../Components/ShowNavs/ShowNavs.jsx";
import Loading from "../../Components/ui/Loading/Loading.jsx";

export default function MovieDetails() {
  let disp = useDispatch();
  // showId
  let { id } = useParams();
  // show and hide rating prompt
  const [ratingPrompt, setRating] = useState(false);
  // data of rating
  const [ratingData, setRatingData] = useState();
  // loading of rating
  const [ratingLoading, setRatingLoading] = useState();
  // data of movie
  let {
    movie,
    loading,
    cast,
    recomindations,
    director,
    ageRating,
    streamList,
  } = useSelector((d) => d.movie);

  const getRating = async () => {
    setRatingLoading(true);
    const data = await getRatingData(id);
    setRatingLoading(false);
    if (data) {
      setRatingData(data);
    } else {
      setRatingData(null);
    }
  };
  useEffect(() => {
    disp(getMovie(id));
  }, [id]);

  useEffect(() => {
    disp(getWatchList());
  }, []);
  useEffect(() => {
    getRating();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (Object.keys(movie).length === 0 && !loading) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{movie.title ? movie.title : "MovieDetails"} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <section>
        <div className="contain py-28">
          {/* movie Details */}
          <ShowDetails
            show={movie}
            type="movie"
            director={director}
            setRating={setRating}
            ratingData={ratingData}
            ratingLoading={ratingLoading}
            ageRating={ageRating.certification}
          />
          {/* cast, Recomindations ,where to watch*/}
          <ShowNavs
            cast={cast}
            recomindations={recomindations}
            streamList={streamList}
            type="movie"
          />
        </div>

        {ratingPrompt ? (
          <Rating
            ratingData={ratingData}
            setRatingData={setRatingData}
            show={movie}
            setRating={setRating}
            type="movie"
          />
        ) : (
          ""
        )}
      </section>
    </>
  );
}
