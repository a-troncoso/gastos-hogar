import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { CATEGORY_QUERIES } from "./categoryQueries";

export const fetchAllCategories = () => {
  const db = SQLite.openDatabase(
    `${FileSystem.documentDirectory}/SQLite/db.GastosHogarDB`
  );

  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(CATEGORY_QUERIES.SELECT_ALL_CATEGORIES, [], (_, result) => {
        resolve(result.rows._array);
      });
    });
  });
};
