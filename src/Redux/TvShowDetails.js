import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getTvShowData } from "../Apis/Series/getTvShow.js";

export let getTvShow = createAsyncThunk(
  "tvShow/getTvShowDetails",
  getTvShowData
);
export let tvShowSlice = createSlice({
  name: "tvShow",
  initialState: {
    tvShow: {},
    loading: true,
    cast: [],
    recomindations: [],
    ageRating: {},
    streamList:[]
  },
  extraReducers: (builder) => {
    builder.addCase(getTvShow.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTvShow.fulfilled, (state, action) => {
      const payload = action.payload;
      state.tvShow = payload.tvShow || {};
      state.cast = payload.cast || [];
      state.recomindations = payload.recomindations || [];
      state.streamList = payload.streamList || [];
      state.ageRating = payload.ageRating || {};
      state.loading = false;
    });
    builder.addCase(getTvShow.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export let tvShowDetailsReducer = tvShowSlice.reducer;
