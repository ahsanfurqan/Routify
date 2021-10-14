import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import MapView, { Marker, AnimatedReigon, Animated } from "react-native-maps";
import * as Location from "expo-location";
import DestinationButton from "./Components/DestinationButton";
import CureentLocationButton from "./Components/CureentLocationButton";
import { BottomTabBar } from "react-navigation-tabs";

function MapScreen(props) {
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
  var lat;
  var lon;
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
  } else if (location) {
    lat = JSON.parse(location.coords.latitude);
    lon = JSON.parse(location.coords.longitude);

    // text = JSON.parse(location.coords.longitude);
    // console.log(typeof text);

    return (
      <View style={styles.container}>
        <DestinationButton />
        <CureentLocationButton />
        <MapView
          initialRegion={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.092,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={false}
          style={styles.map}
        >
          <Marker
            coordinate={{ latitude: lat, longitude: lon }}
            pinColor={"red"} // any color
            title={"title"}
            description={"description"}
          />
        </MapView>
      </View>
    );
  }
  return (
    <View style={styles.container}>
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

export default MapScreen;
