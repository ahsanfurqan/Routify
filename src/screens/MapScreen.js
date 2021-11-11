import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import MapView, { Marker, Camera, Region } from "react-native-maps";
import * as Location from "expo-location";
import CureentLocationButton from "./Components/CureentLocationButton";
import DestinationButton from "./Components/DestinationButton";
import TravelingCard from "./Components/TravelingCard";
// import Search from "./Components/Search";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
// import geolib from "geolib";
import {
  selectDestination,
  selectOrigin,
  setOrigin,
  selectInitialStop,
  selectSelectedBus,
} from "../../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Stops } from "../../Data/stop";

// import Driver from "./Components/Driver";
// import { Permissions, Location } from "expo";
import { BottomTabBar } from "react-navigation-tabs";

export default function MapScreen({ route, navigation }) {
  // created to test gps or moving to a specific location in a map
  const bus = route.params;

  const coordinates = [
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ];
  // const temp = {
  //   latitude: 24.8238729,
  //   longitude: 67.13762,
  //   latitudeDelta: 0.092,
  //   longitudeDelta: 0.0421,
  // };
  // setting location and error message to null initially
  const [location, setLocation] = useState(null);
  const [loc, setLoc] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // pulling destination from redux
  // const bus = useSelector(selectSelectedBus);
  // const destination = useSelector(selectDestination);
  // const Bus = useSelector(selectSelectedBus);

  const origin = useSelector(selectOrigin);
  const initialStop = useSelector(selectInitialStop);
  // dispatch to send data to redux
  const dispatch = useDispatch();

  // to animate map
  const mapRef = useRef(null);
  const centerMap = () => {
    // console.log(loc);
    mapRef.current.animateToRegion(loc);
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      lat = JSON.parse(location.coords.latitude);
      lon = JSON.parse(location.coords.longitude);
      // console.log(location);
      // console.log("Destination" + destination);
      const dum = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.092,
        longitudeDelta: 0.0421,
      };
      setLoc(dum);
    })();
  }, []);
  var lat;
  var lon;
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
    // console.log(location);
    // console.log("Destination" + destination);
    // const loc = {
    //   latitude: lat,
    //   longitude: lon,
    // };
    // setLoc(loc);
    // const l = {
    //   latitude: 24.8238729,
    //   longitude: 67.13762,
    // };

    // map for animating
    // const mapView=React.createRef();s
    // const animateMap=()=>{

    // }
    dispatch(setOrigin(loc));

    // text = JSON.parse(location.coords.longitude);
    // console.log(GOOGLE_MAPS_APIKEY);
    // const selector=useSelector(selectOrigin);
    // const origin = useSelector(selectOrigin);

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0622,
            longitudeDelta: 0.0121,
          }}
        >
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
            strokeWidth={4}
            strokeColor="#111111"
          />
          <Marker coordinate={coordinates[0]} />
          <Marker coordinate={coordinates[1]} />
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
