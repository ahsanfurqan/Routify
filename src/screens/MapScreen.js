import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import MapView, { Marker, AnimatedReigon, Animated } from "react-native-maps";
import * as Location from "expo-location";
import CureentLocationButton from "./Components/CureentLocationButton";
import Search from "./Components/Search";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setOrigin,
} from "../../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

// import Driver from "./Components/Driver";
// import { Permissions, Location } from "expo";
import { BottomTabBar } from "react-navigation-tabs";

export default function MapScreen(props) {
  // setting location and error message to null initially
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // pulling destination from redux
  const destination = useSelector(selectDestination);
  // const origin = useSelector(selectOrigin);
  // dispatch to send data to redux
  const dispatch = useDispatch();
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
  // const mapRef = React.createRef();
  let text = "Waiting..";
  // if permission is not granted
  if (errorMsg) {
    text = errorMsg;
    return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
  }
  // if location is get
  else if (location) {
    lat = JSON.parse(location.coords.latitude);
    lon = JSON.parse(location.coords.longitude);
    console.log(location);
    const loc = {
      latitude: lat,
      longitude: lon,
    };
    dispatch(
      setOrigin({
        location: loc,
      })
    );

    // text = JSON.parse(location.coords.longitude);
    // console.log(GOOGLE_MAPS_APIKEY);
    // const selector=useSelector(selectOrigin);
    return (
      <View style={styles.container}>
        {/* Googleautocomplete component */}
        <Search />
        <CureentLocationButton />
        {/* Map View component of google */}
        <MapView
          initialRegion={{
            latitude: loc.latitude,
            longitude: loc.longitude,
            latitudeDelta: 0.092,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={true}
          style={styles.map}
        >
          {loc && destination && (
            <MapViewDirections
              origin={location.description}
              destination={destination.description}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="black"
            />
          )}
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
