// redux navSlice to save data which will connect store
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  initialStop: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setInitialStop: (state, action) => {
      state.initialStop = action.payload;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  settravelTimeInformation,
  setInitialStop,
} = navSlice.actions;

//selectors

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectInitialStop = (state) => state.nav.initialStop;

export default navSlice.reducer;
