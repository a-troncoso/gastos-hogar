import React, { useState, useEffect } from "react"
import Feature from "../../atoms/Feature/Feature"
import ModalSelector from "../../atoms/ModalSelector"
import { fetchAllSubcategories } from "../../../dbOperations/subcategory/subcategoryBDTransactions"

const SubcategoryFeature = props => {
  const { subcategoryName, isUnsavedFeature, onChange } = props

  const [subcategories, setSubcategories] = useState([])
  const [editableElements, setEditatableElements] = useState({
    subcategory: { isVisible: false }
  })

  useEffect(() => {
    fetchSubcategories()
  }, [])

  const fetchSubcategories = async () => {
    // FIXME: se car al obtener ls subcategories
    // const subcategories = await fetchAllSubcategories();
    // setSubcategories(subcategories);
  }

  const handleSelectSubcategory = subcategory => {
    setEditatableElements({
      ...editableElements,
      subcategory: { isVisible: false }
    })

    onChange(subcategory)
  }

  return (
    <Feature
      name="subcategoría"
      value={subcategoryName}
      voidValue="sin subcategoría"
      isVisibleEditableElm={editableElements.subcategory.isVisible}
      editableElement={
        <ModalSelector
          items={[]}
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
      isUnsavedFeature={isUnsavedFeature}
      onPressFeature={() =>
        setEditatableElements({
          ...editableElements,
          subcategory: { isVisible: true }
        })
      }
    />
  )
}

export default SubcategoryFeature
