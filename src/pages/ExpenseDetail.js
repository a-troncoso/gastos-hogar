import React, { useState, useCallback, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  Keyboard
} from "react-native"
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native"
import Hero from "../components/atoms/Hero"
import Button from "../components/atoms/Button"
import CategoryFeature from "../components/molecules/category/CategoryFeature"
import DateFeature from "../components/molecules/date/DateFeature"
import SubcategoryFeature from "../components/molecules/subcategory/SubcategoryFeature"
import DescriptionFeature from "../components/molecules/description/DescriptionFeature"
import ExpenseMainFeature from "../components/molecules/feature/ExpenseMainFeature"

// import { formatDate } from "../utils/date"
import color from "../utils/styles/color"

import {
  fetchExpense,
  insertExpense
} from "../dbOperations/purchase/purchaseBDTransactions"
import {
  fetchCategoryById,
  fetchAllCategories
} from "../dbOperations/category/categoryBDTransactions"

const ExpenseDetail = props => {
  const navigation = useNavigation()
  const route = useRoute()
  const { params: routeParams } = route
  const expenseDetailMode = routeParams.mode || "NEW_EXPENSE"
  const [isExpenseInserted, setIsExpenseInserted] = useState(false)
  const [isFixedBottomAreaVisible, setIsFixedBottomAreaVisible] = useState(true)
  const expenseId = routeParams.expenseId

  const [featureKeys, setFeatureKeys] = useState({
    pictures: [],
    category: 0,
    subcategory: 0,
    date: null
  })

  const [featureDataUI, setFeatureDataUI] = useState({
    pictures: [],
    amount: 0,
    category: "",
    date: "",
    subcategory: "",
    description: ""
  })

  useFocusEffect(
    useCallback(() => {
      if (routeParams.fromScreen === "Scan")
        saveFeatureIntoUI("pictures", routeParams.pictures)
      if (expenseDetailMode === "EXISTING_EXPENSE")
        fetchExpenseDetail(expenseId)
      if (expenseDetailMode === "NEW_EXPENSE") {
        const date = new Date()
        saveFeatureKey("category", routeParams.categoryId)
        saveFeatureKey("date", date)
        // saveFeatureIntoUI("date", formatDate(date, { withMonthName: true }))
        fetchCategory(routeParams.categoryId)
      }

      return () => {}
    }, [])
  )

  useEffect(() => {
    isExpenseInserted &&
      navigation.navigate("ExpenseCategoryGate", { evt: "PURCHASE_SAVED" })
  }, [isExpenseInserted])

  const fetchCategory = async categoryId => {
    const categoryDetail = await fetchCategoryById(categoryId)

    saveFeatureIntoUI("category", categoryDetail.name)
  }

  const fetchExpenseDetail = expenseId => {
    // const data = await fetchExpense()
    // setFeatureDataUI()
  }

  const saveExpense = async () => {
    try {
      const insertResult = await insertExpense(
        featureDataUI.pictures,
        featureKeys.category,
        featureKeys.subcategory,
        featureDataUI.amount,
        featureDataUI.description,
        featureKeys.date.toISOString(),
        1
      )
      if (insertResult.rowsAffected) setIsExpenseInserted(true)
    } catch (err) {
      alerts.throwErrorAlert("ingresar la compra", JSON.stringify(err))
    }
  }

  const handlePressSaveButton = () => {
    saveExpense()
  }

  const handlePressCamera = () => {
    navigation.navigate("Scan", {
      fromMode: expenseDetailMode,
      categoryId: routeParams.categoryId
    })
  }

  const saveTemporaryFeatureData = (field, value) => {
    if (isObject(value)) {
      saveFeatureKey(field, value.id)
      saveFeatureIntoUI(field, value.name)
    } else saveFeatureIntoUI(field, value)
  }

  const saveFeatureIntoUI = (field, value) => {
    setFeatureDataUI(prev => ({ ...prev, [field]: value }))
  }

  const saveFeatureKey = (field, value) => {
    setFeatureKeys(prev => ({ ...prev, [field]: value }))
  }

  // TODO: move to some util
  const isObject = input => typeof input === "object" && input !== null

  return (
    <View style={styles.mainView}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          contentContainerStyle={{ paddingBottom: 60, marginBottom: 60 }}
          keyboardVerticalOffset={Platform.select({
            ios: () => 0,
            android: () => 1000
          })()}
          enabled
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Hero
              central={
                <ExpenseMainFeature
                  pictures={featureDataUI.pictures}
                  amount={featureDataUI.amount}
                  onChange={amount => saveFeatureIntoUI("amount", amount)}
                  onPressCamera={handlePressCamera}
                />
              }
            />
            <View style={styles.features}>
              <CategoryFeature
                categoryId={featureKeys.categoryId}
                categoryName={featureDataUI.category}
                onChange={categoryData =>
                  saveTemporaryFeatureData("category", categoryData)
                }
              />
              <DateFeature
                date={featureKeys.date}
                onChange={date => saveTemporaryFeatureData("date", date)}
              />
              <SubcategoryFeature
                subcategoryId={featureKeys.subcategoryId}
                subcategoryName={featureDataUI.subcategory}
                onChange={subcategoryData =>
                  saveTemporaryFeatureData("subcategory", subcategoryData)
                }
              />
              <DescriptionFeature
                description={featureDataUI.description}
                onChange={({ value }) =>
                  saveFeatureIntoUI("description", value)
                }
                onChageKeyboardVisibility={e =>
                  setIsFixedBottomAreaVisible(!e.isKeyboardVisible)
                }
              />
            </View>
            {isFixedBottomAreaVisible && expenseDetailMode === "NEW_EXPENSE" && (
              <View style={styles.fixedBottomArea}>
                <Button onPress={handlePressSaveButton} style={styles.button}>
                  <Text style={styles.saveBtnText}>GUARDAR</Text>
                </Button>
              </View>
            )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "solid",

    flex: 1,
    backgroundColor: color.blue["90"]
  },
  secondaryPart: {
    // borderColor: "yellow",
    // borderWidth: 2,
    // borderStyle: "solid",
    flex: 1
  },
  features: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24
  },
  fixedBottomArea: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  saveBtnText: {
    fontWeight: "bold"
  },
  purchaseCategoryPicker: {
    width: 200,
    height: 44,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    textAlign: "left"
  }
})

export default ExpenseDetail
