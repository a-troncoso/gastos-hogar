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

// export const fetchIncome = () => {
//   return runTransaction({
//     query: INCOME_QUERIES.SELECT_INCOME,
//     params: [],
//   });
// };

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
