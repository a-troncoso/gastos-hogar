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
  TouchableOpacity,
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
import { ModalIconSelector } from "../components/atoms";

import { CATEGORY_DETAIL_MODES } from "../domain/category/categoryDetailModes";

import { updateCategory } from "../dbOperations/category/categoryBDTransactions";
import { fetchCategoryById } from "../dbOperations/category/categoryBDTransactions";
import apiDomain from "../utils/apiDomain";
import { extractNumbers } from "../utils/number";

import color from "../assets/colors";
import alerts from "../components/atoms/Alerts";
import { isJsonString } from "../utils/object";

const initialStateUnsavedFeature = {
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
  const { params: routeParams } = useRoute();
  const apiCategories = apiDomain("category");
  const detailMode = routeParams.mode || CATEGORY_DETAIL_MODES.NEW_CATEGORY;
  const [isUnsavedFeature, setIsUnsavedFeature] = useState(
    initialStateUnsavedFeature
  );
  const [isCategoryInserted, setIsCategoryInserted] = useState(false);
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);
  const [isFixedBottomAreaVisible, setIsFixedBottomAreaVisible] =
    useState(true);
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const categoryId = routeParams.categoryId;

  const [featureDataUI, setFeatureDataUI] = useState({
    image: "",
    extraData: {
      imageIconFamily: "",
    },
    name: "",
    maxAmountPerMonth: 0,
  });
  const [isModalIconSelectorVisible, setIsModalIconSelectorVisible] =
    useState(false);

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
      maxAmountPerMonth: categoryDetail.maxAmountPerMonth?.toString(),
      extraData: isJsonString(categoryDetail.extraData)
        ? JSON.parse(categoryDetail.extraData)
        : {},
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
        name: featureDataUI.name.trim(),
        imagePath: featureDataUI.image,
        extraData: JSON.stringify(featureDataUI.extraData),
        maxAmountPerMonth: extractNumbers(featureDataUI.maxAmountPerMonth) ?? 0,
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
        extraData: JSON.stringify(featureDataUI.extraData),
        maxAmountPerMonth: extractNumbers(featureDataUI.maxAmountPerMonth) ?? 0,
      });
      if (updateResult.rowsAffected) {
        setIsUnsavedFeature(initialStateUnsavedFeature);
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

  const onChangeFeature = useCallback(
    field => {
      if (detailMode === CATEGORY_DETAIL_MODES.EXISTING_CATEGORY)
        setIsUnsavedFeature(prev => ({
          ...prev,
          [field]: true,
        }));
    },
    [detailMode]
  );

  const saveFeatureIntoUI = (field, value) => {
    setFeatureDataUI(prev => ({ ...prev, [field]: value }));
  };

  const handlePressCategoryIcon = () => {
    setIsModalIconSelectorVisible(true);
  };

  const handleChangeIcon = icon => {
    saveFeatureIntoUI("image", icon.iconName);
    saveFeatureIntoUI("extraData", { imageIconFamily: icon.iconFamily });
    setIsModalIconSelectorVisible(false);
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
            <Hero
              central={
                <TouchableOpacity onPress={handlePressCategoryIcon}>
                  <CategoryIcon
                    iconName={featureDataUI.image}
                    iconFamily={featureDataUI.extraData.imageIconFamily}
                  />
                </TouchableOpacity>
              }
            />
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
                capitalizeValue
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
      <ModalIconSelector
        items={[
          { iconName: "food-apple-outline", iconFamily: "materialCommunity" },
          { iconName: "shirt-outline", iconFamily: "ion" },
          { iconName: "money", iconFamily: "fontAwesome" },
          { iconName: "child", iconFamily: "fontAwesome" },
          { iconName: "car-sport", iconFamily: "ion" },
          { iconName: "home", iconFamily: "entypo" },
          { iconName: "healing", iconFamily: "material" },
        ]}
        isModalVisible={isModalIconSelectorVisible}
        onChange={handleChangeIcon}
      />
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
});

export default CategoryDetail;
