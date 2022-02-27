import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Moment from "moment";
const { height, width } = Dimensions.get("window");
const SearchHistory = ({ route, navigation }) => {
  const { data } = route.params;
  console.log("data---", data);
  Moment.locale("en");
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Rides</Text>
      </View>
      {data.map((val, i) => {
        // console.log()
        return (
          <View style={styles.historyContainer} key={val.date}>
            <View style={styles.dateAndPrice}>
              <Text style={styles.dpText}>
                {Moment(val.date).format("D MMM  h:mm a")},
              </Text>
              <Text style={styles.dpText}>PKR {val.fare}</Text>
            </View>
            <View style={styles.originAndDestinationInfo}>
              <View style={styles.timeline}>
                <View style={styles.from}></View>
                <View style={styles.line}></View>
                <View style={styles.to}></View>
              </View>
              <View style={styles.originAndDestination}>
                <Text style={styles.originAndDestinationText}>
                  {val.stops.origin}
                </Text>
                <Text style={styles.originAndDestinationText}>
                  {val.stops.destination}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: height * 0.12,
    backgroundColor: "#3AB44E",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    marginTop: height * 0.07,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  historyContainer: {
    width: "100%",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#a5a8a7",
  },
  dateAndPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dpText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "600",
  },
  originAndDestinationInfo: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
  },
  timeline: {
    width: "10%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  from: {
    borderWidth: 3,
    borderColor: "#3AB44E",
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  to: {
    borderColor: "#3AB44E",
    borderWidth: 2,
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "#3AB44E",
  },
  line: {
    borderColor: "#3AB44E",
    flexGrow: 1,
    borderWidth: 2,
    minHeight: 12,
    marginVertical: 5,
  },
  originAndDestination: {
    justifyContent: "space-between",
    width: "90%",
    paddingHorizontal: 10,
  },
  originAndDestinationText: {
    fontSize: 16,
    color: "#858585",
    fontWeight: "500",
  },
  uemail: {
    alignSelf: "flex-end",
    fontSize: 15,
    color: "#3AB44E",
  },
});

export default SearchHistory;
