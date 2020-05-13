import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Category = props => {
  const { name, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.category}>
      <View style={styles.categoryTextView}>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    height: 100,
    padding: 16, 
    backgroundColor: "#fff",
    alignSelf: "stretch",
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  },
  categoryTextView: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
  }
});

Category.defaultProps = {
  onPress: () => {}
};

Category.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

export default Category;
