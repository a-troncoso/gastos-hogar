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
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import Hero from "../components/atoms/Hero";
import Button from "../components/atoms/Button";
import CategoryIcon from "../components/atoms/CategoryIcon/CategoryIcon";
import AmountFeature from "../components/molecules/amount/AmountFeature";
import NameFeature from "../components/molecules/name/NameFeature";
import Picker from "../components/atoms/Picker";

import { CATEGORY_DETAIL_MODES } from "../domain/category/categoryDetailModes";

import { updateCategory } from "../dbOperations/category/categoryBDTransactions";
import { fetchCategoryById } from "../dbOperations/category/categoryBDTransactions";
import apiDomain from "../utils/apiDomain";
import { extractNumbers } from "../utils/number";

import color from "../assets/colors";
import alerts from "../components/atoms/Alerts";

const initialStateunsavedFeature = {
  image: false,
  name: false,
  maxAmountPerMonth: false,
};

const Toast = memo(({ visible, message }) => {
  if (visible) {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
    return null;
  }
  return null;
});

const CategoryDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const apiCategories = apiDomain("category");
  const { params: routeParams } = route;
  const detailMode = routeParams.mode || CATEGORY_DETAIL_MODES.NEW_CATEGORY;
  const [isUnsavedFeature, setIsUnsavedFeature] = useState(
    initialStateunsavedFeature
  );
  const [isCategoryInserted, setIsCategoryInserted] = useState(false);
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);
  const [isFixedBottomAreaVisible, setIsFixedBottomAreaVisible] =
    useState(true);
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const categoryId = routeParams.categoryId;

  const [featureDataUI, setFeatureDataUI] = useState({
    image: "",
    name: "",
    maxAmountPerMonth: 0,
  });

  useLayoutEffect(() => {
    if (detailMode === CATEGORY_DETAIL_MODES.EXISTING_CATEGORY)
      navigation.setOptions({
        headerRight: () => (
          <Picker
            items={[
              {
                title: "Eliminar",
                onPressItem: () => deleteCategory(categoryId),
                withConfirmation: true,
              },
            ]}
          />
        ),
      });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      if (detailMode === CATEGORY_DETAIL_MODES.EXISTING_CATEGORY)
        // TODO: Aqui voy
        fetchCategoryDetail(categoryId);
      if (detailMode === CATEGORY_DETAIL_MODES.NEW_CATEGORY) {
      }
      return () => {};
    }, [])
  );

  useEffect(() => {
    isCategoryInserted && navigation.goBack();
    // navigation.navigate("ExpenseCategoryGate", { evt: "PURCHASE_SAVED" })
  }, [isCategoryInserted]);

  useEffect(() => {
    isCategoryUpdated && setIsVisibleToast(true);
  }, [isCategoryUpdated]);

  const fetchCategoryDetail = async categoryId => {
    const categoryDetail = await fetchCategoryById(categoryId);

    setFeatureDataUI(prev => ({
      ...prev,
      name: categoryDetail.name,
      maxAmountPerMonth: categoryDetail.maxAmountPerMonth.toString(),
      image: categoryDetail.imagePath,
    }));
  };

  const saveCategory = async () => {
    if (detailMode === CATEGORY_DETAIL_MODES.NEW_CATEGORY) addCategory();
    else if (detailMode === CATEGORY_DETAIL_MODES.EXISTING_CATEGORY)
      editCategory();
  };

  const addCategory = async () => {
    try {
      const insertResult = await apiCategories.add({
        name: featureDataUI.name,
        imagePath: featureDataUI.image,
        maxAmountPerMonth: extractNumbers(featureDataUI.maxAmountPerMonth),
      });
      if (insertResult.rowsAffected) setIsCategoryInserted(true);
    } catch (err) {
      alerts.throwErrorAlert("ingresar la categoría", JSON.stringify(err));
    }
  };

  const editCategory = async () => {
    try {
      const updateResult = await updateCategory(categoryId, {
        name: featureDataUI.name,
        imagePath: featureDataUI.image,
        maxAmountPerMonth: extractNumbers(featureDataUI.maxAmountPerMonth),
      });
      if (updateResult.rowsAffected) {
        setIsUnsavedFeature(initialStateunsavedFeature);
        setIsCategoryUpdated(true);
      }
    } catch (err) {
      alerts.throwErrorAlert("actualizar la categoría", JSON.stringify(err));
    }
  };

  const deleteCategory = async id => {
    try {
      await apiCategories.remove(id);
      navigation.goBack();
    } catch (error) {
      alerts.throwErrorAlert("eliminar categoría", JSON.stringify(err));
    }
  };

  const handlePressSaveButton = () => {
    saveCategory();
  };

  const handlePressSaveChangesButton = () => {
    saveCategory();
  };

  const onChangeFeature = field => {
    if (detailMode === CATEGORY_DETAIL_MODES.EXISTING_CATEGORY)
      setIsUnsavedFeature(prev => ({
        ...prev,
        [field]: true,
      }));
  };

  const saveFeatureIntoUI = (field, value) => {
    setFeatureDataUI(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.mainView}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          contentContainerStyle={{ paddingBottom: 60, marginBottom: 60 }}
          keyboardVerticalOffset={Platform.select({
            ios: () => 0,
            android: () => 1000,
          })()}
          enabled
        >
          <SafeAreaView style={{ flex: 1 }}>
            <Hero central={<CategoryIcon iconName="shopping-cart" />} />
            <View style={styles.features}>
              <NameFeature
                value={featureDataUI.name}
                isUnsavedFeature={isUnsavedFeature.name}
                onChange={({ value }) => {
                  saveFeatureIntoUI("name", value);
                  onChangeFeature("name");
                }}
                onChangeKeyboardVisibility={e =>
                  setIsFixedBottomAreaVisible(!e.isKeyboardVisible)
                }
              />
              <AmountFeature
                name="Monto máximo mensual"
                value={featureDataUI.maxAmountPerMonth}
                isUnsavedFeature={isUnsavedFeature.maxAmountPerMonth}
                valuePrefix="$"
                onChange={({ value }) => {
                  saveFeatureIntoUI("maxAmountPerMonth", value);
                  onChangeFeature("maxAmountPerMonth");
                }}
                onChangeKeyboardVisibility={e =>
                  setIsFixedBottomAreaVisible(!e.isKeyboardVisible)
                }
              />
            </View>
            {isFixedBottomAreaVisible &&
              detailMode === CATEGORY_DETAIL_MODES.NEW_CATEGORY && (
                <View style={styles.fixedBottomArea}>
                  <Button onPress={handlePressSaveButton}>
                    <Text style={styles.mainBtnText}>GUARDAR</Text>
                  </Button>
                </View>
              )}
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
  );
};

const styles = StyleSheet.create({
  mainView: {
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
    backgroundColor: color.blue["90"],
  },
  secondaryPart: {
    // borderColor: "yellow",
    // borderWidth: 2,
    // borderStyle: "solid",
    flex: 1,
  },
  features: {
    // borderColor: "blue",
    // borderWidth: 1,
    // borderStyle: "solid",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  fixedBottomArea: {
    // borderColor: "red",
    // borderWidth: 1,
    // borderStyle: "solid",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  mainBtnText: {
    fontWeight: "bold",
  },
});

export default CategoryDetail;
