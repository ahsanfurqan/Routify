//no use till now

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
// const width = Dimensions.get("window").height;

export default function DestinationButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SearchScreen");
      }}
      style={styles.container}
    >
      <View style={styles.leftCol}>
        <Text style={{ fontSize: 8 }}>{"\u2B24"}</Text>
      </View>
      <View style={styles.centerCol}>
        <Text
          style={{
            fontFamily: "sans-serif-thin",
            fontSize: 21,
            color: "#c0c0c0",
          }}
        >
          Where to go?
        </Text>
      </View>
      <View style={styles.rightCol}>
        <Ionicons
          name="md-bus"
          color="#c0c0c0"
          size={25}
          style={{ alignSelf: "center" }}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    flexDirection: "row",
    width: width - 40,
    height: 60,
    top: 80,
    left: 20,
    borderRadius: 2,
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  leftCol: {
    flex: 1,
    alignItems: "center",
  },
  centerCol: {
    flex: 4,
  },
  rightCol: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: "#ededed",
  },
});
