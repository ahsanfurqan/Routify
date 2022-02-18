import React, { useState, useContext } from "react";
import {
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import AppText from "../components/text/AppText";
import H3 from "../components/text/H2";
import { authStyle } from "../config/styles";
import FormField from "../components/form/FormField";
import Form from "../components/form/Form";
import EventButton from "../components/form/EventButton";
import * as Yup from "yup";
import axios from "axios";
import environment from "../environment/environment";
import ErrorMessage from "../components/form/ErrorMessage";
import Colors from "../config/Colors";
import Logo from "../components/form/Logo";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required").label("username"),
  email: Yup.string().required("Required").email().label("Email"),
  password: Yup.string().required("Required").min(6).label("Password"),
});

const { width, height } = Dimensions.get("window");
export default function Register({ navigation }) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigateToLogin = () => navigation.navigate("Login");

  const handleSubmit = async ({ username, email, password }) => {
    console.log("hello");
    setLoading(true);
    try {
      let res = await axios.post(`${environment.baseUrl}/auth/signup`, {
        email: email.toLowerCase(),
        password,
        name: username,
      });
      setError(false);
      Alert.alert("Successfully Registered", `Welcome ${username}`, [
        {
          text: "Go Back To Login",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (err) {
      console.log("hello", err.response);
      if (err.response.data.message) {
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
      </View>
      <View style={styles.footer}>
        <KeyboardAvoidingView behavior={"position"}>
          <Form
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <View style={authStyle.formContainer}>
              <FormField
                placeholder="Enter your username"
                inputContainerStyle={authStyle.input}
                name="username"
              />

              <FormField
                placeholder="Enter your email"
                inputContainerStyle={[authStyle.input, { marginBottom: 5 }]}
                name="email"
              />

              <FormField
                placeholder="Enter your password"
                inputContainerStyle={authStyle.input}
                secureTextEntry
                name="password"
              />
              <ErrorMessage visible={error} error={error} />
            </View>

            <View style={styles.button}>
              <AppText style={authStyle.btnLabel}>
                Already Have an account?{" "}
                <TouchableWithoutFeedback onPress={navigateToLogin}>
                  <AppText style={authStyle.btnLabelText}>Click Here</AppText>
                </TouchableWithoutFeedback>
              </AppText>
              {!loading ? (
                <EventButton title="Register" />
              ) : (
                <ActivityIndicator color={Colors.primary} />
              )}
            </View>
          </Form>
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
    flex: 3,
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
    marginTop: height * 0.1,
    // borderRadius: 0,

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
