import { movieDetailsReducer } from "./MovieDetails.js";
import { movieReducer } from "./MovieSlice.js";
import { SearchReducer } from "./SearchSlice.js";
import { SeriesReducer } from "./SeriesSlice.js";
import { tvShowDetailsReducer } from "./TvShowDetails.js";
const { configureStore } = require("@reduxjs/toolkit");
export const ConfigStore = configureStore({
  reducer: {
    movies: movieReducer,
    tvshows: SeriesReducer,
    searchStore: SearchReducer,
    movie: movieDetailsReducer,
    tvShow: tvShowDetailsReducer,
  },
});
