export const EXTERNAL_SOURCE_QUERIES = {
  SELECT_EXTERNAL_SOURCE_BY_FILE_ID: `
    SELECT es.id, es.fileName
    FROM external_source es
    WHERE es.fileId = ?;
  `,
  INSERT_EXTERNAL_SOURCE: `
    INSERT INTO external_source (fileId, fileName) VALUES (?, ?);
  `,
};
