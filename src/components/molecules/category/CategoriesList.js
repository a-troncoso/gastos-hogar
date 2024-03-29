import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import CategoryItem from "../../atoms/CategoryItem";

const AddCategoryButton = props => {
  const { onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.addCategoryButton}>
      <View style={styles.addCategoryButtonTextView}>
        <Text style={styles.addCategoryButtonLabel}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const CategoriesList = props => {
  const { categories, features, onPressCategory, onPressAddCategory } = props;

  const [hasAddCategoryFeature] = useState(features.includes("add-category"));

  const handlePressCategory = id => {
    onPressCategory(id);
  };

  const handlePressAddCategory = () =>
    hasAddCategoryFeature && onPressAddCategory();

  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        hasAddCategoryFeature && (
          <AddCategoryButton onPress={handlePressAddCategory} />
        )
      }
      renderItem={({ item }) => (
        <View style={styles.categoriesListViewCategory}>
          <CategoryItem
            key={item.id}
            name={item.name}
            imagePath={item.imagePath}
            extraData={item.extraData}
            thermometerData={item.extraInfo}
            onPress={() => handlePressCategory(item.id)}
          />
        </View>
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  categoriesListViewCategory: {
    paddingTop: 16,
  },
  addCategoryButton: {
    height: 100,
    backgroundColor: "#fff",
    alignSelf: "stretch",
    alignItems: "center",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
  addCategoryButtonLabel: {
    fontSize: 24,
    textAlign: "center",
    textTransform: "capitalize",
  },
  addCategoryButtonTextView: {
    flex: 1,
    padding: 16,
    alignSelf: "stretch",
    justifyContent: "center",
  },
});

CategoriesList.defaultProps = {
  features: [],
  onPressCategory: () => {},
  onPressAddCategory: () => {},
};

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  features: PropTypes.array,
  onPressCategory: PropTypes.func,
  onPressAddCategory: PropTypes.func,
};

export default CategoriesList;
