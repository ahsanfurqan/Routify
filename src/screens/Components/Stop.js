import React from "react";
import { View, Text, FlatList } from "react-native";
import MapView, { Marker, AnimatedReigon, Animated } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Stop(props) {
  const stop = props.stop
    ? props.stop
    : {
        key: "nostops",
        title: "null",
        location: { latitude: 0, longitude: 0 },
      };

  const coordinate = stop.location;
  console.log(coordinate);
  return (
    <Marker
      coordinate={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      }}
      pinColor="red"
      style={{ width: 50, height: 50 }}
    >
      {/* <MaterialCommunityIcons name="bus-marker" size={24} color="black" /> */}
    </Marker>
  );
}
