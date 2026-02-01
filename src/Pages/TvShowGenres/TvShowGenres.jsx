import ShowFilters from "../../Components/ShowFilters/ShowFilters.jsx";

export default function TvShowGenres() {
  return (
    <section className="my-28 contain">
      {/* header */}
      <div className="flex gap-2 items-center">
        <span className="before-head"></span>
        <h1 className="text-3xl capitalize  font-bold">Tv Shows</h1>
      </div>
      <hr className="my-2.5" />
      {/* show filters and pagination */}
      <ShowFilters type="tv" />
    </section>
  );
}
