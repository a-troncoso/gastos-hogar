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
  UPDATE_PURCHASE_CATEGORY: "UPDATE purchase SET categoryId=? WHERE id=?;",
  TOTAL_AMOUNT_BY_DAY: `
    SELECT SUM(p.amount) AS 'totalAmount' FROM purchase p
    WHERE strftime('%d', p.date) = ?
    AND strftime('%m', p.date) = ?
    AND strftime('%Y', p.date) = ?
    AND p.active = 1;
  `,
  TOTAL_AMOUNT_BY_MONTH: `
    SELECT SUM(p.amount) AS 'totalAmount' FROM purchase p
    WHERE strftime('%m', p.date) = ?
    AND strftime('%Y', p.date) = ?
    AND p.active = 1;
  `,
  TOTAL_AMOUNT_BY_YEAR: `
    SELECT SUM(p.amount) AS 'totalAmount' FROM purchase p
    WHERE strftime('%Y', p.date) = ?
    AND p.active = 1;
  `,
  TOTAL_AMOUNT_BY_DAY_PER_CATEGORY: `
    SELECT c.name, SUM(p.amount) AS 'totalAmount'
    FROM category c, purchase p
    WHERE p.categoryId = c.id
    AND c.active = 1
    AND strftime('%d', p.date) = ?
    AND strftime('%m', p.date) = ?
    AND strftime('%Y', p.date) = ?
    AND p.active = 1
    GROUP BY c.name;
  `,
  TOTAL_AMOUNT_BY_MONTH_PER_CATEGORY: `
    SELECT c.name, SUM(p.amount) AS 'totalAmount'
    FROM category c, purchase p 
    WHERE p.categoryId = c.id
    AND c.active = 1
    AND strftime('%m', p.date) = ?
    AND strftime('%Y', p.date) = ?
    AND p.active = 1
    GROUP BY c.name;
  `,
  TOTAL_AMOUNT_BY_YEAR_PER_CATEGORY: `
    SELECT c.name, SUM(p.amount) AS 'totalAmount'
    FROM category c, purchase p 
    WHERE p.categoryId = c.id
    AND c.active = 1
    AND strftime('%Y', p.date) = ?
    AND p.active = 1
    GROUP BY c.name;
  `,
  TOTAL_AMOUNT_BY_MONTH_PER_DAY: `
    SELECT datetime(strftime('%Y-%m-%d', p.date)) AS 'day', SUM(p.amount) AS 'totalAmount'
    FROM purchase p 
    WHERE strftime('%m', p.date) = ?
    AND strftime('%Y', p.date) = ?
    AND p.active = 1
    GROUP BY strftime('%d', p.date);
  `,
  TOTAL_AMOUNT_BY_YEAR_PER_MONTH: `
    SELECT datetime(strftime('%Y-%m-01', p.date)) AS 'month', SUM(p.amount) AS 'totalAmount'
    FROM purchase p 
    WHERE strftime('%Y', p.date) = ?
    AND p.active = 1
    GROUP BY strftime('%Y-%m', p.date);
  `
};
