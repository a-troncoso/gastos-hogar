import React, { useRef, useState, useEffect } from "react";
import Feature from "../../atoms/Feature/Feature";
import CategoryModalSelector from "../../atoms/ModalSelector";
import alerts from "../../atoms/Alerts";

import { fetchAllCategories } from "../../../dbOperations/category/categoryBDTransactions";

const CategoryFeature = props => {
  const { categoryName, isUnsavedFeature, onChange } = props;

  const componentIsMounted = useRef(true);
  const [categories, setCategories] = useState([]);
  const [editableElements, setEditatableElements] = useState({
    category: { isVisible: false },
  });

  useEffect(() => {
    fetchCategories();

    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await fetchAllCategories();
      if (componentIsMounted.current) setCategories(categories);
    } catch (err) {
      alerts.throwErrorAlert("obtener categorías", JSON.stringify(err));
    }
  };

  const handleSelectCategory = category => {
    setEditatableElements({
      ...editableElements,
      category: { isVisible: false },
    });

    onChange(category);
  };

  return (
    <Feature
      name="categoría"
      value={categoryName}
      voidValue="sin categoría"
      editableElement={
        <CategoryModalSelector
          items={categories}
          isModalVisible={editableElements.category.isVisible}
          onBackdropPress={() =>
            setEditatableElements({
              ...editableElements,
              category: { isVisible: false },
            })
          }
          onChange={category => handleSelectCategory(category)}
        />
      }
      isVisibleEditableElm={editableElements.category.isVisible}
      isUnsavedFeature={isUnsavedFeature}
      onPressFeature={() =>
        setEditatableElements({
          ...editableElements,
          category: { isVisible: true },
        })
      }
    />
  );
};

export default CategoryFeature;
