import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function HistoryButton(props) {
  const history = props.history
    ? props.history
    : () => console.log("history Pressed");
  return (
    <View
      style={{
        top: height * 0.35,
        zIndex: 999,
        position: "absolute",
        backgroundColor: "white",
        justifyContent: "space-around",
        left: width - 50,
        borderRadius: 50,
        shadowColor: "#000000",
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        justifyContent: "space-around",
        alignItems: "center",
        width: 45,
        height: 45,
        // flex: 1,
      }}
    >
      <FontAwesome5
        name="history"
        size={20}
        color="black"
        onPress={() => {
          history();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
