import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout.jsx";
import Movies from "./Component/Movies/Movies.jsx";
import Home from "./Component/Home/Home.jsx";
import TvShows from "./Component/TvShows/TvShows.jsx";
import { Provider } from "react-redux";
import { ConfigStore } from "./Redux/store.js";
import NotFound from "./Component/NotFound/NotFound.jsx";
import MovieDetails from "./Component/MovieDetails/MovieDetails.jsx";
import TvShowDetails from "./Component/TvShowDetails/TvShowDetails.jsx";
import TvShowSeasons from "./Component/TvShowSeasons/TvShowSeasons.jsx";
import SpecificSeason from "./Component/SpecificSeason/SpecificSeason.jsx";
import SearchAll from "./Component/SearchAll/SearchAll.jsx";
import MovieTrailer from "./Component/MovieTrailer/MovieTrailer.jsx";

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "movies/:type", element: <Movies /> },
        { path: "movies/:type/:id", element: <MovieDetails /> },
        { path: "movie/:id", element: <MovieDetails /> },
        { path: "movie/:id/trailer", element: <MovieTrailer /> },
        { path: "tv-shows/:type", element: <TvShows /> },
        { path: "tv-shows/:type/:id", element: <TvShowDetails /> },
        { path: "tv-show/:id", element: <TvShowDetails /> },
        { path: "tv-show/:id/seasons", element: <TvShowSeasons /> },
        { path: "tv-show/:id/seasons/:season", element: <SpecificSeason /> },
        { path: "search", element: <SearchAll /> },
        { path: "*", element: <NotFound /> },
      ]
    },
  ],{basename:"/watchoria"});
  return (
    <>
      <Provider store={ConfigStore}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
}
