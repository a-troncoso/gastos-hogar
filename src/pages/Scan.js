import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.app}>
      <Text>Scan Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1
  }
});
