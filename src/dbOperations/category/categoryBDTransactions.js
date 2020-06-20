import DB from "../../utils/database";
import { CATEGORY_QUERIES } from "./categoryQueries";

export const fetchAllCategories = () => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.SELECT_ALL_CATEGORIES,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        err => {
          console.log("error", err);
        }
      );
    });
  });
};

export const fetchCategoryById = categoryId => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.SELECT_CATEGORY_BY_ID,
        [categoryId],
        (_, { rows }) => {
          resolve(rows._array[0]);
        },
        error => {
          console.error("Error fetching CATEGORY_BY_ID: ", error);
        }
      );
    });
  });
};

export const patchCategoryName = (categoryId, categoryName) => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.UPDATE_CATEGORY,
        [categoryName.toString().toLowerCase(), categoryId],
        () => {
          resolve("OK");
        },
        error => {
          console.error("Error fetching UPDATE_CATEGORY: ", error);
        }
      );
    });
  });
};

export const removeCategory = categoryId => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.REMOVE_CATEGORY,
        [categoryId],
        () => {
          resolve("OK");
        },
        error => {
          console.error("Error fetching REMOVE_CATEGORY: ", error);
        }
      );
    });
  });
};
