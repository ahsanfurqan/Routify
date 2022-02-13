import React, { useRef, useState, useEffect } from "react";
import logo from "../../assets/icon.png";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import MapView, {
  Marker,
  Camera,
  Region,
  Polygon,
  Animated,
} from "react-native-maps";
import * as Location from "expo-location";
import CureentLocationButton from "./Components/CureentLocationButton";
import DestinationButton from "./Components/DestinationButton";
import TravelingCard from "./Components/TravelingCard";
import RideOptionCard from "./Components/RideOptionCard";
import LoadingScreen from "./LoadingScreen";
// import Search from "./Components/Search";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.3;
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
  // console.log(route.params);
  // let ride_card = null;
  const [ride_card, setRide_Card] = useState(null);
  const [bus, setBus] = useState(null);
  const [morebus, setmoreBus] = useState(null);

  // elseif(route.params.){

  // }
  // const bus = route.params;
  // const bus = null;

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
    if (route.params != undefined) {
      console.log(route.params);
      if (route.params.ride_Card) {
        const { ride_Card } = route.params;
        setBus(null);
        setmoreBus(null);
        setRide_Card(ride_Card);
      } else if (route.params.bus) {
        const { bus } = route.params;
        setRide_Card(null);
        setmoreBus(null);
        setBus(bus);

        // console.log(1);
        // console.log("hey" + ride_card1);
      } else if (route.params.multipleBus) {
        const { multipleBus } = route.params;
        setBus(null);
        setRide_Card(null);
        setmoreBus(multipleBus);
      }
    } else {
      setmoreBus(null);
      setBus(null);
      setRide_Card(null);
    }
  });
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

    // return (
    // <View style={styles.container}>

    {
      /* <ScrollView
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
        </ScrollView> */
    }
    // </View>
    // );
    // console.log("zinda");
    // console.log(morebus);
    return (
      <View style={styles.container}>
        {bus == null && <DestinationButton stops={Stops} />}

        {bus == null && ride_card == null && (
          <CureentLocationButton
            cb={() => {
              centerMap();
            }}
          />
        )}
        {bus && origin && initialStop && (
          <TravelingCard from={initialStop.title} to={bus[1].title} />
        )}
        {morebus && origin && initialStop && (
          <TravelingCard
            from={initialStop.title}
            to={morebus[2].title}
            stops={2}
          />
        )}
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
          {morebus && origin && initialStop && (
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
          {morebus && initialStop && (
            <MapViewDirections
              lineDashPattern={[0]}
              origin={{
                latitude: initialStop.location.latitude,
                longitude: initialStop.location.longitude,
              }}
              destination={{
                latitude: morebus[1],
                longitude: morebus[3],
                // latitude: destination.location.latitude,
                // longitude: destination.location.longitude,
                // latitude: morebus[1].location.latitude,
                // longitude: morebus[1].location.longitude,
              }}
              strokeWidth={2}
              strokeColor="red"
              apikey={GOOGLE_MAPS_APIKEY}
            />
          )}
          {morebus && initialStop && (
            <MapViewDirections
              lineDashPattern={[0]}
              origin={{
                latitude: morebus[1],
                longitude: morebus[3],
              }}
              destination={{
                latitude: morebus[2].location.latitude,
                longitude: morebus[2].location.longitude,
                // latitude: destination.location.latitude,
                // longitude: destination.location.longitude,
                // latitude: morebus[1].location.latitude,
                // longitude: morebus[1].location.longitude,
              }}
              strokeWidth={2}
              strokeColor="hotpink"
              apikey={GOOGLE_MAPS_APIKEY}
            />
          )}
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
          {/* {bus && (
            <Marker coordinate={bus[1].location}>
              <MaterialCommunityIcons
                name="bus-marker"
                size={24}
                color="black"
              /> 
            </Marker>
          )} */}
        </MapView>
        {ride_card && <RideOptionCard item={ride_card} />}
        {/* <View style={styles.mainCard}>
          <ScrollView
           
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            pagingEnabled
          >
            {Buses.map((bus, index) => {
              return (
                <View style={styles.card} key={index}>
                  <Image source={logo} style={styles.cardImage} />
                  <Text style={styles.cardTitle}>{bus.name}</Text>
                  <Text style={styles.cardDescription}>Gulshan</Text>
                  <Text style={styles.cardDescription}>Korangi</Text>

                </View>
              );
            })}
          </ScrollView>
        </View> */}
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
  test: {
    flex: 1,
    backgroundColor: "black",
  },
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
  scrollView: {
    // zIndex: 9,
    // flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    // left: 0,
    // right: 0,
    // paddingVertical: 20,
    // paddingHorizontal: 20,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // flexDirection: "column",
    // flex: 1,
    // justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH - 20,
    borderWidth: 4,
    // borderColor: "black",
    // marginBottom: 20,
    // paddingBottom: 200,
    // overflow: "hidden",
    marginBottom: 20,
  },
  mainCard: {
    // marginBottom: ,
    // justifyContent: "space-between",
    backgroundColor: "#fff",
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // marginHorizontal: 10,
    // shadowColor: "#000",
    // shadowRadius: 5,
    // shadowOpacity: 0.3,
    // shadowOffset: { x: 2, y: -2 },
    height: 400,
    width: CARD_WIDTH,
    // overflow: "hidden",
  },
  cardImage: {
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // overflow: "hidden",
    // shadowRadius: 5,
    // shadowOpacity: 0.3,
    // zIndex: 1111,
    resizeMode: "contain",
    // overflow: "hidden",
    // borderRadius: 40,
    // flex: 1,
    width: 150,
    height: 80,
    alignSelf: "center",
    // color: "grey",
    // borderWidth: 3,
    // backgroundColor: "grey",
    // borderColor: "black",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
    // alignContent: "center",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
});
