import React, { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform
} from "react-native"

import Hero from "../components/atoms/Hero"
import Button from "../components/atoms/Button"
import CategoryFeature from "../components/molecules/category/CategoryFeature"
import DateFeature from "../components/molecules/date/DateFeature"
import SubcategoryFeature from "../components/molecules/subcategory/SubcategoryFeature"
import DescriptionFeature from "../components/molecules/description/DescriptionFeature"
import ExpenseMainInfo from "../components/molecules/feature/ExpenseMainFeature"

import color from "../utils/styles/color"

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
                  pictures={featureValue.pictures}
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
