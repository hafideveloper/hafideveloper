import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Foundation from "react-native-vector-icons/Ionicons";
import { firebase } from "../config";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <ImageBackground
      source={require("../assets/resimMenu.jpg")}
      style={styles.Img}
    >
      <View style={styles.container}>
        <View style={{ marginTop: 122 }}>
          <Text style={styles.text}>KAMPÜSTE </Text>
          <Text style={styles.text1}> AKŞAM PAZARI</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={"#000000"}
            />
            <FontAwesome
              style={styles.Icon}
              name="user"
              size={30}
              color="#000080"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Şifre"
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              placeholderTextColor={"#000000"}
            />
            <Foundation
              style={styles.Icon}
              name="key"
              size={30}
              color="#000080"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          style={styles.button}
        >
          <Text style={{ color: "#1c0f45", fontSize: 17, fontWeight: "bold" }}>
            Giriş Yap
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Registration")}
          style={{ marginTop: 63 }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 10,
              color: "#ffffff",
            }}
          >
            Hesabınız yok mu? Üye Ol
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  inputContainer: {
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "#ffffff",
    paddingLeft: 20,
    paddingRight: 20,
    textShadowColor: "#ff7518",
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 1,
    textAlign: "center",
    left: 10,
  },
  text1: {
    fontSize: 30,
    color: "#ff4f00",
    paddingLeft: 20,
    paddingRight: 20,
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
    paddingBottom: 20,
    textAlign: "center",
    marginBottom: 100,
  },
  textInput: {
    justifyContent: "center",
    width: 250,
    height: 50,
    fontSize: 17,
    borderColor: "#000080",
    borderRadius: 100,
    borderWidth: 1,
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "#6495ED",
  },
  Icon: {
    position: "absolute",
    left: 15,
    top: 10,
  },
  button: {
    marginTop: 10,
    height: 45,
    width: 100,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderColor: "#000080",
    borderWidth: 1,
  },
  Img: {
    flex: 1,
    width: "100%",
    height: null,
    resizeMode: "cover",
  },
});
