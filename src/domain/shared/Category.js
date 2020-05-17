import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { toAmount } from "../../utils/number";

const Category = props => {
  const { name, extraInfo, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.category}>
      <View style={styles.categoryTextView}>
        <Text style={styles.categoryCategoryName}>{name}</Text>
      </View>
      {Object.keys(extraInfo).length > 0 && (
        <View style={styles.categoryExtraInfo}>
          <Text>Total este mes</Text>
          <Text>{toAmount(extraInfo.amount)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    height: 100,
    backgroundColor: "#fff",
    alignSelf: "stretch",
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  },
  categoryCategoryName: {
    fontSize: 24
  },
  categoryTextView: {
    flex: 1,
    padding: 16,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  categoryExtraInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: "#E8E8E8"
  }
});

Category.defaultProps = {
  extraInfo: {},
  onPress: () => {}
};

Category.propTypes = {
  name: PropTypes.string.isRequired,
  extraInfo: PropTypes.object,
  onPress: PropTypes.func
};

export default Category;
