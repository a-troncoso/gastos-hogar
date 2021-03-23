export const DESCRIPTION_QUERIES = {
  SELECT_DESCRIPTION_BY_ID:
    "select c.id, c.name, c.image from category c where c.id=?;",
  UPDATE_DESCRIPTION: "UPDATE category SET name=? WHERE id=?;",
  REMOVE_DESCRIPTION: "UPDATE category SET active=0 WHERE id=?;",
  ADD_DESCRIPTION: `INSERT INTO "category" ("name","imagePath","active") VALUES (?,?,1);`
};
