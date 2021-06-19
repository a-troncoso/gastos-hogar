import {
  fetchAllCategories,
  fetchCategoryById,
  insertCategory,
  deleteCategory
} from "./category/categoryBDTransactions"

import { deleteExpense } from "./purchase/purchaseBDTransactions"

export const dbOperations = {
  category: {
    fetch: {
      fetchAll: fetchAllCategories,
      fetchById: fetchCategoryById
    },
    add: insertCategory,
    remove: deleteCategory
  },
  expense: {
    remove: deleteExpense
  }
}
