import { Text, StyleSheet, SafeAreaView, Button, View } from "react-native";
import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import { firebase } from "../config";

const Dashboard = (props) => {
  const [name, setName] = useState("");
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("user does not exits");
        }
      });
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/e0/26/51/e0265103e922d89e122cf11893d3b735.jpg",
      }}
      style={{ flex: 1, width: "100%", height: null, resizeMode: "cover" }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}> Merhaba, {name.firstName} </Text>
        <Text style={styles.newText}> Hoşgeldin! </Text>
      </SafeAreaView>

      <View
        style={{
          top: 102,
          height: 45,
          width: 100,
          left: 130,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title="İLERİ"
          onPress={() => props.navigation.navigate("Homepage")}
        />
      </View>
    </ImageBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    backgroundColor: "#8ED6FF",
    marginTop: 200,
    fontSize: 17,
    color: "#000000",
    borderRadius: 50,
    fontWeight: "500",
  },
  newText: {
    top: 15,
    backgroundColor: "#8ED6FF",
    fontSize: 17,
    color: "#000000",
    borderRadius: 50,
  },
  NewText: {
    backgroundColor: "#8ED6FF",
    top: 155,
    margin: 5,
    padding: 5,
    fontSize: 20,
    color: "#ffffff",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
