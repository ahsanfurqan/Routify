import React from "react";
import { StyleSheet, Image } from "react-native";

export default function Logo(props) {
  return (
    <Image
      source={require("../../assets/routifyf.png")}
      style={props.style ? props.style : styles.logo}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    // aspectRatio:20,
    marginTop: 100,
    width: 250,
    height: 180,
    marginLeft: 56,
    marginBottom: 80,
  },
});
