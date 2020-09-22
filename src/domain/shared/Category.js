import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { toCurrencyFormat } from "../../utils/number";

import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import color from "../../utils/styles/color";

const CategoryIcon = props => {
  const { icon } = props;

  return (
    <View style={categoryIconStyles.categoryIcon}>
      <FontAwesome name={icon} size={36} color={color.gray["0"]} />
    </View>
  );
};

const categoryIconStyles = StyleSheet.create({
  categoryIcon: {
    height: "100%",
    width: 72,
    maxHeight: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: color.blue["0"]
  }
});

const Category = props => {
  const { name, extraInfo, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.category}>
      <CategoryIcon icon="shopping-cart" />
      <View style={styles.categoryTextView}>
        <Text style={styles.categoryCategoryName}>{name}</Text>
      </View>
      <SimpleLineIcons name="arrow-right" size={24} color="black" />
      {Object.keys(extraInfo).length > 0 && (
        <View style={styles.categoryExtraInfo}>
          <Text>Total este mes</Text>
          <Text>{toCurrencyFormat(extraInfo.amount)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    height: 96,
    padding: 12,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderColor: color.blue["60"],
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 16
  },
  categoryCategoryName: {
    fontSize: 24,
    textTransform: "capitalize"
  },
  categoryTextView: {
    flex: 1,
    padding: 16
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
