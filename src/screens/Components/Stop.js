import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker, AnimatedReigon, Animated } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Stop(props) {
  const stop = props.stop
    ? props.stop
    : {
        sid: "nostops",
        location: { latitude: 0, longitude: 0 },
      };

  const coordinate = {
    latitude: stop.location.latitude,
    longitude: stop.location.longitude,
  };
  return (
    <View>
      <Marker
        coordinate={coordinate}
        anchor={{ x: 0.35, y: 0.32 }} //
        style={{ width: 50, height: 50 }}
      >
        <MaterialCommunityIcons name="bus-marker" size={24} color="black" />
      </Marker>
    </View>
  );
}
