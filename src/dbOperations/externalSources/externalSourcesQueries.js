export const EXTERNAL_SOURCE_QUERIES = {
  SELECT_EXTERNAL_SOURCE_BY_FILE_ID: `
    SELECT es.id, es.fileName
    FROM external_source es
    WHERE es.fileId = ?;
  `,
};
