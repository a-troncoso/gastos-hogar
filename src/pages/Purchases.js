import React, { useState, useCallback } from "react"
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import Hero from "../components/atoms/Hero"
import DateNavigatorActivator from "../components/molecules/date/DateNavigatorActivator"

import { fetchPurchasesByCategory } from "../dbOperations/purchase/purchaseBDTransactions"
import { toCurrencyFormat } from "../utils/number"
import { formatDate, currentMonth } from "../utils/date"
import color from "../utils/styles/color"

const Purchase = props => {
  const { image, date, amount, subcategory, onPress } = props

  return (
    <TouchableOpacity style={styles.purchase} onPress={onPress}>
      <View style={styles.purchaseImageView}>
        <Image style={styles.purchaseImage} source={{ uri: image }} />
      </View>
      <View style={styles.purchaseInfoView}>
        <View style={styles.purchaseDateView}>
          <Text style={styles.purchaseDate}>{formatDate(date)}</Text>
        </View>
        <View style={styles.purchaseExtraInfo}>
          <Text style={styles.purchaseSubcategory}>
            {subcategory || "Sin subcategoría"}
          </Text>
          <Text style={styles.purchaseAmount}>{toCurrencyFormat(amount)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const PurchasesList = props => {
  const { purchases, onPressPurchase } = props

  const handlePressPurchase = id => {
    onPressPurchase(id)
  }

  return (
    <FlatList
      data={purchases}
      style={styles.purchasesList}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.purchasesListViewPurchase}>
          <Purchase
            key={item.id}
            image={item.image}
            date={item.date}
            amount={item.amount}
            onPress={() => handlePressPurchase(item.id)}
          />
        </View>
      )}
    ></FlatList>
  )
}

const Expenses = props => {
  const { navigation, route } = props
  const categoryId = route.params.categoryId
  const date = route.params.date
  const mode = route.params.mode

  const filterDateByMode = date => ({
    day: date.getFullYear(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  })

  const [purchases, setPurchases] = useState([])
  const [dateSelected, setDateSelected] = useState(date)

  useFocusEffect(
    useCallback(() => {
      fetchPurchases(date, mode, categoryId)
    }, [])
  )

  const fetchPurchases = async (date, mode, categoryId) => {
    const purchases = await fetchPurchasesByCategory({ date, mode, categoryId })
    setPurchases(purchases)
  }

  const handlePressPurchase = id => {
    navigation.navigate("ExpenseDetail", {
      expenseId: id,
      mode: "EXISTING_EXPENSE"
    })
  }

  return (
    <View style={styles.purchases}>
      <Hero
        childStyles={styles.hero}
        button={
          <DateNavigatorActivator
            mode={mode.toUpperCase()}
            date={dateSelected}
          />
        }
      />
      <View style={styles.purchasesListView}>
        <SafeAreaView>
          <PurchasesList
            purchases={purchases}
            onPressPurchase={handlePressPurchase}
          />
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  purchases: {
    flex: 1,
    backgroundColor: color.blue["90"]
  },
  hero: {
    marginBottom: 8
  },
  purchasesListView: {
    flex: 1,
    paddingHorizontal: 16
  },
  purchase: {
    height: 82,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
    // borderColor: "black",
    // borderStyle: "solid",
    // borderWidth: 1
  },
  purchaseImageView: {
    width: 82,
    height: "100%",
    marginRight: 8,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: color.gray[0],
    backgroundColor: color.gray[0],
    borderColor: color.blue[60],
    borderStyle: "solid"
  },
  purchaseImage: {
    width: "100%",
    height: "100%"
  },
  purchaseInfoView: {
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
    padding: 12,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: color.gray[0],
    borderColor: color.blue[60],
    borderStyle: "solid",
    borderWidth: 1
  },
  purchaseDateView: {
    // padding: 8,
    justifyContent: "center"
  },
  purchaseDate: {
    fontSize: 16,
    fontWeight: "bold"
  },
  purchaseExtraInfo: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  purchasesListViewPurchase: {
    marginBottom: 8
  },
  purchaseSubcategory: {
    fontWeight: "bold",
    color: color.yellow[0]
  },
  purchaseAmount: {
    fontWeight: "bold",
    color: color.red[0]
  }
})

export default Expenses
