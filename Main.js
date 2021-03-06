import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import MapScreen from "./src/screens/MapScreen";
import SearchScreen from "./src/screens/SearchScreen";
import BusOptionScreen from "./src/screens/BusOptionScreen";
import SearchHistory from "./src/screens/history";
import { store } from "./store";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigation from "./app/navigation/auth-navigation/AuthNavigation";
import AuthContext from "./app/Context/AuthContext";
import axios from "axios";
import env from "./app/environment/environment";
import Dashboard from "./app/screens/Dashboard";
// import LoadingScreen from "./src/screens/LoadingScreen";
import StopsScreen from "./src/screens/StopsScreen";
import BusScreen from "./src/screens/BusScreen";
import { stop } from "./Data/stop";

export default function Main() {
  const stack = createStackNavigator();

  return (
    <Provider store={store}>
      {/* <NavigationContainer> */}
      <stack.Navigator>
        <stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="Where to go?"
          component={SearchScreen}
          options={{ headerShown: true }}
        />
        <stack.Screen
          name="HistoryScreen"
          component={SearchHistory}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="BusScreen"
          component={BusOptionScreen}
          options={{ headerShown: true }}
        />
      </stack.Navigator>
      {/* <MapScreen /> */}
      {/* </NavigationContainer> */}
    </Provider>
    // <LoadingScreen />
    // <StopsScreen />
    // <BusScreen />
  );
}
