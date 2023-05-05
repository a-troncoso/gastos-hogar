export const CATEGORY_QUERIES = {
  ADD_CATEGORY: `INSERT INTO "category" ("name","imagePath","maxAmountPerMonth","active") VALUES (?,?,?,1);`,
  SELECT_ALL_CATEGORIES:
    "SELECT id, name, imagePath FROM category WHERE active=1 ORDER BY name;",
  SELECT_CATEGORY_BY_ID:
    "select c.id, c.name, c.maxAmountPerMonth, c.imagePath from category c where c.id=?;",
  UPDATE_CATEGORY:
    "UPDATE category SET name=?, maxAmountPerMonth=?, imagePath=? WHERE id=?;",
  REMOVE_CATEGORY: "UPDATE category SET active=0 WHERE id=?;",
};
