import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { useCategoryLocalDB } from "../modules/category/data";

export const useHomeGate = () => {
  const [categories, setCategories] = useState([]);
  const fetchAllCategories = useCategoryLocalDB({ operation: "fetchAll" });

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const fetchCategories = async () => {
    const categories = await fetchAllCategories();
    setCategories(categories);
  };

  return {
    categories,
  };
};
