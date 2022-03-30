import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function LogoutButton(props) {
  const logout = props.logout
    ? props.logout
    : () => console.log("logout Pressed");
  return (
    <View
      style={{
        top: height * 0.45,
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
      <AntDesign
        name="logout"
        size={20}
        color="black"
        onPress={() => logout()}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
