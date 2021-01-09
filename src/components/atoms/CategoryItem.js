import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { toCurrencyFormat } from "../../utils/number"

import { FontAwesome } from "@expo/vector-icons"
import { SimpleLineIcons } from "@expo/vector-icons"

import color from "../../utils/styles/color"

const CategoryIcon = props => {
  const { icon } = props

  return (
    <View style={categoryIconStyles.categoryIcon}>
      <FontAwesome name={icon} size={36} color={color.gray["0"]} />
    </View>
  )
}

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
})

const Termometer = ({ maxValue, value }) => {
  const termConfig = {
    0: {
      color: "green"
    },
    40: {
      color: "yellow"
    },
    80: {
      color: "red"
    }
  }

  const getTermStyles = () => {
    const temperature = (value * 100) / maxValue
    let color

    for (let i = 0; i < Object.keys(termConfig).length - 1; i++) {
      if (
        parseInt(Object.keys(termConfig)[i], 10) > temperature &&
        temperature <= parseInt(Object.keys(termConfig)[i + 1], 10)
      ) {
        // TODO: Calcular el color del termometro
        color = termConfig[i].color
      }
    }

    console.log({ temperature, color })
  }

  useEffect(() => {
    getTermStyles()
  }, [])

  return (
    <View style={termometerStyles.termometer}>
      <View
      // style={[
      //   termometerStyles.temperature,
      //   { width: `${temperature}%`, backgroundColor: "" }
      // ]}
      ></View>
    </View>
  )
}

const termometerStyles = StyleSheet.create({
  termometer: {
    height: 8,
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8
  },
  temperature: {
    height: "100%"
  }
})

const CategoryItem = props => {
  const { name, extraInfo, onPress } = props

  return (
    <TouchableOpacity onPress={onPress} style={styles.category}>
      <CategoryIcon icon="shopping-cart" />
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
