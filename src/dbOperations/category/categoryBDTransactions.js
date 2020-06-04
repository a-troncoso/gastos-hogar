import DB from "../../utils/database";
import { CATEGORY_QUERIES } from "./categoryQueries";

export const fetchAllCategories = () => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(CATEGORY_QUERIES.SELECT_ALL_CATEGORIES, [], (_, result) => {
        resolve(result.rows._array);
      });
    });
  });
};
