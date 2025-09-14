import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout.jsx";
import Movies from "./Pages/Movies/Movies.jsx";
import Home from "./Pages/Home/Home.jsx";
import TvShows from "./Pages/TvShows/TvShows.jsx";
import { Provider } from "react-redux";
import { ConfigStore } from "./Redux/store.js";
import NotFound from "./Pages/NotFound/NotFound.jsx";
import MovieDetails from "./Pages/MovieDetails/MovieDetails.jsx";
import TvShowDetails from "./Pages/TvShowDetails/TvShowDetails.jsx";
import TvShowSeasons from "./Pages/TvShowSeasons/TvShowSeasons.jsx";
import SpecificSeason from "./Pages/SpecificSeason/SpecificSeason.jsx";
import SearchAll from "./Pages/SearchAll/SearchAll.jsx";
import MovieTrailer from "./Pages/MovieTrailer/MovieTrailer.jsx";
import ActorProfile from "./Pages/ActorProfile/ActorProfile.jsx";

export default function App() {
  let routes = createBrowserRouter(
    [
      {
        path: "",
        element: <Layout />,
        children: [
          { path: "", element: <Home /> },
          { path: "movies/:type", element: <Movies /> },
          { path: "movie/:id", element: <MovieDetails /> },
          { path: "movie/:id/trailer", element: <MovieTrailer /> },
          { path: "tv-shows/:type", element: <TvShows /> },
          { path: "tv-show/:id", element: <TvShowDetails /> },
          { path: "tv-show/:id/seasons", element: <TvShowSeasons /> },
          { path: "tv-show/:id/seasons/:season", element: <SpecificSeason /> },
          { path: "cast/:id", element: <ActorProfile /> },
          { path: "search", element: <SearchAll /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ]
  );
  return (
    <>
      <Provider store={ConfigStore}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
}
