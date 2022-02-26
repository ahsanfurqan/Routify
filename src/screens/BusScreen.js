import React, { useRef, useState, useEffect } from "react";
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
  Alert,
  ToastAndroid,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import env from "../../app/environment/environment";

import Toast from "react-native-toast-message";
import axios from "axios";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function BusScreen() {
  const [name, setname] = useState("");
  const [fare, setFare] = useState("");
  const [stops, setStops] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  let location = [];

  const clearData = () => {
    setname("");
    setFare("");
  };
  const stopref = useRef(null);
  const onSubmit = async () => {
    selectedItems.map((val, i) => {
      location.push({ stop: val });
    });
    try {
      let res = await axios.post(`${env.baseUrl}/insert/bus`, {
        title: name,
        route: location,
      });
      Toast.show({
        type: "success",
        text1: "Bus Added",
        text2: "👋",
      });
      // ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Bus not added",
        text2: "data duplication",
      });
      // Alert.alert("Error", JSON.stringify(err));
    }
    // let res = await
    // console.log(location);
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
      <Toast />
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

          <Text style={styles.label}>Stops</Text>

          <MultiSelect
            ref={stopref}
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
              onPress={() => onSubmit()}
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
// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   TextInput,
//   KeyboardAvoidingView,
//   TouchableOpacity,
//   FlatList,
//   ScrollView,
// } from "react-native";

// import axios from "axios";

// export default function BusScreen() {
//   const [stopsData, setStopsData] = useState([]);
//   const [searchBar, setSearchBar] = useState("");
//   const [StopsSelectBar, setStopsSelectBar] = useState(false);
//   const [selectedBusStops, setSelectedBusStops] = useState([]);
//   const [selectFair, setSelectFair] = useState("");

//   const getStops = async () => {
//     try {
//       let res = await axios.get(
//         `https://routify-backend.herokuapp.com/getAllstops`,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log(res.data);
//       setStopsData(res.data);
//       // console.log(res.data);
//     } catch (err) {
//       console.log("===", err);
//     }
//   };
//   useEffect(() => {
//     getStops();
//   }, []);

//   //   //TODO: Filter Stops Data
//   const filterBusStops = stopsData.filter((item) => {
//     return item.title.toLowerCase().indexOf(searchBar.toLowerCase()) !== -1;
//   });
//   const onSelectStops = (val) => {
//     const buses = [...selectedBusStops];
//     buses.push(val);
//     setSelectedBusStops(buses);
//   };
//   console.log(selectedBusStops);
//   const sendData = () => {
//     console.log(selectedBusStops);
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text
//           style={{
//             fontSize: 30,
//             fontWeight: "bold",
//             alignSelf: "center",
//             color: "white",
//           }}
//         >
//           Add Bus
//         </Text>
//       </View>
//       <View style={styles.footer}>
//         <View>
//           <Text style={styles.label}>Stops</Text>
//           <TextInput
//             value={searchBar}
//             onKeyPress={() => setStopsSelectBar(true)}
//             onChangeText={setSearchBar}
//             placeholder="Search stops"
//             style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
//             placeholderTextColor="#000"
//           />
//           {StopsSelectBar == true && (
//             <View style={styles.listBarCont}>
//               <FlatList
//                 nestedScrollEnabled
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={styles.stopsDataList}
//                 scrollEnabled={true}
//                 data={filterBusStops}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item, index }) => {
//                   return (
//                     <Text
//                       style={styles.stopsName}
//                       onPress={() => onSelectStops(item.title)}
//                     >
//                       {item.title}
//                     </Text>
//                   );
//                 }}
//               />
//             </View>
//           )}
//           <TextInput
//             value={selectFair}
//             onPressIn={() => setStopsSelectBar(true)}
//             onChangeText={setSelectFair}
//             placeholder="Enter fair"
//             style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
//             placeholderTextColor="#000"
//           />
//           <View style={{ paddingTop: 20 }}>
//             <TouchableOpacity
//               style={styles.appButtonContainer}
//               onPress={() => sendData()}
//             >
//               <Text style={styles.appButtonText}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{ paddingTop: 20 }}>
//             <TouchableOpacity
//               style={styles.appButtonContainer}
//               onPress={() => setSelectedBusStops([])}
//             >
//               <Text style={styles.appButtonText}>Clear</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#009387",
//   },
//   header: {
//     flex: 2,
//     justifyContent: "center",
//     // alignItems: "center",
//     left: 10,
//   },
//   footer: {
//     flex: 7,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingVertical: 50,
//     paddingHorizontal: 30,
//   },
//   title: {
//     color: "#05375a",
//     fontSize: 30,
//     fontWeight: "bold",
//   },
//   button: {
//     alignItems: "flex-end",
//     // justifyContent: "center",
//     marginTop: 30,

//     // paddingVertical: 12,
//     // paddingHorizontal: 32,
//     // borderRadius: 4,
//     // elevation: 3,
//     // backgroundColor: "black",
//   },
//   submit: {
//     width: 150,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 50,
//     flexDirection: "row",
//   },
//   textsign: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   label: {
//     fontSize: 18,
//     padding: 6,
//     fontFamily: "sans-serif",
//   },
//   card: {
//     paddingTop: 20,
//     backgroundColor: "white",
//     borderRadius: 30,
//   },
//   appButtonContainer: {
//     elevation: 8,
//     backgroundColor: "#009688",
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//   },
//   appButtonText: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "bold",
//     alignSelf: "center",
//     textTransform: "uppercase",
//   },
//   // Select Stops
//   listBarCont: {
//     height: 300,
//     borderWidth: 1,
//     elevation: 8,
//     backgroundColor: "#fff",
//     borderColor: "#fff",
//   },
//   stopsDataList: {
//     width: "100%",
//     alignSelf: "center",
//   },
//   stopsName: {
//     padding: 10,
//     lineHeight: 20,
//     fontSize: 18,
//   },
// });
