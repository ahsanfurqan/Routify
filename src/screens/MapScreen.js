import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import MapView, { Marker, Camera, Region, Polygon } from "react-native-maps";
import * as Location from "expo-location";
import CureentLocationButton from "./Components/CureentLocationButton";
import DestinationButton from "./Components/DestinationButton";
import TravelingCard from "./Components/TravelingCard";
import LoadingScreen from "./LoadingScreen";
// import Search from "./Components/Search";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
const width = Dimensions.get("window").width;
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = 220;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
import { Buses } from "../../Data/Buses";
// import geolib from "geolib";
import {
  selectDestination,
  selectOrigin,
  setOrigin,
  selectInitialStop,
  selectSelectedBus,
} from "../../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY, host } from "@env";
import { MAP_BOX_TOKEN } from "@env";
import { Stops } from "../../Data/stop";

// import Driver from "./Components/Driver";
// import { Permissions, Location } from "expo";
import { BottomTabBar } from "react-navigation-tabs";
import { Button } from "react-native-elements/dist/buttons/Button";

export default function MapScreen({ route, navigation }) {
  // created to test gps or moving to a specific location in a map

  // getting data from the navigation
  var stop = [];
  // const [Stops, setstop] = useState([]);

  const bus = route.params;

  // const destination = route.params[1];
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
  // const destination = useSelector(selectDestination);
  const initialStop = useSelector(selectInitialStop);
  // dispatch to send data to redux
  const dispatch = useDispatch();

  // to animate map
  const mapRef = useRef(null);
  const centerMap = () => {
    // console.log(loc);
    mapRef.current.animateToRegion(loc);
  };
  // useEffect(()=>{
  //   (async()=>{
  //     let res= await fetch("http://192.168.18.241:3000/getAllStops");
  //     stop= JSON.stringify(res);
  //   })
  // },)
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
      //   await fetch("http://"+host+":3000/getAllStops")
      // .then(data=>data.json())
      // .then(ans=>{
      //   // console.log(ans)
      //   setstop(ans);
      // })
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
    // console.log(stop)

    // text = JSON.parse(location.coords.longitude);
    // console.log(GOOGLE_MAPS_APIKEY);
    // const selector=useSelector(selectOrigin);
    // const origin = useSelector(selectOrigin);

    return (
      <View style={styles.container}>
        {/* Googleautocomplete component */}

        {bus == null && <DestinationButton stops={Stops} />}

        {bus == null && (
          <CureentLocationButton
            cb={() => {
              centerMap();
            }}
          />
        )}
        {/* <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          {Buses.map((bus, index) => {
            console.log(bus.name);
            <View style={styles.card} key={index}>
              <Image
                source={{ uri: "bus_image.jpg" }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View>
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {bus.name}
                </Text>
              </View>
            </View>;
          })}
        </Animated.ScrollView> */}
        {/* the card which will show details */}
        {bus && origin && initialStop && (
          <TravelingCard from={initialStop.title} to={bus[1].title} />
        )}
        {/* Map View component of google */}
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.092,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={false}
          style={styles.map}
        >
          {bus && origin && initialStop && (
            <MapViewDirections
              lineDashPattern={[0]}
              origin={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
              destination={{
                // latitude: destination.location.latitude,
                // longitude: destination.location.longitude,
                latitude: initialStop.location.latitude,
                longitude: initialStop.location.longitude,
              }}
              strokeWidth={2}
              // strokeColor="hotpink"
              apikey={GOOGLE_MAPS_APIKEY}
            />
          )}
          {bus && initialStop && (
            <MapViewDirections
              lineDashPattern={[0]}
              origin={{
                latitude: initialStop.location.latitude,
                longitude: initialStop.location.longitude,
              }}
              destination={{
                // latitude: destination.location.latitude,
                // longitude: destination.location.longitude,
                latitude: bus[1].location.latitude,
                longitude: bus[1].location.longitude,
              }}
              strokeWidth={2}
              strokeColor="red"
              apikey={GOOGLE_MAPS_APIKEY}
            />
          )}
          {/* {bus && origin&&(
            <MapViewDirections
            
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
          {/* <Marker coordinate={loc} /> */}
          {bus == null &&
            Stops.map((val, i) => {
              return (
                <Marker
                  key={val.key}
                  coordinate={val.location}
                  title={val.title}
                >
                  <MaterialCommunityIcons
                    name="bus-marker"
                    size={24}
                    color="black"
                  />
                </Marker>
              );
            })}
          {bus && (
            <Marker coordinate={initialStop.location}>
              <MaterialCommunityIcons
                name="bus-marker"
                size={24}
                color="black"
              />
            </Marker>
          )}
          {bus && (
            <Marker coordinate={bus[1].location}>
              <MaterialCommunityIcons
                name="bus-marker"
                size={24}
                color="black"
              />
            </Marker>
          )}

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
        <ScrollView
          horizontal={true}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Button>Click me</Button>
          {Buses.map((bus, index) => {
            console.log(bus.name);
            <View style={styles.card} key={index}>
              <Image
                source={{ uri: "bus_image.jpg" }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View>
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {bus.name}
                </Text>
              </View>
            </View>;
          })}
        </ScrollView>
        {/* <Animated.scrollView vertical={true}></Animated.scrollView> */}
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  scrollView: {
    // zIndex: 11,
    flex: 1,
    zIndex: 9,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    flex: 1,
    // position: "absolute",
    // flexDirection: "row",
    width: width - 20,
    height: Dimensions.get("window").height * 0.25,
    // top: 80,
    // left: 5,
    right: width * 0.00001,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "white",
    // alignItems: "center",
    shadowColor: "#000000",
    // elevation: 7,
    // shadowRadius: 5,
    shadowOpacity: 1.0,
    // flex: 1,

    // elevation: 2,
    // backgroundColor: "red",
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // marginHorizontal: 10,
    // shadowColor: "#000",
    // shadowRadius: 5,
    // shadowOpacity: 0.3,
    // shadowOffset: { x: 2, y: -2 },
    // height: CARD_HEIGHT,
    // width: CARD_WIDTH,
    // overflow: "hidden",
  },
  cardImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
});
