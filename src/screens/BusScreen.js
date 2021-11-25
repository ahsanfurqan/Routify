import React from "react";
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
} from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function BusScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={"position"}>
        <View
          style={{
            paddingTop: height - 600,
            backgroundColor: "#90ee90",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 32 }}>Add Bus</Text>
        </View>

        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
          />
          <Text style={styles.label}></Text>
          <TextInput
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
          />

          <Text style={styles.label}>Longitude</Text>
          <TextInput
            style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    padding: 6,
    fontFamily: "sans-serif",
  },
});
