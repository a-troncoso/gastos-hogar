export const PURCHASE_QUERIES = {
  INSERT_PURCHASE:
    "insert into purchase (image, categoryId, subcategoryId, amount, comment, date) values (?, ?, '', 0, '', ?);",
  SELECT_TOTAL_PURCHASES_BY_CATEGORY: `
    SELECT c.id, c.name, SUM(p.amount) AS amount
    FROM category c, purchase p
    WHERE c.id=p.categoryId
    AND strftime('%m', p.date) = ?
    AND c.active = 1
    GROUP BY c.id, c.name;
  `,
  SELECT_PURCHASES_BY_CATEGORY: `
    SELECT p.id, p.image, p.date, p.amount
    FROM purchase p, category c
    WHERE p.categoryId=c.id
    AND strftime('%m', p.date) = ?
    AND c.active = 1
    AND c.id=?;
  `,
  SELECT_PURCHASE_BY_ID: `
    SELECT p.id, p.image, p.date, p.amount, p.subcategoryId
    FROM purchase p
    WHERE p.id=?;`,
  UPDATE_PURCHASE: "UPDATE purchase SET amount=? WHERE id=?;"
};
