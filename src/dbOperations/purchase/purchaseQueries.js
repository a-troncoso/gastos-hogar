export const PURCHASE_QUERIES = {
  INSERT_PURCHASE:
    "insert into purchase (image, category, subcategory, amount, comment, date) values (?, ?, '', 0, '', ?);",
  SELECT_TOTAL_PURCHASES_BY_CATEGORY:
    "SELECT c.id, c.name, SUM(p.amount) AS amount FROM category c, purchase p WHERE c.id=p.category and strftime('%m', p.date) = ? GROUP BY c.id, c.name;",
  SELECT_PURCHASES_BY_CATEGORY:
    "SELECT p.id, p.image, p.date, p.amount FROM purchase p, category c WHERE p.category=c.id AND strftime('%m', p.date) = ? AND c.id=?;",
  SELECT_PURCHASE_BY_ID:
    "select p.id, p.image, p.date, p.amount, p.subcategory FROM purchase p WHERE p.id=?;",
  UPDATE_PURCHASE: "UPDATE purchase SET amount=? WHERE id=?;"
};
