import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../store";

import { createStackNavigator } from "@react-navigation/stack";
import AdminView from "./AdminView";
import Displaystops from "./displayStops";
import BusScreen from "./BusScreen";
import StopsScreen from "./StopsScreen";
import Displaybuses from "./displayBus";
export default function AdminPanel() {
  const stack = createStackNavigator();

  return (
    <Provider store={store}>
      <stack.Navigator>
        <stack.Screen
          name="AdminView"
          component={AdminView}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="DisplayStops"
          component={Displaystops}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="DisplayBuses"
          component={Displaybuses}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="StopScreen"
          component={StopsScreen}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="BusScreen"
          component={BusScreen}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </Provider>
  );
}

const styles = StyleSheet.create({});
