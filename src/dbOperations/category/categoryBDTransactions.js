import { CATEGORY_QUERIES } from "./categoryQueries";
import { connectedDB } from "../utils/database";

const dbName = "db.GastosHogar";
const connDB = connectedDB({ engine: "sqlite", name: dbName });

export const fetchAllCategories = () => {
  return new Promise(resolve => {
    connDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.SELECT_ALL_CATEGORIES,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (transaction, err) => {
          console.error(
            "Error fetching fetchAllCategories: ",
            transaction,
            err
          );
        }
      );
    });
  });
};

export const fetchCategoryById = categoryId => {
  return new Promise(resolve => {
    connDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.SELECT_CATEGORY_BY_ID,
        [categoryId],
        (_, { rows }) => {
          resolve(rows._array[0]);
        },
        (transaction, error) => {
          console.error("Error fetching CATEGORY_BY_ID: ", transaction, error);
        }
      );
    });
  });
};

export const updateCategory = (
  categoryId,
  { name, maxAmountPerMonth, imagePath, extraData = "" }
) => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.UPDATE_CATEGORY,
        [name, maxAmountPerMonth, imagePath, extraData, categoryId],
        (_, s) => {
          resolve(s);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const patchCategoryName = (categoryId, categoryName) => {
  return new Promise(resolve => {
    connDB.transaction(tx => {
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

export const deleteCategory = categoryId => {
  return new Promise(resolve => {
    connDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.REMOVE_CATEGORY,
        [categoryId],
        (_, result) => {
          if (result.rowsAffected === 1) resolve();
          else reject("no hay filas actualizadas");
        },
        error => {
          console.error("Error fetching REMOVE_CATEGORY: ", error);
        }
      );
    });
  });
};

export const insertCategory = ({
  name,
  imagePath,
  extraData = "",
  maxAmountPerMonth,
}) => {
  return new Promise(resolve => {
    connDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.ADD_CATEGORY,
        [name.toLowerCase(), imagePath, extraData, maxAmountPerMonth],
        (_, result) => {
          resolve(result);
        },
        error => {
          console.error("Error adding ADD_CATEGORY: ", error);
        }
      );
    });
  });
};
