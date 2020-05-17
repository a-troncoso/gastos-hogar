import React, { useEffect } from "react";
import { StyleSheet, Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Categories from "../pages/Categories";
import Scan from "../pages/Scan";

const Tab = createBottomTabNavigator();

const Main = props => {
  console.log("props", props);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Scan" component={Scan} />
    </Tab.Navigator>
  );
};

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

export default Main;
