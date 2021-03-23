import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native"
import { addCategory } from "../dbOperations/category/categoryBDTransactions"

const CategoryCreation = props => {
  const { navigation } = props

  const [categoryDetail] = useState({})
  const [categoryNameValue, setCategoryNameValue] = useState("")

  useEffect(() => {}, [])

  const handlePressImageTouchable = () => {}

  const handlePressRemoveCategoryButton = async () => {
    const addResult = await addCategory(categoryNameValue, "")

    if (addResult === "OK") navigation.navigate("CategoriesAdminGate")
  }

  return (
    <View style={styles.categoryDetail}>
      <TouchableOpacity
        style={styles.categoryImageTouchable}
        onPress={handlePressImageTouchable}
      >
        <Image
          style={styles.categoryImage}
          source={{ uri: categoryDetail.image || null }}
        />
      </TouchableOpacity>
      <View style={styles.categoryFeaturesView}>
        <View style={styles.featureView}>
          <Text>Nombre</Text>
          <TextInput
            style={styles.categoryDetailCategoryNameInput}
            value={categoryNameValue}
            autoFocus={true}
            onChangeText={value => setCategoryNameValue(value)}
          />
        </View>
        <TouchableOpacity
          style={styles.removeCategoryButton}
          onPress={handlePressRemoveCategoryButton}
        >
          <Text>Crear</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryDetail: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  categoryImageTouchable: {
    height: 160,
    alignSelf: "stretch",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#E8E8E8"
  },
  categoryImage: {
    width: "100%",
    height: "100%"
  },
  categoryFeaturesView: {
    flex: 1,
    padding: 8
  },
  featureView: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  },
  categoryDetailCategoryName: {
    textTransform: "capitalize"
  },
  categoryDetailCategoryNameInput: {
    textAlign: "right"
  },
  removeCategoryButton: {
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#E3E3E3"
  },
  border: { borderColor: "red", borderStyle: "solid", borderWidth: 1 }
})

export default CategoryCreation
