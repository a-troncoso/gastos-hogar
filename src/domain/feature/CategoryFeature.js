import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableHighlight,
//   TouchableOpacity,
//   Alert,
//   Picker
// } from "react-native";
import Feature from "./Feature";
import CategorySelector from "../category/CategroySelector";

const CategoryFeature = props => {
  const { category, onChange } = props;

  const [editableElements, setEditatableElements] = useState({
    category: { isVisible: false }
  });

  const handleSelectCategory = category => {
    setEditatableElements({
      ...editableElements,
      category: { isVisible: false }
    });

    onChange(category);
  };

  return (
    <Feature
      name="categoría"
      value={category.name}
      voidValue="sin categoría"
      editableElement={
        <CategorySelector
          isModalVisible={editableElements.category.isVisible}
          onBackdropPress={() =>
            setEditatableElements({
              ...editableElements,
              category: { isVisible: false }
            })
          }
          onChange={category => handleSelectCategory(category)}
        />
      }
      onPressFeature={() =>
        setEditatableElements({
          ...editableElements,
          category: { isVisible: true }
        })
      }
    />
  );
};

export default CategoryFeature;
