export const CATEGORY_QUERIES = {
  SELECT_ALL_CATEGORIES: "select id, name, image from category where active=1;",
  SELECT_CATEGORY_BY_ID:
    "select c.id, c.name, c.image from category c where c.id=?;",
  UPDATE_CATEGORY: "UPDATE category SET name=? WHERE id=?;",
  REMOVE_CATEGORY: "UPDATE category SET active=0 WHERE id=?;",
  ADD_CATEGORY:
    `INSERT INTO "category" ("name","image","active") VALUES (?,?,1);`
};
