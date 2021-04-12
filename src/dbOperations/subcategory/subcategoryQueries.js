export const SUBCATEGORY_QUERIES = {
  SELECT_ALL_CATEGORIES: "select id, name, imagePath from subcategory where active=1;",
  SELECT_SUBCATEGORY_BY_ID:
    "select s.id, s.name, s.imagePath from subcategory s where s.id=? AND active=1;",
  UPDATE_SUBCATEGORY: "UPDATE subcategory SET name=? WHERE id=?;",
  REMOVE_SUBCATEGORY: "UPDATE subcategory SET active=0 WHERE id=?;",
  ADD_SUBCATEGORY:
    `INSERT INTO "subcategory" ("name","imagePath","active") VALUES (?,?,1);`
};
