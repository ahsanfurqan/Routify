import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import ViewResponder from "./responder";

const Displaystops = () => {
  const [busStopsData, setBusStopsData] = useState([]);
  useEffect(() => {
    fetchStopsFronDB();
  }, []);

  const fetchStopsFronDB = async () => {
    try {
      const getStopsValue = await axios.get(
        "https://routify-backend.herokuapp.com/getAllstops"
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
          height: 100,
          marginVertical: 10,
        }}
      >
        <ViewResponder stopKey={item.key} stopName={item.title} />
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
  },
});

export default Displaystops;
