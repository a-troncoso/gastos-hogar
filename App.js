import React from "react";
import { StyleSheet, View } from "react-native";

import Router from "./src/router/Router";

export default function App() {
  return (
    <View style={styles.app}>
      <View style={{ ...styles.appSection, ...styles.appBody }}>
        <Router />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  }
});
