import React, { useState, useCallback, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, ToastAndroid } from "react-native"
import { useFocusEffect, useRoute, useNavigation} from "@react-navigation/native"

import CategoriesList from "../components/molecules/category/CategoriesList"

import { fetchAllCategories } from "../dbOperations/category/categoryBDTransactions"

import color from "../utils/styles/color"

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
    return null
  }
  return null
}

const RegistryExpenseGate = props => {
  const route = useRoute()
  const navigation = useNavigation()
  const [categories, setCategories] = useState([])
  const [visibleToast, setVisibleToast] = useState(false)

  useFocusEffect(
    useCallback(() => {
      _fetchCategories()
    }, [])
  )

  useEffect(() => {
    if (route.params && route.params.evt === "PURCHASE_SAVED") {
      setVisibleToast(true)
      navigation.setParams({ evt: "" })
    }
  }, [route.params])

  useEffect(() => setVisibleToast(false), [visibleToast])

  const _fetchCategories = async () => {
    const categories = await fetchAllCategories()
    setCategories(categories)
  }

  const handlePressCategory = id => {
    navigation.navigate("ExpenseDetail", {
      categoryId: id
    })
  }

  return (
    <View style={styles.mainView}>
      <View style={styles.categoriesListView}>
        <SafeAreaView>
          <CategoriesList
            categories={categories}
            onPressCategory={handlePressCategory}
          />
        </SafeAreaView>
        <Toast visible={visibleToast} message="Egreso ingresado" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: color.blue["90"],
    alignSelf: "stretch"
  },
  categoriesListView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
    paddingHorizontal: 16
  }
})

export default RegistryExpenseGate
