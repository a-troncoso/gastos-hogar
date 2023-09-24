import { useState } from "react";

import apiDomain from "../../utils/apiDomain";

export default () => {
  const apiCategories = apiDomain("category");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const categories = await apiCategories.fetch();
    setCategories(categories);
  };

  return {
    categories,
    fetchCategories,
  };
};
