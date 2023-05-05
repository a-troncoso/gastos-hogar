import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import shortid from "shortid";

import Hero from "../components/atoms/Hero";
import Button from "../components/atoms/Button";
import CategoryFeature from "../components/molecules/category/CategoryFeature";
import DateFeature from "../components/molecules/date/DateFeature";
import SubcategoryFeature from "../components/molecules/subcategory/SubcategoryFeature";
import DescriptionFeature from "../components/molecules/description/DescriptionFeature";
import ExpenseMainFeature from "../components/molecules/expense/ExpenseMainFeature";
import Picker from "../components/atoms/Picker";

import {
  fetchPurchaseById,
  insertExpense,
  updateExpense,
} from "../dbOperations/purchase/purchaseBDTransactions";
import { fetchCategoryById } from "../dbOperations/category/categoryBDTransactions";
import apiDomain from "../utils/apiDomain";
import { numberFormat, extractNumbers } from "../utils/number";

import { EXPENSE_DETAIL_MODES } from "../domain/expense/expenseDetailModes";
import color from "../assets/colors";
import alerts from "../components/atoms/Alerts";

const unsavedFeaturesInitial = {
  pictures: false,
  category: false,
  subcategory: false,
  date: false,
  amount: false,
  description: false,
};

const Toast = memo(({ visible, message }) => {
  if (visible) {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
    return null;
  }
  return null;
});

const ExpenseDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const apiExpense = apiDomain("expense");
  const { params: routeParams } = route;
  const expenseDetailMode =
    routeParams.mode || EXPENSE_DETAIL_MODES.NEW_EXPENSE;
  const [isUnsavedFeature, setIsUnsavedFeature] = useState({
    ...unsavedFeaturesInitial,
  });
  const [isExpenseInserted, setIsExpenseInserted] = useState(false);
  const [isExpenseUpdated, setIsExpenseUpdated] = useState(false);
  const [isFixedBottomAreaVisible, setIsFixedBottomAreaVisible] =
    useState(true);
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const expenseId = routeParams.expenseId;

  const [featureKeys, setFeatureKeys] = useState({
    category: 0,
    subcategory: 0,
  });

  const [featureDataUI, setFeatureDataUI] = useState({
    pictures: [],
    newPictures: [],
    amount: 0,
    category: "",
    subcategory: "",
    description: "",
    date: null,
  });

  useLayoutEffect(() => {
    if (expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE)
      navigation.setOptions({
        headerRight: () => (
          <Picker
            items={[
              {
                title: "Eliminar",
                onPressItem: () => deleteExpense(expenseId),
                withConfirmation: true,
              },
            ]}
          />
        ),
      });
  }, [navigation]);

  useEffect(() => {
    if (expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE)
      fetchExpenseDetail(expenseId);
    if (expenseDetailMode === EXPENSE_DETAIL_MODES.NEW_EXPENSE) {
      const date = new Date();
      saveFeatureKey("category", routeParams.categoryId);
      saveFeatureIntoUI("date", date);
      fetchCategory(routeParams.categoryId);
    }
    return () => {};
  }, []);

  useFocusEffect(
    useCallback(() => {
      // if (expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE)
      //   fetchExpenseDetail(expenseId)
      // if (expenseDetailMode === EXPENSE_DETAIL_MODES.NEW_EXPENSE) {
      //   const date = new Date()
      //   saveFeatureKey("category", routeParams.categoryId)
      //   saveFeatureIntoUI("date", date)
      //   fetchCategory(routeParams.categoryId)
      // }
      // return () => {}
    }, [])
  );

  useEffect(() => {
    isExpenseInserted &&
      navigation.navigate("ExpenseCategoryGate", { evt: "PURCHASE_SAVED" });
  }, [isExpenseInserted]);

  useEffect(() => {
    isExpenseUpdated && setIsVisibleToast(true);
  }, [isExpenseUpdated]);

  const fetchCategory = async categoryId => {
    const categoryDetail = await fetchCategoryById(categoryId);

    saveFeatureIntoUI("category", categoryDetail.name);
  };

  const fetchExpenseDetail = async expenseId => {
    const expense = await fetchPurchaseById(expenseId);

    setFeatureKeys(prev => ({
      ...prev,
      category: expense.category.id,
      subcategory: expense.subcategory.id,
    }));
    setFeatureDataUI(prev => ({
      ...prev,
      pictures: expense.images,
      amount: expense.amount,
      category: expense.category.name,
      subcategory: expense.subcategory.name,
      description: expense.description,
      date: new Date(expense.date),
    }));
  };

  const saveExpense = async () => {
    if (expenseDetailMode === EXPENSE_DETAIL_MODES.NEW_EXPENSE) addExpense();
    else if (expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE)
      editExpense();
  };

  const addExpense = async () => {
    try {
      const insertResult = await insertExpense(
        featureDataUI.pictures,
        featureKeys.category,
        featureKeys.subcategory,
        featureDataUI.amount,
        featureDataUI.description,
        featureDataUI.date.toISOString(),
        1,
        {
          source: "app",
        }
      );
      if (insertResult.rowsAffected) setIsExpenseInserted(true);
    } catch (err) {
      alerts.throwErrorAlert("ingresar gasto", JSON.stringify(err));
    }
  };

  const editExpense = async () => {
    try {
      const updateResult = await updateExpense(expenseId, {
        pictures: featureDataUI.newPictures,
        categoryId: featureKeys.category,
        subcategoryId: featureKeys.subcategory,
        amount: featureDataUI.amount,
        description: featureDataUI.description,
        date: featureDataUI.date.toISOString(),
        userId: 1,
      });
      if (updateResult.rowsAffected) {
        setIsUnsavedFeature({ ...unsavedFeaturesInitial });
        setIsExpenseUpdated(true);
      }
    } catch (err) {
      alerts.throwErrorAlert("actualizar la compra", JSON.stringify(err));
    }
  };

  const deleteExpense = async id => {
    try {
      await apiExpense.remove(id);
      navigation.goBack();
    } catch (error) {
      alerts.throwErrorAlert("eliminar egreso", JSON.stringify(err));
    }
  };

  const handlePressSaveButton = () => {
    saveExpense();
  };

  const handlePressSaveChangesButton = () => {
    saveExpense();
  };

  const handlePressCamera = () => {
    navigation.push("Scan", {
      savePictures: pictures => {
        const arePicturesEdited = !featureDataUI.pictures.equals(pictures);
        const newPictures = featureDataUI.pictures.getDifferenceWith(pictures);

        if (arePicturesEdited) {
          saveIsUnsavedFeature("pictures");
          saveFeatureIntoUI("pictures", pictures);
          saveFeatureIntoUI("newPictures", newPictures);
        }
      },
      pictures: featureDataUI.pictures,
    });
  };

  const onChangeFeature = field => {
    if (expenseDetailMode === EXPENSE_DETAIL_MODES.EXISTING_EXPENSE)
      saveIsUnsavedFeature(field);
  };

  const saveFeatureIntoUI = (field, value) => {
    setFeatureDataUI(prev => ({ ...prev, [field]: value }));
  };

  const saveFeatureKey = (field, value) => {
    setFeatureKeys(prev => ({ ...prev, [field]: value }));
  };

  const saveIsUnsavedFeature = field => {
    setIsUnsavedFeature(prev => ({
      ...prev,
      [field]: true,
    }));
  };

  const features = {
    category: (
      <CategoryFeature
        key={shortid.generate()}
        categoryId={featureKeys.categoryId}
        categoryName={featureDataUI.category}
        isUnsavedFeature={isUnsavedFeature.category}
        onChange={category => {
          saveFeatureKey("category", category.id);
          saveFeatureIntoUI("category", category.name);
          onChangeFeature("category");
        }}
      />
    ),
    date: (
      <DateFeature
        key={shortid.generate()}
        date={featureDataUI.date}
        isUnsavedFeature={isUnsavedFeature.date}
        onChange={date => {
          saveFeatureIntoUI("date", date);
          onChangeFeature("date");
        }}
      />
    ),
    subcategory: (
      <SubcategoryFeature
        key={shortid.generate()}
        subcategoryId={featureKeys.subcategoryId}
        subcategoryName={featureDataUI.subcategory}
        isUnsavedFeature={isUnsavedFeature.subcategory}
        onChange={subcategory => {
          saveFeatureKey("subcategory", subcategory.id);
          saveFeatureIntoUI("subcategory", subcategory.name);
          onChangeFeature("subcategory");
        }}
      />
    ),
    description: (
      <DescriptionFeature
        key={shortid.generate()}
        description={featureDataUI.description}
        isUnsavedFeature={isUnsavedFeature.description}
        onChange={({ value }) => {
          saveFeatureIntoUI("description", value);
          onChangeFeature("description");
        }}
        onChangeKeyboardVisibility={e => {}}
      />
    ),
  };

  return (
    <View style={styles.mainView}>
      <KeyboardAwareScrollView>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <Hero
              central={
                <ExpenseMainFeature
                  pictures={featureDataUI.pictures}
                  amount={featureDataUI.amount}
                  isUnsavedFeature={
                    isUnsavedFeature.amount || isUnsavedFeature.pictures
                  }
                  mode={expenseDetailMode}
                  onPressCamera={handlePressCamera}
                  onChange={amount => {
                    saveFeatureIntoUI("amount", amount);
                    onChangeFeature("amount");
                  }}
                />
              }
            />
            <View style={styles.features}>
              {Object.values(features).map(feat => feat)}
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
          </SafeAreaView>
        </ScrollView>
      </KeyboardAwareScrollView>
      <Toast visible={isVisibleToast} message="Egreso actualizado" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.blue["90"],
  },
  secondaryPart: {
    flex: 1,
  },
  features: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  fixedBottomArea: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  mainBtnText: {
    fontWeight: "bold",
  },
  purchaseCategoryPicker: {
    width: 200,
    height: 44,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    textAlign: "left",
  },
});

export default ExpenseDetail;
