export const EXPENSE_QUERIES = {
  INSERT_EXPENSE:
    "insert into expense (categoryId, subcategoryId, amount, description, date, userId) values (?, ?, ?, ?, ?, ?);",

  INSERT_EXPENSE_IMAGE:
    "insert into expense_image (expenseId, imagePath) values (?, ?);",

  SELECT_TOTAL_EXPENSES_BY_CATEGORY: `
    SELECT c.id, c.name, c.imagePath, c.maxAmountPerMonth, SUM(e.amount) AS amount
    FROM category c, expense e
    WHERE c.id=e.categoryId
    AND strftime('%m', e.date) = ?
    AND c.active = 1
    GROUP BY c.id, c.name;
  `,
  //TODO: Arreglar esto, no estamos recogiendo la imagen de compra
  // ( SELECT imagePath FROM expense_image WHERE expenseId=e.id LIMIT 1 ) image,
  // FROM expense e, category c, expense_image p_i
  // AND e.id = p_i.expenseId
  SELECT_EXPENSES_BY_CATEGORY: `
    SELECT
    e.id,
    e.date,
    e.amount
    FROM expense e, category c
    WHERE e.categoryId=c.id
    AND strftime('%m', e.date) = ?
    AND c.active = 1
    AND c.id=?
    GROUP BY e.id;
  `,

  SELECT_PURCHASE_IMAGE: "SELECT expenseId, image FROM expense_image",

  //TODO: Arreglar esto, no estamos recogiendo la imagen de compra

  // SELECT p.id, p_i.image, p.date, p.amount, p.categoryId, p.subcategoryId
  //   FROM expense p, expense_image p_i
  //   WHERE p.id = p_i.expenseId
  //   AND p.id=?;
  SELECT_PURCHASE_BY_ID: `
  SELECT p.id,  p.date, p.amount, p.categoryId, p.subcategoryId
    FROM expense p
    WHERE 
     p.id=?;

    
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
    SELECT strftime('%Y-%m-%dT%H:%M:%S', p.date) AS 'date', SUM(p.amount) AS 'totalAmount'
    FROM purchase p 
    WHERE strftime('%m', p.date) = ?
    AND strftime('%Y', p.date) = ?
    AND p.active = 1
    GROUP BY strftime('%d', p.date);
  `,

  TOTAL_AMOUNT_BY_YEAR_PER_MONTH: `
    SELECT strftime('%Y-%m-01T%H:%M:%S', p.date) AS 'date', SUM(p.amount) AS 'totalAmount'
    FROM purchase p 
    WHERE strftime('%Y', p.date) = ?
    AND p.active = 1
    GROUP BY strftime('%Y-%m', p.date);
  `
}
