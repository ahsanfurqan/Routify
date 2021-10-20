import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import {
  selectOrigin,
  setDestination,
  setOrigin,
} from "../../../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;

export default function Search() {
  const dispatch = useDispatch();
  //   const navigation = useNavigation();

  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="where from?"
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        onPress={(data, details = null) => {
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            })
          );

          // console.log(data)
          // console.log(details)
        }}
        fetchDetails={true}
        minLength={2}
        enablePoweredByContainer={false}
        returnKeyType={"search"}
        // currentLocation={true}
        // currentLocationLabel="Current location"
        styles={{
          container: {
            // flex: 0,
            zIndex: 9,
            position: "absolute",
            // flexDirection: "row",
            width: Dimensions.get("window").width - 40,
            // height: 60,
            top: 80,
            left: -155,
            // borderRadius: 2,
            backgroundColor: "white",
            // alignItems: "center",
            shadowColor: "#000000",
            elevation: 7,
            // shadowRadius: 5,
            // shadowOpacity: 1.0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        // currentLocation={true}
        // currentLocationLabel="Current location"
      />
    </View>
  );
}
