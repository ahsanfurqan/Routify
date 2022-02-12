import { SafeAreaView, StyleSheet, Text, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
// import "tailwind-react-native-classnames" as tw
import tw from "tailwind-react-native-classnames";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RideOptionCard() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white h-full w-full flex-grow`}>
      <View style={tw`flex-1 z-10`}>
        <View style={tw`top-3 p-3 left-5 rounded-full absolute z-10`}>
          <MaterialIcons
            name="cancel"
            color="black"
            size={25}
            onPress={() => {
              //   console.log("ride");
              navigation.navigate("MapScreen");
            }}
          />
        </View>
        <Text style={tw`text-center py-5 text-xl`}>Pick a ride</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // flexGrow:
  },
  textHeader: {
    alignItems: "center",
    fontWeight: "bold",
  },
});
