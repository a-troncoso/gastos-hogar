export const PURCHASE_QUERIES = {
  INSERT_PURCHASE:
    "insert into purchase (categoryId, subcategoryId, amount, comment, date) values (?, '', 0, '', ?);",
  INSERT_PURCHASE_IMAGE:
    "insert into purchase_image (purchaseId, image) values (?, ?);",
  SELECT_TOTAL_PURCHASES_BY_CATEGORY: `
    SELECT c.id, c.name, SUM(p.amount) AS amount
    FROM category c, purchase p
    WHERE c.id=p.categoryId
    AND strftime('%m', p.date) = ?
    AND c.active = 1
    GROUP BY c.id, c.name;
  `,
  SELECT_PURCHASES_BY_CATEGORY: `
    SELECT p.id,(
      SELECT image FROM purchase_image WHERE purchaseId=p.id LIMIT 1
    ) image,
    p.date, p.amount
    FROM purchase p, category c, purchase_image p_i
    WHERE p.categoryId=c.id
    AND p.id = p_i.purchaseId
    AND strftime('%m', p.date) = ?
    AND c.active = 1
    AND c.id=?
    GROUP BY p.id;
  `,
  SELECT_PURCHASE_IMAGE: "SELECT purchaseId, image FROM purchase_image",
  SELECT_PURCHASE_BY_ID: `
    SELECT p.id, p_i.image, p.date, p.amount, p.categoryId, p.subcategoryId
    FROM purchase p, purchase_image p_i
    WHERE p.id = p_i.purchaseId
    AND p.id=?;
  `,
  UPDATE_PURCHASE_AMOUNT: "UPDATE purchase SET amount=? WHERE id=?;",
  UPDATE_PURCHASE_CATEGORY: "UPDATE purchase SET categoryId=? WHERE id=?;"
};
