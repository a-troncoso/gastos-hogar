export const INCOME_QUERIES = {
  INSERT_INCOME: `
    INSERT INTO "income"
      ("amount","description", "date", "userId", "extOperationNumber", "source", "active")
    VALUES
      (?,?,?,?,?,?,1);
  `,
  SELECT_INCOME_BY_ID: `SELECT "amount","description", "date" FROM "income" WHERE id=? AND "active" = 1;`,
  TOTAL_AMOUNT_BY_DAY: `
    SELECT SUM(e.amount) AS 'totalAmount' FROM income e
    WHERE strftime('%d', e.date) = ?
    AND strftime('%m', e.date) = ?
    AND strftime('%Y', e.date) = ?
    AND e.active = 1;
  `,
  TOTAL_AMOUNT_BY_MONTH: `
    SELECT SUM(e.amount) AS 'totalAmount' FROM income e
    WHERE strftime('%m', e.date) = ?
    AND strftime('%Y', e.date) = ?
    AND e.active = 1;
  `,
  TOTAL_AMOUNT_BY_YEAR_PER_MONTH: `
    SELECT SUM(e.amount) AS 'totalAmount' FROM income e
    WHERE strftime('%m', e.date) = ?
    AND strftime('%Y', e.date) = ?
    AND e.active = 1;
  `,
  TOTAL_AMOUNT_BY_YEAR: `
    SELECT SUM(e.amount) AS 'totalAmount' FROM income e
    WHERE strftime('%Y', e.date) = ?
    AND e.active = 1;
  `,
  SELECT_INCOME_BY_DATE: `SELECT "amount", "description", "date" FROM "income" WHERE "active" = 1 AND "date" = ?;`,
  SELECT_INCOME_BY_MONTH: `SELECT "amount", "description", "date" FROM "income" WHERE strftime('%m', date) = ? AND active = 1;`,
  SELECT_INCOME_BY_YEAR: `SELECT "amount", "description", "date" FROM "income" WHERE strftime('%Y', date) = ? AND active = 1;`,
  UPDATE_INCOME: `UPDATE "income" SET "amount" = ?, "description" = ?, "date" = ? WHERE "id" = ?;`,
  // AVAILABLE_IN_MONTH: `
  //   SELECT SUM(i.amount) - SUM(e.amount) AS 'amountAvailable'
  //   FROM income i
  //   LEFT JOIN expense e
  //   ON strftime('%m', i.date) = strftime('%m', e.date)
  //   AND strftime('%Y', i.date) = strftime('%Y', e.date)
  //   WHERE strftime('%m', i.date) = ?
  //   AND strftime('%Y', i.date) = ?
  //   AND i.active = 1
  //   AND e.active = 1;
  // `,
  FETCH_INCOME: `
    SELECT i.id
    FROM income i
    WHERE i.extOperationNumber = ?
    AND i.amount = ?
    AND i.date = ?
    AND i.source = ?
    AND i.active = 1;
    `,
};
