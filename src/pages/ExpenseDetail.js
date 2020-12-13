import React, { useRef, useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native"
import { Camera } from "expo-camera"
import * as Permissions from "expo-permissions"

import Hero from "../domain/shared/Hero"
import Button from "../domain/shared/Button"
import Feature from "../domain/feature/Feature"
import CategoryFeature from "../domain/category/CategoryFeature"
import DateFeature from "../domain/date/DateFeature"
import SubcategoryFeature from "../domain/subcategory/SubcategoryFeature"
import DescriptionFeature from "../domain/description/DescriptionFeature"

import color from "../utils/styles/color"

const EditableAmount = ({ amount, editedAmount, onChange, onBlur }) => {
  const [isVisibleEditableElm, setIsVisibleEditableElm] = useState(false)

  const handlePressExpenseAmount = () => {
    setIsVisibleEditableElm(true)
  }

  const handleBlurTextInput = () => {
    setIsVisibleEditableElm(false)
    onBlur()
  }

  const handleChangeTextInput = e => {
    const numbers = e.match(/(\d+)/g)
    const amount = numbers ? numbers.join("") : ""
    onChange(amount)
  }

  return (
    <TouchableOpacity
      style={editableAmount.amountView}
      onPress={handlePressExpenseAmount}
    >
      {isVisibleEditableElm ? (
        <TextInput
          style={[editableAmount.amountStyles, editableAmount.textInput]}
          keyboardType="numeric"
          value={`$ ${editedAmount}`}
          onChangeText={handleChangeTextInput}
          onBlur={handleBlurTextInput}
          autoFocus
        />
      ) : (
        <Text style={editableAmount.amountStyles}>{`$ ${amount}`}</Text>
      )}
    </TouchableOpacity>
  )
}

const editableAmount = StyleSheet.create({
  amountView: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingVertical: 8
  },
  amountStyles: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  },
  textInput: {
    height: 19
  }
})

const ExpenseMainInfo = props => {
  const { amount, onPressCamera, onChange, onBlurEditableAmount } = props

  const handleChangeEditableAmount = e => {
    onChange(e)
  }

  const handleBlurEditableAmount = () => {
    onBlurEditableAmount()
  }

  return (
    <View style={expenseMainInfo.view}>
      <View style={expenseMainInfo.expenseCameraView}>
        <TouchableHighlight
          style={expenseMainInfo.cameraTouchable}
          onPress={() => onPressCamera()}
        >
          <ExpenseCamera />
        </TouchableHighlight>
      </View>
      <EditableAmount
        amount={amount.value}
        editedAmount={amount.newValue}
        onChange={handleChangeEditableAmount}
        onBlur={handleBlurEditableAmount}
      />
    </View>
  )
}

const expenseMainInfo = StyleSheet.create({
  view: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    width: 136,
    height: 224,
    flexDirection: "column",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: color.gray["0"],
    shadowColor: color.gray["50"],
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6
  },
  expenseCameraView: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1
  },

  amount: {
    color: "red",
    borderStyle: "solid",
    textAlign: "center",
    fontWeight: "bold"
  },
  cameraTouchable: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1
  }
})

const ExpenseCamera = () => {
  const cameraRef = useRef(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [cameraMounted, setCameraMounted] = useState(true)

  useEffect(() => {
    _requestCameraPermission()
  }, [])

  const _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setHasCameraPermission(status === "granted")
    await Permissions.askAsync(Permissions.CAMERA_ROLL)
  }

  return (
    <>
      {hasCameraPermission && cameraMounted ? (
        <Camera style={expenseCamera.camera} ref={cameraRef}>
          <View style={expenseCamera.scanCameraContent}></View>
        </Camera>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      )}
    </>
  )
}

const expenseCamera = StyleSheet.create({
  camera: { flex: 1, height: "100%" },
  scanCameraContent: {
    flex: 1,
    backgroundColor: "transparent"
  }
})

const ExpenseDetail = props => {
  const { route, navigation } = props
  const { params } = route
  const [featureValue, setFeatureValue] = useState({
    pictures: { id: -1, roll: [] },
    amount: { id: 0, value: 0, newValue: 0 },
    category: { id: 1, name: "alimento" },
    date: { id: 2, value: "16/11/2020" },
    subcategory: { id: 3, name: "" },
    description: { id: 4, value: "" }
  })

  const handleChangeMainInfo = newAmount => {
    setFeatureValue(prev => ({
      ...prev,
      amount: { ...prev.amount, newValue: newAmount }
    }))
  }

  const handleBlurEditableAmount = () => {
    // TODO: Aqui deberpia guardar en BD
    setFeatureValue(prev => ({
      ...prev,
      amount: { ...prev.amount, value: prev.amount.newValue }
    }))
  }

  return (
    <View style={styles.mainView}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
          enabled
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Hero
              central={
                <ExpenseMainInfo
                  pictures={[]}
                  amount={featureValue.amount}
                  onChange={handleChangeMainInfo}
                  onBlurEditableAmount={handleBlurEditableAmount}
                  onPressCamera={() =>
                    navigation.navigate("Scan", { fromMode: params.mode })
                  }
                />
              }
            />
            <View style={styles.features}>
              <CategoryFeature
                category={featureValue.category}
                onChange={category =>
                  setFeatureValue({
                    ...featureValue,
                    category
                  })
                }
              />
              <DateFeature
                date={featureValue.date}
                onChange={date =>
                  setFeatureValue({
                    ...featureValue,
                    date
                  })
                }
              />
              <SubcategoryFeature
                subcategory={featureValue.subcategory}
                onChange={subcategory =>
                  setFeatureValue({
                    ...featureValue,
                    subcategory
                  })
                }
              />

              <DescriptionFeature
                description={featureValue.description}
                onChange={description =>
                  setFeatureValue({
                    ...featureValue,
                    description
                  })
                }
              />
            </View>
            <View style={styles.fixedBottomArea}>
              {params.mode === "NEW_EXPENSE" && (
                <Button>
                  <Text style={styles.saveBtnText}>GUARDAR</Text>
                </Button>
              )}
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.blue["90"]
  },
  features: {
    paddingHorizontal: 16,
    paddingTop: 24
  },
  fixedBottomArea: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
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
