import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = props => {
  const { title } = props;

  return (
    <View style={styles.header}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 2
  }
});

export default Header;
