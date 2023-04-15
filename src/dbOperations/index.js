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
    fetch: {
      fetchAll: fetchAllCategories,
      fetchById: fetchCategoryById,
    },
    add: insertCategory,
    remove: deleteCategory,
  },
  expense: {
    remove: deleteExpense,
  },
  income: {
    add: insertIncome,
    fetch: {
      fetchByDate: fetchIncomeByDate,
      fetchByMonth: fetchIncomeByMonth,
      fetchByYear: fetchIncomeByYear,
    },
  },
};
