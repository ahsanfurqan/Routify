import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import MapScreen from "./src/screens/MapScreen";
import SearchScreen from "./src/screens/SearchScreen";
import BusOptionScreen from "./src/screens/BusOptionScreen";
import { store } from "./store";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import LoadingScreen from "./src/screens/LoadingScreen";

export default function App() {
  const stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
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
            name="BusScreen"
            component={BusOptionScreen}
            options={{ headerShown: true }}
          />
        </stack.Navigator>
        {/* <MapScreen /> */}
      </NavigationContainer>
    </Provider>
    // <LoadingScreen />
  );
}
