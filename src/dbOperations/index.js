import {
  fetchAllCategories,
  fetchCategoryById,
  insertCategory,
  deleteCategory,
} from "./category/categoryBDTransactions";

import { deleteExpense } from "./purchase/purchaseBDTransactions";
import {
  insertIncome,
  // fetchIncome,
  fetchIncomeByDate,
  fetchIncomeByMonth,
  fetchIncomeByYear,
} from "./income/incomeBDTransactions";

export const dbOperations = {
  category: {
    localDB: {
      fetch: {
        fetchAll: fetchAllCategories,
        fetchById: fetchCategoryById,
      },
      add: insertCategory,
      remove: deleteCategory,
    },
    api: {},
  },
  expense: {
    localDB: {
      remove: deleteExpense,
    },
    api: {},
  },
  income: {
    localDB: {
      add: insertIncome,
      fetch: {
        fetchByDate: fetchIncomeByDate,
        fetchByMonth: fetchIncomeByMonth,
        fetchByYear: fetchIncomeByYear,
      },
    },
    api: {},
  },
};
