import React from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";

export default function Navigator() {

  const handlePress = () => {}
  return (
    <View style={styles.navigator}>
      <TouchableOpacity onPress={handlePress} style={styles.navigatorItem}>
        <View style={styles.navigatorItemTextView}>
          <Text>Categories</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress} style={styles.navigatorItem}>
        <View style={styles.navigatorItemTextView}>
          <Text>Scan</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navigator: {
    height: 70,
    flexDirection: 'row',
    backgroundColor: "#fff",
    alignSelf: "stretch",
    borderColor: "lime",
    borderStyle: "solid",
    borderWidth: 2
  },
  navigatorItem: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "stretch",
    borderColor: "brown",
    borderStyle: "solid",
    borderWidth: 2
  }
});
