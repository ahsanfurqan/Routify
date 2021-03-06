import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
function CureentLocationButton(props) {
  const cb = props.cb
    ? props.cb
    : () => console.log("current Location Pressed");
  const bottom = props.bottom ? props.bottom : 65;
  return (
    <View style={[styles.container, { top: height - bottom }]}>
      <MaterialIcons
        name="my-location"
        color="#000000"
        size={25}
        onPress={() => {
          cb();
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    left: width - 70,
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
export default CureentLocationButton;
