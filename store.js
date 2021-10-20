import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});

// this will be pass to provider to use as a data layer in the app
