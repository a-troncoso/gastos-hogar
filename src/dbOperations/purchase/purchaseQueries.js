export const EXPENSE_QUERIES = {
  INSERT_EXPENSE: `
    INSERT INTO expense
      (categoryId, subcategoryId, amount, description, date, userId, extOperationNumber, source)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `,

  INSERT_EXPENSE_IMAGE:
    "insert into expense_image (expenseId, imagePath) values (?, ?);",

  INSERT_EXPENSE_IMAGES: pictures => {
    let values = "(?, ?)";
    if (pictures.length > 1)
      values = values.concat(", (?, ?)".repeat(pictures.length - 1));
    return `insert into expense_image (expenseId, imagePath) values ${values};`;
  },

  SELECT_TOTAL_EXPENSES_BY_CATEGORY: `
    SELECT c.id, c.name, c.imagePath, c.maxAmountPerMonth, SUM(e.amount) AS amount
    FROM category c, expense e
    WHERE c.id=e.categoryId
    AND strftime('%m', e.date) = ?
    AND c.active = 1
    GROUP BY c.id, c.name;
  `,
  //TODO: Sólo esta trayendo la primera foto
  SELECT_EXPENSES_BY_CATEGORY: `
    SELECT
      e.id,
      e.date,
      e.amount, 
      e_i.imagePath
    FROM expense e INNER JOIN category c ON 
      e.categoryId=c.id 
    LEFT JOIN expense_image e_i ON 
      e.id=e_i.expenseId 
    WHERE 
      strftime('%m', e.date) = ?
      AND e.active = 1
      AND c.id=?
      AND c.active = 1
    GROUP BY e.id
    ORDER BY e.date DESC;
  `,

  SELECT_PURCHASE_IMAGE: "SELECT expenseId, image FROM expense_image",

  SELECT_EXPENSE_BY_ID: `
    SELECT e.id, e_i.imagePath, e.date, e.amount, e.categoryId, e.subcategoryId, e.description
    FROM expense e
    LEFT JOIN expense_image e_i ON
    e.id = e_i.expenseId
    WHERE e.id=?;
  `,
  // SELECT_EXPENSE_BY_ID: `
  //   SELECT e.id, e_i.imagePath, e.date, e.amount, e.categoryId, e.subcategoryId
  //   FROM expense e, expense_image e_i
  //   WHERE e.id = e_i.expenseId
  //   AND e.id=?;
  // `,

  UPDATE_EXPENSE: `
    UPDATE expense
    SET categoryId=?,
    subcategoryId=?,
    amount=?,
    description=?,
    date=?,
    userId=?
    WHERE id=?;
  `,

  UPDATE_PURCHASE_AMOUNT: "UPDATE expense SET amount=? WHERE id=?;",

  UPDATE_PURCHASE_CATEGORY: "UPDATE expense SET categoryId=? WHERE id=?;",

  TOTAL_AMOUNT_BY_DAY: `
    SELECT SUM(e.amount) AS 'totalAmount' FROM expense e
    WHERE strftime('%d', e.date) = ?
    AND strftime('%m', e.date) = ?
    AND strftime('%Y', e.date) = ?
    AND e.active = 1;
  `,

  TOTAL_AMOUNT_BY_MONTH: `
    SELECT SUM(e.amount) AS 'totalAmount' FROM expense e
    WHERE strftime('%m', e.date) = ?
    AND strftime('%Y', e.date) = ?
    AND e.active = 1;
  `,

  TOTAL_AMOUNT_BY_YEAR: `
    SELECT SUM(e.amount) AS 'totalAmount' FROM expense e
    WHERE strftime('%Y', e.date) = ?
    AND e.active = 1;
  `,

  TOTAL_AMOUNT_BY_DAY_PER_CATEGORY: `
    SELECT c.name, SUM(e.amount) AS 'totalAmount'
    FROM category c, expense e
    WHERE e.categoryId = c.id
    AND c.active = 1
    AND strftime('%d', e.date) = ?
    AND strftime('%m', e.date) = ?
    AND strftime('%Y', e.date) = ?
    AND e.active = 1
    GROUP BY c.name;
  `,

  TOTAL_AMOUNT_BY_MONTH_PER_CATEGORY: `
    SELECT c.name, SUM(e.amount) AS 'totalAmount'
    FROM category c, expense e 
    WHERE e.categoryId = c.id
    AND c.active = 1
    AND strftime('%m', e.date) = ?
    AND strftime('%Y', e.date) = ?
    AND e.active = 1
    GROUP BY c.name;
  `,

  TOTAL_AMOUNT_BY_YEAR_PER_CATEGORY: `
    SELECT c.name, SUM(e.amount) AS 'totalAmount'
    FROM category c, expense e 
    WHERE e.categoryId = c.id
    AND c.active = 1
    AND strftime('%Y', e.date) = ?
    AND e.active = 1
    GROUP BY c.name;
  `,

  TOTAL_AMOUNT_BY_MONTH_PER_DAY: `
    SELECT strftime('%Y-%m-%dT%H:%M:%S', e.date) AS 'date', SUM(e.amount) AS 'totalAmount'
    FROM expense e 
    WHERE strftime('%m', e.date) = ?
    AND strftime('%Y', e.date) = ?
    AND e.active = 1
    GROUP BY strftime('%d', e.date);
  `,

  TOTAL_AMOUNT_BY_YEAR_PER_MONTH: `
    SELECT strftime('%Y-%m-01T%H:%M:%S', e.date) AS 'date', SUM(e.amount) AS 'totalAmount'
    FROM expense e 
    WHERE strftime('%Y', e.date) = ?
    AND e.active = 1
    GROUP BY strftime('%Y-%m', e.date);
  `,

  DELETE_EXPENSE: `UPDATE expense SET active=0 WHERE id=?;`,

  FETCH_EXPENSE: `
    SELECT e.id
    FROM expense e
    WHERE e.extOperationNumber = ?
    AND e.amount = ?
    AND e.date = ?
    AND e.source = ?
    AND e.active = 1;
    `,
};
