import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { newsService } from "../services/newsService";

export const initialState = {
  isLoading: false,
  hasLoaded: false,
  data: [],
};

export const newsServicethunk = createAsyncThunk(
  "get/news/",
  async (payloadObj) => {
    return await newsService(payloadObj);
  }
);

const news = createSlice({
  name: "news",
  initialState,
  reducers: {
    unmountNews: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newsServicethunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(newsServicethunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasLoaded = true;
      state.data = action.payload.articles;
    });
  },
});

export const newsSelector = ({ news }) => news;

export const newsInfo = createSelector(newsSelector, (news) => news?.data);

export const hasLoaded_ = createSelector(
  newsSelector,
  (news) => news?.hasLoaded
);

// export const { unmountLogin } = fieldMoisture.actions;

export default news.reducer;
