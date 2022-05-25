import { EXTERNAL_SOURCE_QUERIES } from "./externalSourcesQueries";
import { connectedDB } from "../utils/database";

const dbName = "db.GastosHogar";
const connDB = connectedDB({ engine: "sqlite", name: dbName });

export const fetchExternalSurceByFileId = async fileId => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        EXTERNAL_SOURCE_QUERIES.SELECT_EXTERNAL_SOURCE_BY_FILE_ID,
        [fileId],
        (_, { rows }) => {
          resolve(rows._array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
