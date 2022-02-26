import React, { useState, useEffect } from "react";
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
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import env from "../../app/environment/environment";

import axios from "axios";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function BusScreen() {
  const [name, setname] = useState("");
  const [stops, setStops] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const clearData = () => {
    setname("");
  };
  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };
  const getStops = async () => {
    try {
      let res = await axios.get(`${env.baseUrl}/getAllStops`, {
        withCredentials: true,
      });
      setStops(res.data);
      // console.log(res.data);
    } catch (err) {
      console.log("===", err);
    }
  };
  useEffect(() => {
    getStops();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            alignSelf: "center",
            color: "white",
          }}
        >
          Add Bus
        </Text>
      </View>
      <View style={styles.footer}>
        <KeyboardAvoidingView behavior={"position"}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setname(text)}
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
          />
          <MultiSelect
            items={stops}
            uniqueKey="title"
            hideSelect={true}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Pick route"
            // searchInputPlaceholderText="Search Items..."
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            hideSubmitButton={true}
            searchInputStyle={{ color: "#CCC" }}
            styleDropdownMenu={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              padding: 10,
            }}
            // textInputProps={{ borderWidth: 20, color: "black" }}
            // submitButtonColor="#48d22b"
            // submitButtonText="Submit"
            // hideDropdown={true}
            // hideTags={true}
            displayKey="title"
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
        </KeyboardAvoidingView>
      </View>
    </View>
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
