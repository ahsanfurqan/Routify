import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  PanResponder,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

let screen_width = Dimensions.get("screen").width;
const ViewResponder = ({ stopKey, stopName }) => {
  const [dragValue, setDragValue] = useState(0);
  const [Vals, setVal] = useState(0);
  const [enableBtn, setEnableBtn] = useState("");

  const deleteBuses = () => {
    console.log(">>>>>>", stopKey);
    axios
      .delete("https://routify-backend.herokuapp.com/delete/bus", {
        key: stopKey,
        headers: token,
      })
      .then(() => console.log("deleted"))
      .catch((e) => console.log("err in deleting", e));
  };

  const panResponder = PanResponder.create({
    //** Enables the panresponder */
    onStartShouldSetPanResponder: (evt, getstureState) => true,

    //** Respond when pressing finger  */
    onPanResponderMove: (evt, getstureState) => {
      //
      let val = getstureState.moveX - Vals;
      setDragValue(val);
    },

    //** Respond when draging finger */
    onPanResponderGrant: (e, { x0, y0 }) => {
      setVal(x0);
    },

    //** Respond when releaser finger */
    onPanResponderRelease: () => {
      setDragValue(0);
      if (dragValue > screen_width * 0.5) {
        Alert.alert("Bro!", "should i delete?", [
          {
            text: "ok",
            onPress: () => deleteBuses(),
          },
          { text: "no", onPress: () => setEnableBtn("") },
        ]);
      } else if (enableBtn === "edit" && dragValue < -180) {
        Alert.alert("Bro!", "do you wanna edit?", [
          { text: "ok", onPress: () => setEnableBtn("") },
          { text: "no", onPress: () => setEnableBtn("") },
        ]);
      }
    },
  });

  useEffect(() => {
    if (dragValue > 0) {
      setEnableBtn("delete");
    } else if (dragValue < 0) {
      setEnableBtn("edit");
    }
  }, [dragValue]);

  return (
    <View style={styles.sliderContainer}>
      {dragValue !== 0 && (
        <Pressable
          style={[
            enableBtn === "delete" && styles.deleteBtn,
            enableBtn === "edit" && styles.editBtn,
          ]}
        >
          {enableBtn === "delete" && (
            <>
              <MaterialCommunityIcons
                name="delete-empty"
                size={40}
                color={"#fff"}
              />
              <Text>Delete Bus</Text>
            </>
          )}
          {enableBtn === "edit" && (
            <>
              <Feather name="edit-2" size={40} color="white" />{" "}
              <Text>Edit Bus Details</Text>
            </>
          )}
        </Pressable>
      )}
      <View
        style={[styles.viewCont, { left: dragValue }]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.appButtonText}>{stopName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    position: "relative",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  viewCont: {
    backgroundColor: "#009688",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: screen_width,
    zIndex: 1,
  },
  deleteBtn: {
    backgroundColor: "red",
    height: 100,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  editBtn: {
    backgroundColor: "green",
    width: screen_width,
    height: 100,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default ViewResponder;
