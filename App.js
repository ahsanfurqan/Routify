import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import MapScreen from "./src/screens/MapScreen";
import MapView, { Marker } from "react-native-maps";
import MapLists from "./src/screens/MapLists";
import * as Location from "expo-location";
import { setNavigator } from "./src/screens/NavigationRef";

export default function App() {
  var markers = [
    {
      latitude: 45.65,
      longitude: -78.9,
      title: "Foo Place",
      subtitle: "1234 Foo Drive",
    },
  ];
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    let latitude = JSON.stringify(location.coords.latitude);
    let longitude = JSON.stringify(location.coords.longitude);
  }
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.092,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          pinColor={"purple"} // any color
          title={"title"}
          description={"description"}
        />
      </MapView>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
