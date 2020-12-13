import React, { useState, useEffect } from "react";
import Feature from "../../atoms/Feature";
import CategoryModalSelector from "../../atoms/ModalSelector";
import { fetchAllCategories } from "../../../dbOperations/category/categoryBDTransactions";


const CategoryFeature = props => {
  const { category, onChange } = props;

  const [categories, setCategories] = useState([]);
  const [editableElements, setEditatableElements] = useState({
    category: { isVisible: false }
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await fetchAllCategories();
    setCategories(categories);
  };

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
        <CategoryModalSelector
          items={categories}
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
      isVisibleEditableElm={editableElements.category.isVisible}
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
