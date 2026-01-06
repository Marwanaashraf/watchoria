import { AvatarReducer } from "./avatarSlice.js";
import { movieDetailsReducer } from "./MovieDetails.js";
import { movieReducer } from "./MovieSlice.js";
import { RatingReducer } from "./RatingSlice.js";
import { SearchReducer } from "./SearchSlice.js";
import { SeriesReducer } from "./SeriesSlice.js";
import { tvShowDetailsReducer } from "./TvShowDetails.js";
import { UserReducer } from "./userSlice.js";
import { WatchlistReducer } from "./WatchlistSlice.js";
const { configureStore } = require("@reduxjs/toolkit");
export const ConfigStore = configureStore({
  reducer: {
    movies: movieReducer,
    tvshows: SeriesReducer,
    searchStore: SearchReducer,
    movie: movieDetailsReducer,
    tvShow: tvShowDetailsReducer,
    user: UserReducer,
    watchList: WatchlistReducer,
    ratings: RatingReducer,
    avatar: AvatarReducer,
  },
});
