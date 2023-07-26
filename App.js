import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Header from "./components/Header";
import Homepage from "./src/Homepage";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="" />,
            headerStyle: {
              height: 35,
              backgroundColor: "#ffffff",
            },
          }}
        />

        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            title: "KAMPÜSTE AKŞAM PAZARI",
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: "#6495ED",
              shadowColor: "#000",
              elevation: 25,
            },
            headerTitleStyle: {
              fontSize: 20,
              color: "#000000",
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="karşılama"
        component={Dashboard}
        options={{
          title: "İndirimleri Kaçırma!",
        }}
      />
      <Stack.Screen
        name="Homepage"
        component={Homepage}
        options={{
          title: "Akşam Pazarı",
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
