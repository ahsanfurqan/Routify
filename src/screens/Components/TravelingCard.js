import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Card, Icon } from "react-native-elements";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function TravelingCard() {
  return (
    <View style={styles.container}>
      {/* <MaterialIcons name="cancel" color="black" size={24} /> */}

      <Card containerStyle={styles.Cardcontainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <MaterialIcons
            name="cancel"
            color="black"
            size={24}
            onPress={() => {}}
          />
        </View>
        <Text style={{ color: "black", paddingTop: 10 }}> Trip Details </Text>
        <View style={styles.textContainer}>
          <Text
            style={{ color: "green", textAlign: "left", flex: 1, fontSize: 18 }}
          >
            From your place
          </Text>
          <MaterialCommunityIcons
            name="arrow-left-right-bold"
            color="black"
            size={25}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              color: "orange",
              textAlign: "right",
              flex: 1,
              fontSize: 18,
              left: 10,
            }}
          >
            To this place
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: "red",
              textAlign: "center",
              left: 10,
              fontSize: 16,
            }}
          >
            Your stop is number of stops ahead
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  Cardcontainer: {
    // zIndex: 9,
    flex: 1,
    position: "absolute",
    // flexDirection: "row",
    width: width - 20,
    height: height * 0.25,
    // top: 80,
    // left: 20,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "white",
    // alignItems: "center",
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  container: {
    flex: 1,
    position: "absolute",
    top: height * 0.7,
    width: width,
  },
  textContainer: {
    // flex: 1,
    paddingTop: 10,
    width: width * 0.75,
    flexDirection: "row",
  },
});
