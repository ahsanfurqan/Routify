import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Card, Icon } from "react-native-elements";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function TravelingCard(props) {
  const navigation = useNavigation();
  const stops = props.stop ? props.stop : 1;
  return (
    <View style={styles.container}>
      {/* <MaterialIcons name="cancel" color="black" size={24} /> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("clicked");
          // navigation.navigate("MapScreen");
        }}
        // style={styles.button}
      >
        <MaterialIcons name="cancel" color="black" size={24} />
      </TouchableOpacity>
      {/* <Card containerStyle={styles.Cardcontainer}>
        <Text style={{ color: "black", paddingTop: 10 }}> Trip Details </Text>
        <View style={styles.textContainer}>
          <Text
            style={{ color: "green", textAlign: "left", flex: 1, fontSize: 18 }}
          >
            {props.from}
          </Text>
          <MaterialCommunityIcons
            name="arrow-left-right-bold"
            color="black"
            size={25}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={[
              {
                textAlign: "right",
                flex: 1,
                fontSize: 18,
                left: 10,
              },
              stops == 1 ? { color: "red" } : { color: "orange" },
            ]}
          >
            {props.to}
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
            Your stop is {stops} stops ahead
          </Text>
        </View>
      </Card> */}
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
    zIndex: 9,
    position: "absolute",
    width: 45,
    height: 45,
    backgroundColor: "#fff",
    left: width - 70,
    // borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: "space-around",
    alignItems: "center",
  },
  textContainer: {
    // flex: 1,
    paddingTop: 10,
    width: width * 0.75,
    flexDirection: "row",
  },
  button: {
    zIndex: 9,
    backgroundColor: "#fff",
    // left: width * 0.8,
    borderRadius: 50,
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: "space-around",
    // alignItems: "center",
    // position: "absolute",
    // width: width * 0.1,
    // height: height
  },
});
