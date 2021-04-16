import DB from "../../utils/database"
import { EXPENSE_QUERIES } from "./purchaseQueries"
import { formattedMonthNumber } from "../../utils/date"
import { fetchCategoryById } from "../category/categoryBDTransactions"
import { fetchSubcategoryById } from "../subcategory/subcategoryBDTransactions"

export const insertExpense = (
  pictures,
  categoryId,
  subcategoryId,
  amount,
  description,
  date,
  userId
) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES.INSERT_EXPENSE,
        [categoryId, subcategoryId, amount, description, date, userId],
        async (_, result) => {
          const expenseId = result.insertId

          if (pictures.length > 0) {
            insertExpenseImages(expenseId, pictures)
              .then(result => {
                resolve(result)
              })
              .catch(error => {
                console.error(
                  "Error inserting Expense Image in Database: ",
                  error
                )

                reject(error)
              })
          } else resolve(result)
        },
        error => {
          console.error("Error inserting Expense in Database: ", error)
          reject(error)
        }
      )
    })
  })
}

const insertExpenseImages = (expenseId, pictures) => {
  const variables = pictures.map(p => [expenseId, p]).flat()

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES.INSERT_EXPENSE_IMAGES(pictures),
        [...variables],
        (_, s) => {
          resolve(s)
        },
        error => {
          reject(error)
          // TODO: This must be a rollback
          console.error("Error inserting Purchase Images in Database: ", error)
        }
      )
    })
  })
}

export const fetchTotalExpensesByCategory = ({ date, mode }) => {
  const filterDateByMode = date => ({
    day: date.getFullYear(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  })

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES.SELECT_TOTAL_EXPENSES_BY_CATEGORY,
        [
          formattedMonthNumber(filterDateByMode(date)[mode], {
            inTwoDigits: true
          })
        ],
        (_, { rows }) => {
          resolve(
            rows._array.map(r => {
              return {
                id: r.id,
                name: r.name,
                extraInfo: {
                  currentAmount: r.amount,
                  maximumStop: r.maxAmountPerMonth
                }
              }
            })
          )
        },
        error => {
          reject(error)
        }
      )
    })
  })
}

export const fetchPurchasesByCategory = ({ date, mode, categoryId }) => {
  const filterDateByMode = date => ({
    day: date.getFullYear(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  })

  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES.SELECT_EXPENSES_BY_CATEGORY,
        [
          formattedMonthNumber(filterDateByMode(date)[mode], {
            inTwoDigits: true
          }),
          categoryId
        ],
        (_, { rows }) => {
          resolve(rows._array)
        },
        error => {
          console.error("Error fetching SELECT_EXPENSES_BY_CATEGORY: ", error)
        }
      )
    })
  })
}

export const fetchPurchaseById = purchaseId => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES.SELECT_EXPENSE_BY_ID,
        [purchaseId],
        async (_, { rows }) => {
          const result = {
            amount: rows._array[0].amount,
            categoryId: rows._array[0].categoryId,
            date: rows._array[0].date,
            id: rows._array[0].id,
            images: rows._array
              .filter(({ imagePath }) => imagePath !== null)
              .map(({ imagePath }) => imagePath),
            subcategoryId: rows._array[0].subcategoryId,
            description: rows._array[0].description
          }

          const resultWithProcessedIds = await processIds(result)
          resolve(resultWithProcessedIds)
        },
        error => {
          console.error("Error fetching PURCHASE_BY_ID: ", error)
        }
      )
    })
  })
}

const processIds = async result => {
  const categoryData = await fetchCategoryById(result.categoryId)
  const subcategoryData = await fetchSubcategoryById(result.subcategoryId)

  const dataProcesed = result
  dataProcesed.category = {
    id: dataProcesed.categoryId,
    name: categoryData ? categoryData.name : undefined
  }
  dataProcesed.subcategory = {
    id: dataProcesed.subcategoryId,
    name: subcategoryData ? subcategoryData.name : undefined
  }
  delete dataProcesed.categoryId
  delete dataProcesed.subcategoryId

  return dataProcesed
}

