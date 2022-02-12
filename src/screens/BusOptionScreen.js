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
import { Buses } from "../../Data/Buses";
import { getDistance } from "geolib";
import { Card, Icon } from "react-native-elements";
import { object } from "yup";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.3;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height - 65;

export default function BusOptionScreen({ item }) {
  const navigation = useNavigation();
  const [temp, settemp] = useState(true);
  const destination = item;
  // console.log(props.item);
  // const destination = useSelector(selectDestination);
  const initialstop = useSelector(selectInitialStop);
  const dispatch = useDispatch();

  let destination_busses = [];
  let origen_busses = [];
  useEffect(() => {
    Buses.map((item, a) => {
      for (var i = 0; i < item.route.length; i++) {
        if (item.route[i].stop == destination.key) {
          //destination mojood hai
          destination_busses.push(item);
        } else if (item.route[i].stop == initialstop.key) {
          //destination mojood hai
          origen_busses.push(item);
        }
        // if (
        //   item.route[1].stop == initialstop.key ||
        //   item.route[2].stop == initialstop.key ||
        //   item.route[0].stop == initialstop.key
        // ) {
        //   if (
        //     item.route[1].stop == destination.key ||
        //     item.route[2].stop == destination.key ||
        //     item.route[0].stop == destination.key
        //   ) {

        // }
      }
    });
    console.log(destination_busses);
    // console.log(origen_busses);
  });

  var is_destinationFound = false;
  const ItemViewer = ({ item }) => {
    for (var i = 0; i < item.route.length; i++) {
      if (item.route[i].stop == destination.key) {
        is_destinationFound = true;
        return (
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.busName}>{item.name}</Text>
            <View style={{ flex: 1, flexDirection: "row", paddingBottom: 10 }}>
              <Text style={{ color: "green", flex: 1 }}>
                Bus Fare:{item.fare}Rs
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
                  bus: [item, destination],
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
      console.log(is_destinationFound);
      if (!is_destinationFound) {
        // console.log("here");
        // console.log(item.name);
        for (var k = 0; k < item.route.length; k++) {
          console.log("done");
          multiplestops();
          destination_busses.map((value, index) => {
            console.log("ajao");
            for (var j = 0; j < value.route.length; j++) {
              if (item.routes[k].stop == value.route[j].stop) {
                console.log(item.name);
                console.log(value.name);
                return (
                  <Card containerStyle={styles.cardStyle}>
                    <Text style={styles.busName}>ahsan</Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingBottom: 10,
                      }}
                    >
                      <Text style={{ color: "green", flex: 1 }}>
                        Bus Fare:{item.fare}Rs
                      </Text>
                      <Text style={{ color: "black" }}>
                        {getDistance(
                          initialstop.location,
                          destination.location
                        )}
                        {"m"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          // textAlign: "left",
                          color: "black",
                          fontSize: 18,
                          flex: 1,
                        }}
                      >
                        {initialstop.title}
                      </Text>
                      <Text
                        style={{
                          // textAlign: "right",
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
                          bus: [item, destination],
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
          });
        }
      }
    }
  };

  //     // if (
  //     //   item.route[1].stop == initialstop.key ||
  //     //   item.route[2].stop == initialstop.key ||
  //     //   item.route[0].stop == initialstop.key
  //     // ) {
  //     //   if (
  //     //     item.route[1].stop == destination.key ||
  //     //     item.route[2].stop == destination.key ||
  //     //     item.route[0].stop == destination.key
  //     //   ) {

  //     // }

  return (
    <View style={styles.container}>
      <FlatList
        data={origen_busses}
        renderItem={ItemViewer}
        keyExtractor={(item) => item.key}
      />
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
