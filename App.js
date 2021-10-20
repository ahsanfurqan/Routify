import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import MapScreen from "./src/screens/MapScreen";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <MapScreen />
    </Provider>
  );
}
