import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import logo from "../../../assets/bus_image.jpg";
import { Buses } from "../../../Data/Buses";
import BusOptionScreen from "../BusOptionScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
// import "tailwind-react-native-classnames" as tw
import tw from "tailwind-react-native-classnames";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = height * 0.3;
const Tab = createBottomTabNavigator();
export default function RideOptionCard(props) {
  const navigation = useNavigation();
  // console.log(props.item);
  return (
    <View style={tw`bg-white h-full w-full flex-grow`}>
      <View>
        <View style={tw`top-3 p-3 left-5 rounded-full absolute z-10`}>
          <MaterialIcons
            name="cancel"
            color="black"
            size={20}
            onPress={() => {
              //   console.log("ride");
              navigation.navigate("MapScreen");
            }}
          />
        </View>

        <Text style={tw`text-center py-5 text-xl`}>Pick a ride</Text>
      </View>

      <BusOptionScreen
        item={props.item}
        stops={props.stops}
        busses={props.busses}
      />
      {/* <ScrollView
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {Buses.map((bus, index) => {
          return (
            <View style={styles.card} key={index}>
              <Image source={logo} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{bus.name}</Text>
              <Text style={styles.cardDescription}>Gulshan</Text>
              <Text style={styles.cardDescription}>Korangi</Text>
            </View>
          );
        })}
      </ScrollView> */}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // zIndex: 9,
    // flex: 1,
    position: "relative",
    top: 0,
    bottom: 0,
    // left: 0,
    // right: 0,
    // paddingVertical: 20,
    // paddingHorizontal: 20,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // flexDirection: "column",
    flex: 1,
    // justifyContent: "space-between",
    // backgroundColor: "#f5f5f5",
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // marginHorizontal: 10,
    // shadowColor: "#000",
    // shadowRadius: 5,
    // shadowOpacity: 0.3,
    // shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: width,
    // borderWidth: 4,
    // borderColor: "black",
    marginBottom: 20,
    paddingBottom: 20,
    // overflow: "hidden",
    // marginBottom: 20,
  },

  cardImage: {
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    // overflow: "hidden",
    // shadowRadius: 5,
    // shadowOpacity: 0.3,
    // zIndex: 1111,
    resizeMode: "contain",
    // overflow: "hidden",
    // borderRadius: 40,
    // flex: 1,
    width: 150,
    height: 60,
    alignSelf: "center",
    // color: "grey",
    // borderWidth: 3,
    // backgroundColor: "grey",
    // borderColor: "black",
  },
});
