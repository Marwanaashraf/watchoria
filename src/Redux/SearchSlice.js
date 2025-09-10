import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearch } from "../Apis/getSearch.js";


export let getAllData = createAsyncThunk("search/getAllData", getSearch);
let SearchSlice = createSlice({
  name: "search",
  initialState: {
    searchData: [],
    loading: false,
    err: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.searchData = action.payload.results.filter(
        (ele) => ele.media_type != "person"
      );
      state.totalPages = action.payload.total_pages;
      state.loading = false;
    });
    builder.addCase(getAllData.rejected, (state, action) => {
      state.err = action.error;
      state.loading = false;
    });
  },
});
export let SearchReducer = SearchSlice.reducer;
