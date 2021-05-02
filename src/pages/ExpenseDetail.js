import React, { memo, useState, useCallback, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  ToastAndroid
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
import ExpenseMainFeature from "../components/molecules/expense/ExpenseMainFeature"

import {
  fetchPurchaseById,
  insertExpense,
  updateExpense
} from "../dbOperations/purchase/purchaseBDTransactions"
import { fetchCategoryById } from "../dbOperations/category/categoryBDTransactions"

import { EXPENSE_DETAIL_MODES } from "../domain/expense/expenseDetailModes"
import color from "../assets/colors"
import alerts from "../components/atoms/Alerts"

const Toast = memo(({ visible, message }) => {
  if (visible) {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
    return null
  }
  return null
})

const ExpenseDetail = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { params: routeParams } = route
  const expenseDetailMode = routeParams.mode || EXPENSE_DETAIL_MODES.NEW_EXPENSE
  const [isUnsavedFeature, setIsUnsavedFeature] = useState({
    pictures: false,
    category: false,
    subcategory: false,
    date: false,
    amount: false,
    description: false
  })
  const [isExpenseInserted, setIsExpenseInserted] = useState(false)
  const [isExpenseUpdated, setIsExpenseUpdated] = useState(false)
  const [isFixedBottomAreaVisible, setIsFixedBottomAreaVisible] = useState(true)
  const [isVisibleToast, setIsVisibleToast] = useState(false)
  const expenseId = routeParams.expenseId

  const [featureKeys, setFeatureKeys] = useState({
    category: 0,
    subcategory: 0
  })

  const [featureDataUI, setFeatureDataUI] = useState({
    pictures: [],
    amount: 0,
    category: "",
    subcategory: "",
    description: "",
    date: null
  })

  useFocusEffect(
    useCallback(() => {
      if (expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE)
        fetchExpenseDetail(expenseId)
      if (expenseDetailMode === EXPENSE_DETAIL_MODES.NEW_EXPENSE) {
        const date = new Date()
        saveFeatureKey("category", routeParams.categoryId)
        saveFeatureIntoUI("date", date)
        fetchCategory(routeParams.categoryId)
      }
      return () => {}
    }, [])
  )

  useEffect(() => {
    isExpenseInserted &&
      navigation.navigate("ExpenseCategoryGate", { evt: "PURCHASE_SAVED" })
  }, [isExpenseInserted])

  useEffect(() => {
    isExpenseUpdated && setIsVisibleToast(true)
  }, [isExpenseUpdated])

  const fetchCategory = async categoryId => {
    const categoryDetail = await fetchCategoryById(categoryId)

    saveFeatureIntoUI("category", categoryDetail.name)
  }

  const fetchExpenseDetail = async expenseId => {
    const expense = await fetchPurchaseById(expenseId)

    setFeatureKeys(prev => ({
      ...prev,
      category: expense.category.id,
      subcategory: expense.subcategory.id
    }))
    setFeatureDataUI(prev => ({
      ...prev,
      pictures: expense.images,
      amount: expense.amount,
      category: expense.category.name,
      subcategory: expense.subcategory.name,
      description: expense.description,
      date: new Date(expense.date)
    }))
  }

  const saveExpense = async () => {
    if (expenseDetailMode === EXPENSE_DETAIL_MODES.NEW_EXPENSE) addExpense()
    else if (expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE)
      editExpense()
  }

  const addExpense = async () => {
    try {
      const insertResult = await insertExpense(
        featureDataUI.pictures,
        featureKeys.category,
        featureKeys.subcategory,
        featureDataUI.amount,
        featureDataUI.description,
        featureDataUI.date.toISOString(),
        1
      )
      if (insertResult.rowsAffected) setIsExpenseInserted(true)
    } catch (err) {
      alerts.throwErrorAlert("ingresar la compra", JSON.stringify(err))
    }
  }

  const editExpense = async () => {
    try {
      const updateResult = await updateExpense(expenseId, {
        pictures: featureDataUI.pictures,
        categoryId: featureKeys.category,
        subcategoryId: featureKeys.subcategory,
        amount: featureDataUI.amount,
        description: featureDataUI.description,
        date: featureDataUI.date.toISOString(),
        userId: 1
      })
      if (updateResult.rowsAffected) {
        setIsUnsavedFeature(prev => ({
          ...prev,
          pictures: false,
          category: false,
          subcategory: false,
          date: false,
          amount: false,
          description: false
        }))
        setIsExpenseUpdated(true)
      }
    } catch (err) {
      alerts.throwErrorAlert("actualizar la compra", JSON.stringify(err))
    }
  }

  const handlePressSaveButton = () => {
    saveExpense()
  }

  const handlePressDeleteButton = () => {
    // deleteExpense()
  }

  const handlePressSaveChangesButton = () => {
    saveExpense()
  }

  const handlePressCamera = () => {
    navigation.push("Scan", {
      savePictures: pictures => {
        console.log("pictures", pictures)
        saveFeatureIntoUI("pictures", pictures)
      },
      pictures: featureDataUI.pictures
    })
  }

  const onChangeFeature = (field, value) => {
    if (expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE)
      setIsUnsavedFeature(prev => ({
        ...prev,
        [field]: true
      }))
  }

  const saveFeatureIntoUI = (field, value) => {
    setFeatureDataUI(prev => ({ ...prev, [field]: value }))
  }

  const saveFeatureKey = (field, value) => {
    setFeatureKeys(prev => ({ ...prev, [field]: value }))
  }

  const features = {
    category: (
      <CategoryFeature
        categoryId={featureKeys.categoryId}
        categoryName={featureDataUI.category}
        isUnsavedFeature={isUnsavedFeature.category}
        onChange={category => {
          saveFeatureKey("category", category.id)
          saveFeatureIntoUI("category", category.name)
          onChangeFeature("category")
        }}
      />
    ),
    date: (
      <DateFeature
        date={featureDataUI.date}
        isUnsavedFeature={isUnsavedFeature.date}
        onChange={date => {
          saveFeatureIntoUI("date", date)
          onChangeFeature("date")
        }}
      />
    ),
    subcategory: (
      <SubcategoryFeature
        subcategoryId={featureKeys.subcategoryId}
        subcategoryName={featureDataUI.subcategory}
        isUnsavedFeature={isUnsavedFeature.subcategory}
        onChange={subcategory => {
          saveFeatureKey("subcategory", subcategory.id)
          saveFeatureIntoUI("subcategory", subcategory.name)
          onChangeFeature("subcategory")
        }}
      />
    ),
    description: (
      <DescriptionFeature
        description={featureDataUI.description}
        isUnsavedFeature={isUnsavedFeature.description}
        onChange={({ value }) => {
          saveFeatureIntoUI("description", value)
          onChangeFeature("description")
        }}
        onChageKeyboardVisibility={e =>
          setIsFixedBottomAreaVisible(!e.isKeyboardVisible)
        }
      />
    )
  }

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
                  isUnsavedFeature={isUnsavedFeature.amount}
                  mode={expenseDetailMode}
                  onPressCamera={handlePressCamera}
                  onChange={amount => {
                    saveFeatureIntoUI("amount", amount)
                    onChangeFeature("amount")
                  }}
                />
              }
            />
            <View style={styles.features}>
              {Object.values(features).map(feat => (
                <>{feat}</>
              ))}
            </View>
            {isFixedBottomAreaVisible &&
              expenseDetailMode === EXPENSE_DETAIL_MODES.NEW_EXPENSE && (
                <View style={styles.fixedBottomArea}>
                  <Button onPress={handlePressSaveButton}>
                    <Text style={styles.mainBtnText}>GUARDAR</Text>
                  </Button>
                </View>
              )}
            {isFixedBottomAreaVisible &&
              expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE &&
              Object.values(isUnsavedFeature).some(v => v === true) && (
                <View style={styles.fixedBottomArea}>
                  <Button onPress={handlePressSaveChangesButton}>
                    <Text style={styles.mainBtnText}>GUARDAR CAMBIOS</Text>
                  </Button>
                </View>
              )}
            {/* {isFixedBottomAreaVisible &&
              expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE && (
                <View style={styles.fixedBottomArea}>
                  <Button onPress={handlePressDeleteButton} type="danger">
                    <Text style={styles.mainBtnText}>ELIMINAR</Text>
                  </Button>
                </View>
              )} */}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
      <Toast visible={isVisibleToast} message="Egreso actualizado" />
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
  mainBtnText: {
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
