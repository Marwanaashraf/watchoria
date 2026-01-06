import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getTvShow } from "../../Redux/TvShowDetails.js";
import Loading from "../../Components/ui/Loading/Loading.jsx";

import NotFoundPage from "../../Components/NotFoundPage/NotFoundPage.jsx";
import ShowDetails from "../../Components/ShowDetails/ShowDetails.jsx";
import Rating from "../../Components/Rating/Rating.jsx";
import { getRatingData } from "../../Apis/Rating/getRating.js";
import ShowNavs from "../../Components/ShowNavs/ShowNavs.jsx";
export default function TvShowDetails() {
  const disp = useDispatch();
  const { id } = useParams();
  // show and close prompt
  const [ratingPrompt, setRating] = useState(false);
  // rating data
  const [ratingData, setRatingData] = useState(null);
  // rating loading
  const [ratingLoading, setRatingLoading] = useState(false);
  const getRating = async () => {
    setRatingLoading(true);
    const data = await getRatingData(id);
    setRatingLoading(false);
    if (!data) {
      setRatingData(null);
    } else {
      setRatingData(data);
    }
  };
  const { tvShow, loading, cast, recomindations, ageRating, streamList } =
    useSelector((d) => d.tvShow);
  useEffect(() => {
    disp(getTvShow(id));
  }, [id]);
  useEffect(() => {
    getRating();
  }, [id]);
  if (Object.keys(tvShow).length === 0 && !loading) {
    return <NotFoundPage />;
  }
  if (loading) {
    return <Loading />;
  }
  console.log(tvShow);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{tvShow.name ? tvShow.name : "TvShow Details"}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <section className="contain my-28">
        {/* tv-show */}
        <ShowDetails
          show={tvShow}
          setRating={setRating}
          type="tv"
          ratingData={ratingData}
          ratingLoading={ratingLoading}
          ageRating={ageRating.rating}
        />

        {/* cast, recomindations , streamList*/}
        <ShowNavs
          cast={cast}
          recomindations={recomindations}
          streamList={streamList}
          type="tv-show"
        />
      </section>

      {/* Rating */}
      {ratingPrompt ? (
        <Rating
          show={tvShow}
          setRating={setRating}
          type="tv"
          ratingData={ratingData}
          setRatingData={setRatingData}
        />
      ) : (
        ""
      )}
    </>
  );
}
