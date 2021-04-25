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
import ExpenseMainFeature from "../components/molecules/feature/ExpenseMainFeature"

import { CATEGORY_DETAIL_MODES } from "../domain/category/constants"

import {
  fetchPurchaseById,
  insertExpense,
  updateExpense
} from "../dbOperations/purchase/purchaseBDTransactions"
import { fetchCategoryById } from "../dbOperations/category/categoryBDTransactions"

import color from "../utils/styles/color"
import alerts from "../utils/alerts/Alerts"

const Toast = memo(({ visible, message }) => {
  if (visible) {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
    return null
  }
  return null
})

const CategoryDetail = props => {
  const navigation = useNavigation()
  const route = useRoute()
  const { params: routeParams } = route
  const detailMode = routeParams.mode || CATEGORY_DETAIL_MODES.NEW_CATEGORY
  const [isUnsavedFeature, setIsUnsavedFeature] = useState({
    image: false,
    name: false,
    maxAmountPerMonth: false
  })
  const [isExpenseInserted, setIsExpenseInserted] = useState(false)
  const [isExpenseUpdated, setIsExpenseUpdated] = useState(false)
  const [isFixedBottomAreaVisible, setIsFixedBottomAreaVisible] = useState(true)
  const [isVisibleToast, setIsVisibleToast] = useState(false)
  const categoryId = routeParams.categoryId

  const [featureKeys, setFeatureKeys] = useState({})

  const [featureDataUI, setFeatureDataUI] = useState({
    image: "",
    name: "",
    maxAmountPerMonth: 0
  })

  useFocusEffect(
    useCallback(() => {
      if (detailMode === CATEGORY_DETAIL_MODES.EXISTING_CATEGORY)
        // TODO Aqui voy
        fetchExpenseDetail(categoryId)
      if (detailMode === CATEGORY_DETAIL_MODES.NEW_CATEGORY) {
        saveFeatureKey("category", routeParams.categoryId)
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

  const fetchExpenseDetail = async categoryId => {
    const expense = await fetchPurchaseById(categoryId)

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
    if (detailMode === CATEGORY_DETAIL_MODES.NEW_CATEGORY) addExpense()
    else if (detailMode === CATEGORY_DETAIL_MODES.EXISTING_CATEGORY)
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
      const updateResult = await updateExpense(categoryId, {
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
    if (detailMode === CATEGORY_DETAIL_MODES.EXISTING_CATEGORY)
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
            <Hero central={<CategoryIcon />} />
            <View style={styles.features}>
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
              <AmountFeature
                date={featureDataUI.date}
                isUnsavedFeature={isUnsavedFeature.date}
                onChange={date => {
                  saveFeatureIntoUI("date", date)
                  onChangeFeature("date")
                }}
              />
            </View>
            {isFixedBottomAreaVisible &&
              detailMode === CATEGORY_DETAIL_MODES.EXISTING_CATEGORY &&
              Object.values(isUnsavedFeature).some(v => v === true) && (
                <View style={styles.fixedBottomArea}>
                  <Button onPress={handlePressSaveChangesButton}>
                    <Text style={styles.mainBtnText}>GUARDAR CAMBIOS</Text>
                  </Button>
                </View>
              )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
      <Toast visible={isVisibleToast} message="Categoría actualizada" />
    </View>

    // <View style={styles.categoryDetail}>
    //   <TouchableOpacity
    //     style={styles.categoryImageTouchable}
    //     onPress={handlePressImageTouchable}
    //   >
    //     <Image
    //       style={styles.categoryImage}
    //       source={{ uri: categoryDetail.image || null }}
    //     />
    //   </TouchableOpacity>
    //   <View style={styles.categoryFeaturesView}>
    //     <View style={styles.featureView}>
    //       <Text>Nombre</Text>
    //       <TextInputMonto máximo
    //         style={styles.categoryDetailCategoryNameInput}
    //         value={categoryNameValue}
    //         autoFocus={true}
    //         onChangeText={value => setCategoryNameValue(value)}
    //       />
    //     </View>
    //     <View style={styles.featureView}>
    //       <Text>Cuota mensual</Text>
    //       <TextInput
    //         style={styles.categoryDetailCategoryNameInput}
    //         value={categoryNameValue}
    //         autoFocus={true}
    //         onChangeText={value => setCategoryNameValue(value)}
    //       />
    //     </View>
    //     <TouchableOpacity
    //       style={styles.removeCategoryButton}
    //       onPress={handlePressRemoveCategoryButton}
    //     >
    //       <Text>Crear</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    flex: 1,
    backgroundColor: color.blue["90"]
  },
  secondaryPart: {
    borderColor: "yellow",
    borderWidth: 2,
    borderStyle: "solid",
    flex: 1
  },
  features: {
    borderColor: "blue",
    borderWidth: 1,
    borderStyle: "solid",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24
  },
  fixedBottomArea: {
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
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

// const styles = StyleSheet.create({
//   categoryDetail: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#fff"
//   },
//   categoryImageTouchable: {
//     height: 160,
//     alignSelf: "stretch",
//     borderColor: "black",
//     borderStyle: "solid",
//     borderWidth: 1,
//     backgroundColor: "#E8E8E8"
//   },
//   categoryImage: {
//     width: "100%",
//     height: "100%"
//   },
//   categoryFeaturesView: {
//     flex: 1,
//     padding: 8
//   },
//   featureView: {
//     height: 56,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderColor: "black",
//     borderStyle: "solid",
//     borderWidth: 1
//   },
//   categoryDetailCategoryName: {
//     textTransform: "capitalize"
//   },
//   categoryDetailCategoryNameInput: {
//     textAlign: "right"
//   },
//   removeCategoryButton: {
//     height: 56,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderColor: "black",
//     borderStyle: "solid",
//     borderWidth: 1,
//     backgroundColor: "#E3E3E3"
//   },
//   border: { borderColor: "red", borderStyle: "solid", borderWidth: 1 }
// })

export default CategoryDetail
