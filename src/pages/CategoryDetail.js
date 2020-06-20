import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  fetchCategoryById,
  patchCategoryName,
  removeCategory
} from "../dbOperations/category/categoryBDTransactions";
import { toCurrencyFormat } from "../utils/number";
import { formatDate } from "../utils/date";

const CategoryDetail = props => {
  const { route, navigation } = props;

  const [categoryDetail, setCategoryDetail] = useState({});
  const [categoryNameEditMode, setCategoryNameEditMode] = useState(false);
  const [categoryNameValueEdited, setCategoryNameValueEdited] = useState("");

  useEffect(() => {
    _fetchCategory(route.params.categoryId);
  }, []);

  const _fetchCategory = async categoryId => {
    const categoryDetail = await fetchCategoryById(categoryId);

    setCategoryDetail(categoryDetail);
    setCategoryNameValueEdited(categoryDetail.name);
  };

  const handlePressImageTouchable = () => {
    // navigation.navigate("PurchaseImagesModal", {
    //   images: [categoryDetail.image]
    // });
  };

  const handlePressCategoryName = () => {
    setCategoryNameEditMode(true);
  };

  const handleSubmitEditCategoryName = async () => {
    const patchResult = await patchCategoryName(
      route.params.categoryId,
      categoryNameValueEdited
    );

    if (patchResult === "OK") {
      setCategoryNameEditMode(false);
      _fetchCategory(route.params.categoryId);
    }
  };

  const handlePressRemoveCategoryButton = async () => {
    const removeResult = await removeCategory(route.params.categoryId);

    if (removeResult === "OK") navigation.navigate("CategoriesAdminGate");
  };

  return (
    <View style={styles.categoryDetail}>
      <TouchableOpacity
        style={styles.categoryImageTouchable}
        onPress={handlePressImageTouchable}
      >
        <Image
          style={styles.categoryImage}
          source={{ uri: categoryDetail.image || null }}
        />
      </TouchableOpacity>
      <View style={styles.categoryFeaturesView}>
        <TouchableOpacity
          style={styles.featureView}
          onPress={handlePressCategoryName}
        >
          <Text>Nombre</Text>
          {!categoryNameEditMode ? (
            <Text style={styles.categoryDetailCategoryName}>
              {categoryDetail.name}
            </Text>
          ) : (
            <TextInput
              style={styles.categoryDetailCategoryNameInput}
              value={categoryNameValueEdited}
              autoFocus={true}
              onChangeText={value => setCategoryNameValueEdited(value)}
              onSubmitEditing={handleSubmitEditCategoryName}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeCategoryButton}
          onPress={handlePressRemoveCategoryButton}
        >
          <Text>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryDetail: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  categoryImageTouchable: {
    height: 160,
    alignSelf: "stretch",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#E8E8E8"
  },
  categoryImage: {
    width: "100%",
    height: "100%"
  },
  categoryFeaturesView: {
    flex: 1,
    padding: 8
  },
  featureView: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1
  },
  categoryDetailCategoryName: {
    textTransform: "capitalize"
  },
  categoryDetailCategoryNameInput: {
    textAlign: "right"
  },
  removeCategoryButton: {
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#E3E3E3"
  },
  border: { borderColor: "red", borderStyle: "solid", borderWidth: 1 }
});

export default CategoryDetail;
