import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { SimpleLineIcons } from "@expo/vector-icons"
import Termometer from "./Termometer"
import CategoryIcon from "./CategoryIcon/CategoryIcon"

import color from "../../assets/colors"

const CategoryItem = props => {
  const { name, extraInfo, onPress } = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.category}>
      <CategoryIcon iconName="shopping-cart" />
      <View style={styles.rightSection}>
        <View style={styles.name}>
          <Text style={styles.categoryCategoryName}>{name}</Text>
          {Object.keys(extraInfo).length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Termometer
                maxValue={extraInfo.maximumStop}
                value={extraInfo.currentAmount}
              />
            </View>
          )}
        </View>
        <SimpleLineIcons name="arrow-right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  )
}

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
  name: {
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "solid",
    marginRight: 12,
    flex: 1
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
  },
  rightSection: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center"
    // justifyContent: "space-between"
  }
})

CategoryItem.defaultProps = {
  extraInfo: {},
  onPress: () => {}
}

CategoryItem.propTypes = {
  name: PropTypes.string.isRequired,
  extraInfo: PropTypes.object,
  onPress: PropTypes.func
}

export default CategoryItem
