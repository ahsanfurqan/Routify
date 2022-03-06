import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import env from "../../../app/environment/environment";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDestination,
  selectInitialStop,
  setSelectedBus,
  setDestination,
} from "../../../slices/navSlice";
import { getDistance } from "geolib";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import { TouchableOpacity } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function TravelingCard(props) {
  const [user, setUser] = useState("");
  const [history, setHistory] = useState(null);

  const initialstop = useSelector(selectInitialStop);
  const destination = props.bus;
  // console.log("check---====", props.bus, "---------");
  var fare = 0;

  if (props.stop == 2) {
    fare = getDistance(props.bus[2].location, props.bus[4].location) * 0.01;
  } else {
    fare = getDistance(props.bus[1].location, props.bus[2].location) * 0.01;
  }
  const navigation = useNavigation();

  // console.log("1=---", destination);
  const saveHistory = async () => {
    console.log("pressses");
    try {
      let res = await axios.get(`${env.baseUrl}/profile`, {
        withCredentials: true,
      });
      setUser(res.data.profile);
      // console.log(res.data.profile);
      console.log("fare-----", fare);
      try {
        console.log(user.email);
        let second_res = await axios.post(`${env.baseUrl}/insert/history`, {
          // withCredentials: true,
          user_email: user.email,
          location: {
            destination: props.to,
            origin: props.from,
          },
          charges: parseInt(fare),
          bus_name: props.bus[0].title,
        });
        try {
          let result = await axios.post(`${env.baseUrl}/getHistory`, {
            email: res.data.profile.email,
          });
          setHistory(result.data);
          // console.log("history---", history);
          // console.log(result);
        } catch (err) {
          console.log("===", err);
        }
        navigation.navigate("MapScreen", history);
      } catch (err) {
        console.log("hello", err);
      }
    } catch (err) {
      console.log("err:", err.response.data);
    }
  };
  const stops = props.stop ? props.stop : 1;
  return (
    <View style={styles.container}>
      {/* <MaterialIcons name="cancel" color="black" size={24} /> */}
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("clicked");
          // navigation.navigate("MapScreen");
        }}
        // style={styles.button}
      >
        <MaterialIcons name="cancel" color="black" size={24} />
      </TouchableOpacity> */}

      <Card containerStyle={styles.Cardcontainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("clicked");
            navigation.navigate("MapScreen");
          }}
        >
          <MaterialIcons name="cancel" color="black" size={24} />
        </TouchableOpacity>
        <Text style={{ color: "black", paddingTop: 10, zIndex: 9 }}>
          {" "}
          Trip Details{" "}
        </Text>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: "#000000",
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              // alignSelf: "center",
            }}
          >
            {props.from}
          </Text>

          <MaterialCommunityIcons
            name="bus-double-decker"
            size={24}
            color="black"
            style={{ alignSelf: "center", margin: 10 }}
          />
          <MaterialCommunityIcons
            name="arrow-right-bold"
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
              stops == 1 ? { color: "#000000" } : { color: "black" },
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
        <TouchableOpacity
          style={{
            backgroundColor: "#EAEAEA",
            marginTop: 10,
            height: height * 0.05,
            width: width * 0.85,
            borderRadius: 30,
            borderColor: "black",
          }}
          onPress={() => {
            saveHistory();
          }}
        >
          <Text style={{ alignSelf: "center", marginTop: 10 }}>Trip Done</Text>
        </TouchableOpacity>
      </Card>
      {/* <View style={styles.end}>
        <TouchableOpacity>style={{ width: 82, height: 23 }}</TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  Cardcontainer: {
    // zIndex: -1,
    flex: 1,
    // position: "absolute",
    // flexDirection: "row",
    width: width - 20,
    height: height * 0.3,
    // top: 80,
    // left: 5,
    right: width * 0.00001,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#81E15F",
    // alignItems: "center",
    shadowColor: "#000000",
    // elevation: 7,
    // shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  container: {
    flex: 1,
    zIndex: 9,
    position: "absolute",
    // width: 45,
    // height: 45,
    // backgroundColor: "#fff",
    // left: width - 100,
    // left: 0,
    // right: width * 0.9,
    top: height * 0.65,
    borderRadius: 40,
  },
  textContainer: {
    // flex: 1,
    paddingTop: 10,
    width: width * 0.75,
    flexDirection: "row",
  },
  originContainer: {
    backgroundColor: "#DBDBDB",
    // paddingTop: 10,
    width: width * 0.3,
    height: height * 0.08,
    // flexDirection: "row",
  },
  end: {
    backgroundColor: "#EAEAEA",
    // height: "20",
  },
  button: {
    // zIndex: 9,
    // backgroundColor: "#fff",
    // left: width * 0.8,
    // borderRadius: 50,
    // shadowColor: "#000000",
    // elevation: 7,
    // shadowRadius: 5,
    // shadowOpacity: 1.0,
    // justifyContent: "space-around",
    // alignItems: "center",
    // position: "absolute",
    // width: width * 0.1,
    // height: height
  },
});
