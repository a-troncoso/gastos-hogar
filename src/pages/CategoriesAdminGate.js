import React, { useState, useCallback } from "react"
import { StyleSheet, View, SafeAreaView, Text } from "react-native"
import { useFocusEffect } from "@react-navigation/native"


import CategoriesList from "../components/molecules/category/CategoriesList"
import Button from "../components/atoms/Button"

import { CATEGORY_DETAIL_MODES } from "../domain/category/constants"
import { fetchAllCategories } from "../dbOperations/category/categoryBDTransactions"

const CategoriesAdminGate = props => {
  const { navigation } = props

  const [categories, setCategories] = useState([])

  useFocusEffect(
    useCallback(() => {
      fetchCategories()
    }, [])
  )

  const fetchCategories = async () => {
    const categories = await fetchAllCategories()
    setCategories(categories)
  }

  const handlePressCategory = id => {
    navigation.navigate("CategoryDetail", {
      categoryId: id
    })
  }

  const handlePressAddCategory = () => {
    navigation.navigate("CategoryDetail", {
      categoryId: null,
      mode: CATEGORY_DETAIL_MODES.NEW_CATEGORY
    })
  }

  return (
    <View style={styles.categories}>
      <View style={styles.categoriesListView}>
        <SafeAreaView>
          <CategoriesList
            categories={categories}
            onPressCategory={handlePressCategory}
            onPressAddCategory={handlePressAddCategory}
          />
        </SafeAreaView>
      </View>
      <View style={styles.fixedBottomArea}>
        <Button onPress={handlePressAddCategory}>
          <Text style={styles.mainBtnText}>AGREGAR OTRA</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categories: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignSelf: "stretch"
  },
  categoriesListView: {
    flex: 1,
    alignSelf: "stretch",
    paddingHorizontal: 16
  },
  fixedBottomArea: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  mainBtnText: {
    fontWeight: "bold"
  }
})

export default CategoriesAdminGate
