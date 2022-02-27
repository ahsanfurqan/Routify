import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDestination,
  selectInitialStop,
  setSelectedBus,
  setDestination,
} from "../../slices/navSlice";
// import { Stops } from "../../Data/stop";
// import { Buses } from "../../Data/Buses";
// import { Stops } from "../../Data/stop";
import { getDistance } from "geolib";
import { Card, Icon } from "react-native-elements";
import { object } from "yup";
import { useTheme } from "react-navigation";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.3;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height - 65;

export default function BusOptionScreen({ item, busses, stops }) {
  const navigation = useNavigation();
  const [Buses, setBuses] = useState(busses);
  const [Stops, setStops] = useState(stops);
  const [fare, setFare] = useState(0);

  const destination = item;
  // console.log(props.item);
  // const destination = useSelector(selectDestination);
  const initialstop = useSelector(selectInitialStop);
  const dispatch = useDispatch();

  let destination_busses = [];
  let origen_busses = [];

  // useEffect(() => {

  // console.log("-----", Buses);
  //   // console.log(origen_busses);
  // });

  Buses.map((item, a) => {
    // console.log("----", destination);
    for (var i = 0; i < item.route.length; i++) {
      if (item.route[i].stop == destination.title) {
        // console.log(i, "--", item.route[i].stop);
        //destination mojood hai
        destination_busses.push(item);
      } else if (item.route[i].stop == initialstop.title) {
        //destination mojood hai
        origen_busses.push(item);
      }

      // console.log("-----1", orign_busses);
    }
  });
  let latitude = null;
  let longitude = null;
  let more = null;
  const getStop = (find) => {
    // console.log("find");
    // console.log(find);
    Stops.map((value, i) => {
      if (value.key == find) {
        // console.log("ma");
        // console.log(value.title);
        // more.push(value.location);
        more = value.title;
        latitude = value.location.latitude;
        longitude = value.location.longitude;
        return value.title;
      }
    });
  };
  var is_destinationFound = false;
  const ItemViewer = ({ item }) => {
    // console.log("now");
    // console.log(item);
    for (var i = 0; i < item.route.length; i++) {
      if (item.route[i].stop == destination.title) {
        is_destinationFound = true;
        return (
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.busName}>{item.title}</Text>
            <View style={{ flex: 1, flexDirection: "row", paddingBottom: 10 }}>
              <Text style={{ color: "green", flex: 1 }}>
                Bus Fare:
                {getDistance(initialstop.location, destination.location) * 0.01}
                Rs
              </Text>
              <Text style={{ color: "black" }}>
                {getDistance(initialstop.location, destination.location)}
                {"m"}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", paddingBottom: 10 }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 18,
                  flex: 1,
                }}
              >
                {initialstop.title}
              </Text>
              <Text
                style={{
                  textAlign: "right",
                  color: "black",
                  fontSize: 18,
                  flex: 1,
                }}
              >
                {destination.title}
              </Text>
            </View>

            <TouchableOpacity
              style={({ marginLeft: 15 }, tw`mt-2 p-2 `)}
              onPress={() => {
                // alert("Id : " + item.key + " Title : " + item.name);
                // dispatch(setSelectedBus(item));
                navigation.navigate("MapScreen", {
                  bus: [item, destination, initialstop],
                });
              }}
            >
              <Icon
                style={{
                  padding: 2,
                  backgroundColor: "black",
                  marginTop: 4,
                  // width: 10,
                }}
                name="arrowright"
                color="white"
                type="antdesign"
              />
            </TouchableOpacity>
          </Card>
        );
      }
    }
    if (!is_destinationFound) {
      for (var j = 0; j < item.route.length; j++) {
        // return <Text>Ahsan</Text>;
        for (var k = 0; k < destination_busses.length; k++) {
          for (var s = 0; s < destination_busses[k].route.length; s++) {
            if (destination_busses[k].route[s].stop == item.route[j].stop) {
              const n = getStop(destination_busses[k].route[s].stop);
              console.log(n);
              console.log("me");
              return (
                <Card containerStyle={styles.cardStyle}>
                  <View
                    style={{ flex: 1, flexDirection: "row", paddingBottom: 10 }}
                  >
                    <Text
                      style={[styles.busName, { textAlign: "left", width: 80 }]}
                    >
                      {item.name}
                    </Text>
                    <MaterialCommunityIcons
                      name="arrow-left"
                      color="black"
                      size={25}
                      style={{ alignSelf: "center" }}
                    />
                    <Text
                      style={{
                        textAlign: "right",
                        color: "black",
                        fontSize: 18,
                        flex: 1,
                      }}
                    >
                      {initialstop.title}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="arrow-down"
                    color="black"
                    size={25}
                    // style={{ alignSelf: "left" }}
                  />
                  <View
                    style={{ flex: 1, flexDirection: "row", paddingBottom: 10 }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        color: "black",
                        fontSize: 18,
                        flex: 1,
                        // width: 100,
                      }}
                    >
                      {more}
                    </Text>
                    <MaterialCommunityIcons
                      name="arrow-right"
                      color="black"
                      size={25}
                      // style={{ alignSelf: "center" }}
                    />
                    <Text
                      style={{
                        textAlign: "right",
                        color: "black",
                        fontSize: 18,
                        flex: 1,
                      }}
                    >
                      {destination_busses[k].name}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name="arrow-down"
                    color="black"
                    size={25}
                    style={{ alignSelf: "flex-end" }}
                  />
                  <View
                    style={{ flex: 1, flexDirection: "row", paddingBottom: 10 }}
                  >
                    <Text
                      style={{
                        textAlign: "right",
                        color: "black",
                        fontSize: 18,
                        flex: 1,
                      }}
                    >
                      {destination.title}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={({ marginLeft: 15 }, tw`mt-2 p-2 `)}
                    onPress={() => {
                      // alert("levol");
                      // dispatch(setSelectedBus(item));
                      navigation.navigate("MapScreen", {
                        multipleBus: [
                          item,
                          latitude,
                          destination,
                          longitude,
                          initialstop,
                          more,
                        ],
                      });
                    }}
                  >
                    <Icon
                      style={{
                        padding: 2,
                        backgroundColor: "black",
                        marginTop: 4,
                        // width: 10,
                      }}
                      name="arrowright"
                      color="white"
                      type="antdesign"
                    />
                  </TouchableOpacity>
                </Card>
              );
            }
          }
          // return <Text>ahsan</Text>;
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={origen_busses}
        renderItem={ItemViewer}
        keyExtractor={(item) => item.title}
      />
      {/* {console.log(destination_busses)} */}
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    height: "40%",
    // flex: 1,
    // marginBottom: 40,
    padding: 10,
  },
  headingText: {
    textAlign: "center",
    paddingTop: 40,
    fontSize: 20,
  },
  cardStyle: {
    paddingTop: 20,
    // paddingBottom:
    marginBottom: 10,
    backgroundColor: "white",
    // height: height * 0.25,
    flex: 1,
    borderRadius: 30,
    // flexDirection: "row",
  },
  busName: {
    textAlign: "center",
    color: "black",
    fontSize: 18,
    fontFamily: "sans-serif",
    paddingBottom: 10,
  },
  routes: {
    textAlign: "left",
    color: "green",
    fontSize: 16,
  },
});
