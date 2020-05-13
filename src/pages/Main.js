import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Router from "./src/router/Router";
import Navigator from "./src/shared/Navigator";
// import Header from "./src/shared/Header";

import Categories from "../pages/Categories";
import Scan from "../pages/Scan";

export default function Main() {
  const Stack = createStackNavigator();

  return (
    <View style={styles.main}>
      {/* <View style={{ ...styles.mainSection, ...styles.appHeader }}>
        <Header title="Categorias" />
      </View> */}

      <View style={{ ...styles.mainSection, ...styles.mainBody }}>
        <Stack.Navigator>
          <Stack.Screen name="Categorias" component={Categories} />
          <Stack.Screen name="Scan" component={Scan} />
        </Stack.Navigator>
      </View>

      <View style={{ ...styles.mainSection, ...styles.mainFooter }}>
        <Navigator />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  appHeader: {
    height: 30
  },
  mainBody: {
    flex: 1
  },
  mainFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});
