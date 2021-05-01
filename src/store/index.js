import { configureStore } from "@reduxjs/toolkit";
import episodesSlice from "./episodes-slice.js";

const store = configureStore({
  reducer: { episodes: episodesSlice.reducer },
});

export default store;