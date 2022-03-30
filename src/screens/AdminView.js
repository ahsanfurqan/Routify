import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from "react-native";
import React from "react";
import axios from "axios";
import env from "../../app/environment/environment";

import AppText from "../../app/components/text/AppText";
import { authStyle } from "../../app/config/styles";
import EventButton from "../../app/components/form/EventButton";

import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function AdminView() {
  const navigateToAddBus = () => navigation.navigate("BusScreen");
  const navigateToAddStop = () => navigation.navigate("StopScreen");
  const navigateToDisplayBusses = () => navigation.navigate("DisplayBuses");
  const navigateToDisplayStops = () => navigation.navigate("DisplayStops");
  const loggingout = async () => {
    try {
      let res = await axios.post(`${env.baseUrl}/logout`, {
        withCredentials: true,
      });
      if (res.status == 200) {
        BackHandler.exitApp();
      }
    } catch (err) {
      console.log("===", err);
    }
  };
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/admin.jpg")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.footer}>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={navigateToAddBus}
          >
            <Text style={styles.appButtonText}>Add Bus</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={navigateToAddStop}
          >
            <Text style={styles.appButtonText}>Add Stop</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={navigateToDisplayBusses}
          >
            <Text style={styles.appButtonText}>See Buses</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={navigateToDisplayStops}
          >
            <Text style={styles.appButtonText}>See Stops</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => loggingout()}
          >
            <Text style={styles.appButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    left: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    marginTop: 100,
    width: 250,
    height: 180,
    marginLeft: 56,
    marginBottom: 80,
  },
  button: {
    alignItems: "flex-end",
    marginTop: height * 0.1,
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
