import React, { useState, useEffect } from "react";
import Feature from "./Feature";
import ModalSelector from "../category/ModalSelector";
import { fetchAllSubcategories } from "../../dbOperations/subcategory/subcategoryBDTransactions";

const SubcategoryFeature = props => {
  const { subcategory, onChange } = props;

  const [subcategories, setSubcategories] = useState([]);
  const [editableElements, setEditatableElements] = useState({
    subcategory: { isVisible: false }
  });

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    // FIXME: se car al obtener ls subcategories
    // const subcategories = await fetchAllSubcategories();
    // setSubcategories(subcategories);
  };

  const handleSelectSubcategory = subcategory => {
    setEditatableElements({
      ...editableElements,
      subcategory: { isVisible: false }
    });

    onChange(subcategory);
  };

  return (
    <Feature
      name="subcategoría"
      value={subcategory.name}
      voidValue="sin subcategoría"
      isVisibleEditableElm={editableElements.subcategory.isVisible}
      editableElement={
        <ModalSelector
          items={[
            { id: 1, name: "sub1" },
            { id: 2, name: "sub2" }
          ]}
          // items={subcategories}
          isModalVisible={editableElements.subcategory.isVisible}
          onBackdropPress={() =>
            setEditatableElements({
              ...editableElements,
              subcategory: { isVisible: false }
            })
          }
          onChange={subcategory => handleSelectSubcategory(subcategory)}
        />
      }
      onPressFeature={() =>
        setEditatableElements({
          ...editableElements,
          subcategory: { isVisible: true }
        })
      }
    />
  );
};

export default SubcategoryFeature;
