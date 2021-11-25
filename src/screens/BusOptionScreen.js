import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height - 65;

export default function BusOptionScreen({ route, navigation }) {
  const nav = useNavigation();
  const [temp, settemp] = useState(true);
  const destination = route.params;
  // const destination = useSelector(selectDestination);
  const initialstop = useSelector(selectInitialStop);
  const dispatch = useDispatch();
  // dispatch(setDestination(destination));
  //   console.log(distance);
  //   console.log(destination);
  //   const ItemView = ({ item }) => {
  //     if (
  //       item.location.latitude == initialstop.coord.latitude &&
  //       item.location.longitude == initialstop.coord.longitude
  //     ) {
  //       setlocation(item);
  //       setdistance(
  //         getDistance(
  //           {
  //             latitude: item.location.latitude,
  //             longitude: item.location.longitude,
  //           },
  //           {
  //             latitude: destination.location.latitude,
  //             longitude: destination.location.longitude,
  //           }
  //         )
  //       );
  //     }
  //   };
  //   const bus = Buses.map((bus) => {
  //     if (
  //       bus.route[1].stop == initialstop.key ||
  //       bus.route[2].stop == initialstop.key ||
  //       bus.route[3].stop == initialstop.key
  //     ) {
  //       return bus.name;
  //     }
  //   });

  const ItemViewer = ({ item }) => {
    // console.log("ahsan");
    // console.log(item.route.length);
    // settemp(true);
    for (var i = 0; i < item.route.length; i++) {
      if (item.route[i].stop == initialstop.key) {
        // console.log(item.route[i]);
        Buses.map((bus) => {
          if (item.name != bus.name) {
            if (item.route[i].stop == bus.route[i].stop) {
              console.log("first");
              const d = bus.route[i].stop;
              for (var k = 0; k < item.route.length; k++) {
                if (bus.route[k].stop == destination.key) {
                  console.log("detect");
                  return (
                    <Card containerStyle={styles.cardStyle}>
                      <Text style={styles.busName}>{item.name}</Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          paddingBottom: 10,
                        }}
                      >
                        <Text style={{ color: "black", flex: 1 }}>
                          Number of stops
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
                          navigation.navigate("MapScreen", [item, destination]);
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
            }
          }
        });
        for (var j = 0; j < item.route.length; j++) {
          if (item.route[j].stop == destination.key) {
            // settemp(false);
            // console.log(item.route[j]);
            return (
              <Card containerStyle={styles.cardStyle}>
                <Text style={styles.busName}>{item.name}</Text>
                <View
                  style={{ flex: 1, flexDirection: "row", paddingBottom: 10 }}
                >
                  <Text style={{ color: "black", flex: 1 }}>
                    Number of stops
                  </Text>
                  <Text style={{ color: "black" }}>
                    {getDistance(initialstop.location, destination.location)}
                    {"m"}
                  </Text>
                </View>
                <View
                  style={{ flex: 1, flexDirection: "row", paddingBottom: 10 }}
                >
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
                    navigation.navigate("MapScreen", [item, destination]);
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
  };

  return (
    <View style={styles.container}>
      <FlatList data={Buses} renderItem={ItemViewer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headingText: {
    textAlign: "center",
    paddingTop: 40,
    fontSize: 20,
  },
  cardStyle: {
    paddingTop: 20,
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
