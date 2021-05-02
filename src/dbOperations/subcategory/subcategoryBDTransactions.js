import DB from "../database";
import { SUBCATEGORY_QUERIES } from "./subcategoryQueries";

export const fetchAllSubcategories = () => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        SUBCATEGORY_QUERIES.SELECT_ALL_SUBCATEGORIES,
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        error => {
          console.error("Error fetching fetchAllSubcategories: ", error);
        }
      );
    });
  });
};

export const fetchSubcategoryById = subcategoryId => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        SUBCATEGORY_QUERIES.SELECT_SUBCATEGORY_BY_ID,
        [subcategoryId],
        (_, { rows }) => {
          resolve(rows._array[0]);
        },
        error => {
          console.error("Error fetching SUBCATEGORY_BY_ID: ", error);
        }
      );
    });
  });
};

export const patchSubcategoryName = (subcategoryId, subcategoryName) => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        SUBCATEGORY_QUERIES.UPDATE_SUBCATEGORY,
        [subcategoryName.toString().toLowerCase(), subcategoryId],
        () => {
          resolve("OK");
        },
        error => {
          console.error("Error fetching UPDATE_SUBCATEGORY: ", error);
        }
      );
    });
  });
};

export const removeSubcategory = subcategoryId => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        SUBCATEGORY_QUERIES.REMOVE_SUBCATEGORY,
        [subcategoryId],
        () => {
          resolve("OK");
        },
        error => {
          console.error("Error fetching REMOVE_SUBCATEGORY: ", error);
        }
      );
    });
  });
};

export const addSubcategory = (name, imageURI) => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        SUBCATEGORY_QUERIES.ADD_SUBCATEGORY,
        [name, imageURI],
        () => {
          resolve("OK");
        },
        error => {
          console.error("Error adding ADD_SUBCATEGORY: ", error);
        }
      );
    });
  });
};
