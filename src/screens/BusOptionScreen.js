import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectDestination, selectInitialStop } from "../../slices/navSlice";
import { Stops } from "../../Data/stop";
import { Buses } from "../../Data/Buses";
import { getDistance } from "geolib";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height - 65;

export default function BusOptionScreen(props) {
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  const initialstop = useSelector(selectInitialStop);
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
    if (
      item.route[1].stop == initialstop.key ||
      item.route[2].stop == initialstop.key ||
      item.route[3].stop == initialstop.key
    ) {
      if (
        item.route[1].stop == destination.key ||
        item.route[2].stop == destination.key ||
        item.route[3].stop == destination.key
      ) {
        return (
          <View style={styles.cardStyle}>
            <Text style={styles.busName}>{item.name}</Text>
            <Text style={{ color: "green" }}>Number of stops</Text>
            {distance()}

            <Text style={{ textAlign: "left", color: "green", fontSize: 18 }}>
              {initialstop.title}
            </Text>
            <Text style={{ textAlign: "right", color: "red", fontSize: 18 }}>
              {destination.title}
            </Text>
          </View>
        );
      }
    }
  };

  const distance = () => {
    return (
      <Text style={{ color: "green" }}>
        {getDistance(initialstop.location, destination.location)}
        {"m"}
      </Text>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingText}>
        Following are the Buses
        {/* <Ionicons name="md-bus" size={25} style={{ alignSelf: "center" }} /> */}
      </Text>
      <FlatList data={Buses} renderItem={ItemViewer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  headingText: {
    textAlign: "center",
    paddingTop: 40,
    fontSize: 20,
  },
  cardStyle: {
    paddingTop: 20,
    backgroundColor: "black",
    height: height * 0.3,
  },
  busName: {
    textAlign: "center",
    color: "green",
    fontSize: 18,
    fontFamily: "sans-serif",
  },
  routes: {
    textAlign: "left",
    color: "green",
    fontSize: 16,
  },
});
