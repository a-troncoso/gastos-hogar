import React, { useEffect, useState, useCallback } from "react"
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import CategoriesList from "../components/molecules/category/CategoriesList"
import Hero from "../components/atoms/Hero"
import DateNavigatorActivator from "../components/molecules/date/DateNavigatorActivator"
import Constants from "expo-constants"
import { fetchTotalExpensesByCategory } from "../dbOperations/purchase/purchaseBDTransactions"
import { formattedMonth, currentDate } from "../utils/date"
import color from "../utils/styles/color"

const mock = [
  {
    id: 1,
    name: "primero",
    extraInfo: {
      maximumStop: 100,
      currentAmount: 90
    }
  },
  {
    id: 2,
    name: "segundo",
    extraInfo: {
      maximumStop: 100,
      currentAmount: 50
    }
  },
  {
    id: 3,
    name: "tercero",
    extraInfo: {
      maximumStop: 100,
      currentAmount: 10
    }
  },
  {
    id: 4,
    name: "cuarto",
    extraInfo: {
      maximumStop: 100,
      currentAmount: 100
    }
  },
  {
    id: 5,
    name: "cuarto",
    extraInfo: {
      maximumStop: 100,
      currentAmount: 100
    }
  },
  {
    id: 6,
    name: "cuarto",
    extraInfo: {
      maximumStop: 100,
      currentAmount: 100
    }
  }
]

const HistoryGate = props => {
  const { navigation } = props

  const [categories, setCategories] = useState([])
  const [dateSelected, setDateSelected] = useState(currentDate())

  useFocusEffect(
    useCallback(() => {
      fetchTotalPurchases(dateSelected)
      setDateSelected(currentDate())
    }, [])
  )

  useEffect(() => {
    fetchTotalPurchases(dateSelected)
  }, [dateSelected])

  const fetchTotalPurchases = async date => {
    try {
      const categories = await fetchTotalExpensesByCategory({
        date,
        mode: "month"
      })
      setCategories(categories)
    } catch (err) {}
  }

  const handlePressCategory = id => {
    navigation.push("Expenses", {
      categoryId: id,
      date: dateSelected,
      mode: "month"
    })
  }

  const handleTest = () => {
    // navigation.navigate("PurchaseImagesModal", {
    //   images: []
    // })
  }

  const handleChangeDateNavigation = date => {
    setDateSelected(date)
  }

  return (
    <View style={styles.mainView}>
      <Hero
        button={
          <DateNavigatorActivator
            mode="MONTH"
            date={dateSelected}
            onChange={date => handleChangeDateNavigation(date)}
          />
        }
      />
      <View style={styles.categoriesListView}>
        <SafeAreaView>
          <CategoriesList
            categories={categories}
            onPressCategory={handlePressCategory}
          />
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.blue["90"]
  },

  categoriesListView: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
    paddingHorizontal: 16
    // paddingTop: 8
  }
})

export default HistoryGate
