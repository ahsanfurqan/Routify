import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  TextInput,
} from "react-native";
import { Stops } from "../../Data/stop";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getDistance } from "geolib";
import {
  setDestination,
  selectDestination,
  selectOrigin,
  setInitialStop,
} from "../../slices/navSlice";
import { host } from "@env";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function SearchScreen({ route, navigation }) {
  // const navigation = useNavigation();
  const [search, setSearch] = useState("");
  // const Stops=route.params;
  // console.log(route.param)
  // const [Stops, setstop] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  // dispatch to send data to redux
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredDataSource(Stops);
    setMasterDataSource(Stops);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };
  const origin = useSelector(selectOrigin);
  const getItem = (item) => {
    // Function for click on an item
    // dispatch(setDestination(item));
    // console.log(Stops);
    const distance = Stops.map((busStop) => {
      const coord = busStop.location;
      return { coord, dist: getDistance(origin, coord) };
    });
    // const dist = getDistance(Stops.location, {
    //   latitude: origin.latitude,
    //   longitude: origin.longitude,
    // });
    const closest = distance.sort((a, b) => a.dist - b.dist)[0];
    // console.log(closest);
    // alert("Id : " + item.key + " Title : " + item.title);
    // console.log(distance);

    // looping through stops to get the nearest stop data
    for (var i = 0; i < Stops.length; i++) {
      if (
        closest.coord.latitude == Stops[i].location.latitude &&
        closest.coord.longitude == Stops[i].location.longitude
      ) {
        dispatch(setInitialStop(Stops[i]));
        // console.log(Stops[i]);
      }
    }
    // dispatch(setInitialStop(closest));
    // console.log(item);
    navigation.navigate("MapScreen", { ride_Card: item });
    // const destination = useSelector(selectDestination);
    // console.log(destination);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="destination bus stop.. "
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 40,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
  },
});
