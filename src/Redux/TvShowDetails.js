import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getTvShowData } from "../Apis/getTvShow.js";

export let getTvShow = createAsyncThunk(
  "tvShow/getTvShowDetails",
  getTvShowData
);
export let tvShowSlice = createSlice({
  name: "tvShow",
  initialState: { tvShow: {}, loading: true, cast: [], recomindations: [] },
  extraReducers: (builder) => {
    builder.addCase(getTvShow.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTvShow.fulfilled, (state, action) => {
      state.tvShow = action.payload.tvShow;
      state.cast = action.payload.cast;
      state.recomindations = action.payload.recomindations;
      state.loading = false;
    });
    builder.addCase(getTvShow.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export let tvShowDetailsReducer = tvShowSlice.reducer;
