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
import Search from "./Components/Search";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import geolib from "geolib";
import {
  selectDestination,
  selectOrigin,
  setOrigin,
  selectSelectedBus,
} from "../../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Stops } from "../../Data/stop";

// import Driver from "./Components/Driver";
// import { Permissions, Location } from "expo";
import { BottomTabBar } from "react-navigation-tabs";

export default function MapScreen(props) {
  // created to test gps or moving to a specific location in a map
  const temp = {
    latitude: 24.8238729,
    longitude: 67.13762,
    latitudeDelta: 0.092,
    longitudeDelta: 0.0421,
  };
  // setting location and error message to null initially
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // pulling destination from redux
  const bus = useSelector(selectSelectedBus);
  const destination = useSelector(selectDestination);
  // const Bus = useSelector(selectSelectedBus);

  // dispatch to send data to redux
  const dispatch = useDispatch();

  // to animate map
  const mapRef = useRef(null);
  const centerMap = () => {
    // console.log(mapRef);
    mapRef.current.animateToRegion(temp);
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
    const loc = {
      latitude: lat,
      longitude: lon,
    };
    const l = {
      latitude: 24.8238729,
      longitude: 67.13762,
    };

    // map for animating
    // const mapView=React.createRef();s
    // const animateMap=()=>{

    // }
    dispatch(setOrigin(l));

    // text = JSON.parse(location.coords.longitude);
    // console.log(GOOGLE_MAPS_APIKEY);
    // const selector=useSelector(selectOrigin);
    // const origin = useSelector(selectOrigin);

    return (
      <View style={styles.container}>
        {/* Googleautocomplete component */}
        <DestinationButton />
        <CureentLocationButton
          cb={() => {
            centerMap();
          }}
        />
        {/* Map View component of google */}
        <MapView
          ref={mapRef}
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
          {/* {bus && destination && (
            <MapViewDirections
              lineDashPattern={[0]}
              origin={{
                latitude: 24.8238729,
                longitude: 67.13762,
              }}
              destination={{
                latitude: destination.location.latitude,
                longitude: destination.location.longitude,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
            />
          )} */}
          {/* <Marker
            coordinate={{ latitude: 24.8238729, longitude: 67.13762 }}
            pinColor={"red"} // any color
            title={"You"}
            description={"Your Current Location"}
          /> */}
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
          <Marker coordinate={l} />
          {Stops.map((val, i) => {
            return (
              <Marker key={val.key} coordinate={val.location} title={val.title}>
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
