export const SUBCATEGORY_QUERIES = {
  SELECT_ALL_CATEGORIES: "select id, name, image from subcategory where active=1;",
  SELECT_SUBCATEGORY_BY_ID:
    "select c.id, c.name, c.image from subcategory c where c.id=?;",
  UPDATE_SUBCATEGORY: "UPDATE subcategory SET name=? WHERE id=?;",
  REMOVE_SUBCATEGORY: "UPDATE subcategory SET active=0 WHERE id=?;",
  ADD_SUBCATEGORY:
    `INSERT INTO "subcategory" ("name","image","active") VALUES (?,?,1);`
};
