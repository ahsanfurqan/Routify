import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import MapView, { Marker, AnimatedReigon, Animated } from "react-native-maps";
import * as Location from "expo-location";
import CureentLocationButton from "./Components/CureentLocationButton";
import DestinationButton from "./Components/DestinationButton";
import Search from "./Components/Search";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Stop from "./Components/Stop";
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
  const Stops = [
    {
      key: "6",
      title: "Random Bus Stop",
      location: {
        latitude: 24.8238729,
        longitude: 67.13762,
        latitudeDelta: 0.092,
        longitudeDelta: 0.0421,
      },
    },
    {
      key: "1",
      title: "Korangi Crossing Bus Stop",
      location: {
        latitude: 24.817101,
        longitude: 67.107758,
        latitudeDelta: 0.092,
        longitudeDelta: 0.0421,
      },
    },
    {
      key: "2",
      title: "Gulshan Chowrangi Bus Stop",
      location: {
        latitude: 24.9244,
        longitude: 67.0916,
        latitudeDelta: 0.092,
        longitudeDelta: 0.0421,
      },
    },
    {
      key: "3",
      title: "Malir 15 Bus Stop",
      location: {
        latitude: 24.8789,
        longitude: 67.1881,
        latitudeDelta: 0.092,
        longitudeDelta: 0.0421,
      },
    },
    {
      key: "4",
      title: "Awami Markaz Bus Stop",
      location: {
        latitude: 24.8707944,
        longitude: 67.08998470000006,
        latitudeDelta: 0.092,
        longitudeDelta: 0.0421,
      },
    },
    {
      key: "5",
      title: "Meezan Bank Bus Stop",
      location: {
        latitude: 24.86034,
        longitude: 67.06479,
        latitudeDelta: 0.092,
        longitudeDelta: 0.0421,
      },
    },
  ];
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
    // console.log(location);
    // console.log("Destination" + destination);
    const loc = {
      latitude: lat,
      longitude: lon,
    };
    const l = {
      latitude: 37.771707,
      longitude: -122.4053769,
    };
    // map for animating
    // const mapView=React.createRef();
    // const animateMap=()=>{

    // }
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
        <DestinationButton />
        <CureentLocationButton />
        {/* Map View component of google */}
        <MapView
          initialRegion={{
            latitude: 24.8238729,
            longitude: 67.13762,
            latitudeDelta: 0.092,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={false}
          style={styles.map}
        >
          {/* {loc && destination && ( */}
          <MapViewDirections
            origin={{
              latitude: 24.8238729,
              longitude: 67.13762,
            }}
            destination={{
              latitude: 24.8582,
              longitude: 67.2289,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
          />
          {/* <Marker
            coordinate={{ latitude: 24.8238729, longitude: 67.13762 }}
            pinColor={"red"} // any color
            title={"You"}
            description={"Your Current Location"}
          /> */}
          {/* )} */}
          {/* {destination?.location && (
            <Marker
              coordinates={{
                latitude: destination.location.latitude,
                longitude: destination.location.longitude,
              }}
              title="destination"
              description={destination.description}
              identifier="destination"
            />
          )}
          <Marker
            coordinate={{ latitude: lat, longitude: lon }}
            pinColor={"red"} // any color
            title={"title"}
            description={"description"}
          /> */}
          {Stops.map((val, i) => {
            return (
              <Marker coordinate={val.location} title={val.title}>
                <MaterialCommunityIcons
                  name="bus-marker"
                  size={24}
                  color="black"
                />
              </Marker>
            );
          })}
          {/* <FlatList
            data={Stops}
            renderItem={({ item }) => (
              <Stop
                stop={{
                  key: item.key,
                  title: item.title,
                  location: item.location,
                }}
              />
            )}
          /> */}
          {/* <Stop
            stop={{
              key: "1",
              title: "ahsan",
              location: {
                latitude: 24.8238729,
                longitude: 67.13762,
              },
            }}
          /> */}
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
