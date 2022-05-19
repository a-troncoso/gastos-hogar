export const fetchExternalSurceByFileId = async fileId => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        EXTERNAL_SOURCE_QUERIES.SELECT_EXTERNAL_SOURCE_BY_FILE_ID,
        [fileId],
        (_, { rows }) => {
          if (rows._array.length > 0) resolve(rows._array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
