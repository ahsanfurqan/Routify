import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  SafeAreaView,
} from "react-native";
import ViewResponder from "./responder";

const Displaybuses = () => {
  const [busStopsData, setBusStopsData] = useState([]);
  useEffect(() => {
    fetchBussesFronDB();
  }, []);

  const fetchBussesFronDB = async () => {
    try {
      const getStopsValue = await axios.get(
        "https://routify-backend.herokuapp.com/getBusses"
      );
      setBusStopsData(getStopsValue);
    } catch (error) {
      console.log(error);
    }
  };
  const ShowList = (item, index) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          height: 50,
          marginVertical: 10,
        }}
      >
        <ViewResponder stopKey={item.key} stopName={item.title} api="bus" />
      </View>
    );
  };
  return (
    <View style={styles.main}>
      {busStopsData === 0 ? (
        <ActivityIndicator size={50} color={"#000"} />
      ) : (
        <FlatList
          data={busStopsData.data}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => ShowList(item, index)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default Displaybuses;
