import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  Label,
  Platform,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { host } from "@env";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function StopsScreen() {
  const [name, setname] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");

  const sendData = () => {
    // console.log(host);
    if (name == "" || latitude == "" || longitude == "") {
      Alert.alert("Error", "Fields can't be empty");
    } else {
      fetch("http://" + host + ":5000/insert/stop", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: name,
          location: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.092,
            longitudeDelta: 0.0421,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data == "Success") Alert.alert(data, "data inserted");
          else {
            Alert.alert("Error", data);
          }
        })
        .catch((error) => console.error(error.message));
    }
  };
  const clearData = () => {
    setname("");
    setlatitude("");
    setlongitude("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",

            color: "white",
          }}
        >
          Add Stops
        </Text>
      </View>
      <View style={styles.footer}>
        <KeyboardAvoidingView behavior={"position"}>
          {/* <View style={{ paddingTop: 20, borderTopStartRadius: 20 }}> */}

          {/* <View> */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setname(text)}
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
          />
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            value={latitude}
            onChangeText={(text) => setlatitude(text)}
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
          />

          <Text style={styles.label}>Longitude</Text>
          <TextInput
            value={longitude}
            onChangeText={(text) => setlongitude(text)}
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
          />
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => sendData()}
            >
              <Text style={styles.appButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 20 }}>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => clearData()}
            >
              <Text style={styles.appButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}

          {/* </View> */}
        </KeyboardAvoidingView>
      </View>
    </View>
    // <SafeAreaView style={styles.container}>
    //   <KeyboardAvoidingView behavior={"position"}>
    //     <View
    //       style={{
    //         paddingTop: height - 600,
    //         backgroundColor: "#28a745",
    //         // alignItems: "center",
    //         // color: "white",
    //       }}
    //     >
    //       <Text
    //         style={{
    //           fontSize: 32,
    //           paddingBottom: 20,
    //           fontFamily: "sans-serif",
    //           fontWeight: "bold",
    //           color: "white",
    //           left: 10,
    //         }}
    //       >
    //         Add Stop
    //       </Text>
    //     </View>
    //     {/* <View style={{ paddingTop: 20, borderTopStartRadius: 20 }}> */}
    //     <Card containerStyle={styles.card}>
    //       {/* <View> */}
    //       <Text style={styles.label}>Name</Text>
    //       <TextInput
    //         value={name}
    //         onChangeText={(text) => setname(text)}
    //         style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
    //       />
    //       <Text style={styles.label}>Latitude</Text>
    //       <TextInput
    //         value={latitude}
    //         onChangeText={(text) => setlatitude(text)}
    //         style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
    //       />

    //       <Text style={styles.label}>Longitude</Text>
    //       <TextInput
    //         value={longitude}
    //         onChangeText={(text) => setlongitude(text)}
    //         style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
    //       />
    //       <TouchableOpacity
    //         style={styles.appButtonContainer}
    //         onPress={() => sendData()}
    //       >
    //         <Text style={styles.appButtonText}>Submit</Text>
    //       </TouchableOpacity>
    //       {/* </View> */}
    //     </Card>
    //     {/* </View> */}
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    // alignItems: "center",
    left: 10,
  },
  footer: {
    flex: 7,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    alignItems: "flex-end",
    // justifyContent: "center",
    marginTop: 30,

    // paddingVertical: 12,
    // paddingHorizontal: 32,
    // borderRadius: 4,
    // elevation: 3,
    // backgroundColor: "black",
  },
  submit: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textsign: {
    color: "white",
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    padding: 6,
    fontFamily: "sans-serif",
  },
  card: {
    paddingTop: 20,
    backgroundColor: "white",
    // height: height * 0.25,
    // flex: 1,
    borderRadius: 30,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