export const updateExpense = (
  expenseId,
  { pictures, categoryId, subcategoryId, amount, description, date, userId }
) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES.UPDATE_EXPENSE,
        [
          categoryId,
          subcategoryId,
          parseInt(amount, 10),
          description,
          date,
          userId,
          expenseId
        ],
        (_, s) => {
          resolve(s)
        },
        (_, error) => {
          reject(error)
          console.error("Error fetching UPDATE_PURCHASE_AMOUNT: ", error)
        }
      )
    })
  })
}

export const patchPurchaseAmount = (purchaseId, amount) => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES.UPDATE_PURCHASE_AMOUNT,
        [parseInt(amount, 10), purchaseId],
        (_, s) => {
          resolve(s)
        },
        (_, error) => {
          console.error("Error fetching UPDATE_PURCHASE_AMOUNT: ", error)
        }
      )
    })
  })
}

export const patchPurchaseCategory = (purchaseId, categoryId) => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES.UPDATE_PURCHASE_CATEGORY,
        [categoryId, purchaseId],
        (_, s) => {
          resolve(s)
        },
        (_, error) => {
          console.error("Error fetching UPDATE_PURCHASE_CATEGORY: ", error)
        }
      )
    })
  })
}

export const fetchTotalAmountByDateCriteria = ({ ...dateOptions }) => {
  const queryStatementByDateMode = {
    day: "TOTAL_AMOUNT_BY_DAY",
    month: "TOTAL_AMOUNT_BY_MONTH",
    year: "TOTAL_AMOUNT_BY_YEAR"
  }

  const params = {
    day: [
      "" + dateOptions.date.day,
      dateOptions.date.month,
      "" + dateOptions.date.year
    ],
    month: [dateOptions.date.month, "" + dateOptions.date.year],
    year: ["" + dateOptions.date.year]
  }

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES[queryStatementByDateMode[dateOptions.mode]],
        params[dateOptions.mode],
        (_, { rows }) => {
          if (rows._array.length === 1) resolve(rows._array[0])
          else reject("Result has no 1 rows")
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

export const fetchTotalAmountByDateCriteriaPerCategory = ({
  ...dateOptions
}) => {
  const queryStatementByDateMode = {
    day: "TOTAL_AMOUNT_BY_DAY_PER_CATEGORY",
    month: "TOTAL_AMOUNT_BY_MONTH_PER_CATEGORY",
    year: "TOTAL_AMOUNT_BY_YEAR_PER_CATEGORY"
  }

  const params = {
    day: [
      "" + dateOptions.date.day,
      dateOptions.date.month,
      "" + dateOptions.date.year
    ],
    month: [dateOptions.date.month, "" + dateOptions.date.year],
    year: ["" + dateOptions.date.year]
  }

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES[queryStatementByDateMode[dateOptions.mode]],
        params[dateOptions.mode],
        (_, { rows }) => {
          const parsed = rows._array.map(r => ({
            category: r.name,
            totalAmount: r.totalAmount
          }))

          resolve(parsed)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

export const fetchAmountsByDateCriteria = ({ ...dateOptions }) => {
  const queryStatementByDateMode = {
    month: "TOTAL_AMOUNT_BY_MONTH_PER_DAY",
    year: "TOTAL_AMOUNT_BY_YEAR_PER_MONTH"
  }

  const params = {
    month: [dateOptions.date.month, "" + dateOptions.date.year],
    year: ["" + dateOptions.date.year]
  }

  if (dateOptions.mode === "day")
    return new Promise(resolve => {
      resolve([])
    })

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        EXPENSE_QUERIES[queryStatementByDateMode[dateOptions.mode]],
        params[dateOptions.mode],
        (_, { rows }) => {
          resolve(rows._array)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}
