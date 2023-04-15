import { INCOME_QUERIES } from "./incomeQueries";
import { connectedDB } from "../utils/database";

const dbName = "db.GastosHogar";
const connDB = connectedDB({ engine: "sqlite", name: dbName });

const runTransaction = ({ query, params }) => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const insertIncome = ({ amount, description, date }) => {
  return runTransaction({
    query: INCOME_QUERIES.INSERT_INCOME,
    params: [amount, description, date],
  });
};

export const fetchIncomeById = id => {
  return runTransaction({
    query: INCOME_QUERIES.SELECT_INCOME_BY_ID,
    params: [id],
  });
};

export const fetchIncomeByDate = ({ date }) => {
  return runTransaction({
    query: INCOME_QUERIES.SELECT_INCOME_BY_DATE,
    params: [date],
  });
};

export const fetchIncomeByMonth = ({ month }) => {
  return runTransaction({
    query: INCOME_QUERIES.SELECT_INCOME_BY_MONTH,
    params: [month],
  });
};

export const fetchIncomeByYear = ({ year }) => {
  return runTransaction({
    query: INCOME_QUERIES.SELECT_INCOME_BY_YEAR,
    params: [year],
  });
};

export const updateIncome = (id, { amount, description, date }) => {
  return runTransaction({
    query: INCOME_QUERIES.UPDATE_INCOME,
    params: [amount, description, date, id],
  });
};

export const fetchTotalIncomesByDateCriteria = ({ ...dateOptions }) => {
  console.log({ ...dateOptions });
  const queryStatementByDateMode = {
    day: "TOTAL_AMOUNT_BY_DAY",
    month: "TOTAL_AMOUNT_BY_MONTH",
    year: "TOTAL_AMOUNT_BY_YEAR",
  };

  const params = {
    day: [
      `0${dateOptions.date.day}`.slice(-2),
      dateOptions.date.month,
      "" + dateOptions.date.year,
    ],
    month: [dateOptions.date.month, "" + dateOptions.date.year],
    year: ["" + dateOptions.date.year],
  };

  console.log("params[dateOptions.mode]", params[dateOptions.mode]);

  return runTransaction({
    query: INCOME_QUERIES[queryStatementByDateMode[dateOptions.mode]],
    params: params[dateOptions.mode],
  });

  // return new Promise((resolve, reject) => {
  //   connDB.transaction(tx => {
  //     tx.executeSql(
  //       INCOME_QUERIES[queryStatementByDateMode[dateOptions.mode]],
  //       params[dateOptions.mode],
  //       (_, { rows }) => {
  //         console.log("res", res);
  //         if (rows._array.length === 1) resolve(rows._array[0]);
  //         else reject("Result has no one rows");
  //       },
  //       (_, error) => {
  //         reject(error);
  //       }
  //     );
  //   });
  // });
};
