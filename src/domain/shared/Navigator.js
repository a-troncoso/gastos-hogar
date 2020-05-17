import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Navigator = props => {
  const { onPressNavigationTab } = props;

  return (
    <View style={styles.navigator}>
      <TouchableOpacity
        onPress={() => onPressNavigationTab("CATEGORIES")}
        style={styles.navigatorItem}
      >
        <View style={styles.navigatorItemTextView}>
          <Text>Categories</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressNavigationTab("SCAN")}
        style={styles.navigatorItem}
      >
        <View style={styles.navigatorItemTextView}>
          <Text>Scan</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigator: {
    height: 70,
    flexDirection: "row",
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

Navigator.defaultProps = {
  onPressNavigationTab: () => {}
};
Navigator.propTypes = {
  onPressNavigationTab: PropTypes.func
};

export default Navigator;
