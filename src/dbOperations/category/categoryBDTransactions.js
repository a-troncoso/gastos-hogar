import { CATEGORY_QUERIES } from "./categoryQueries"
import { connectDB } from "../../dbOperations"

const dbName = "db.GastosHogar"
const connectedDB = connectDB({ engine: "sqlite", name: dbName })

export const fetchAllCategories = () => {
  return new Promise(resolve => {
    connectedDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.SELECT_ALL_CATEGORIES,
        [],
        (_, result) => {
          resolve(result.rows._array)
        },
        (transaction, err) => {
          console.error("Error fetching fetchAllCategories: ", transaction, err)
        }
      )
    })
  })
}

export const fetchCategoryById = categoryId => {
  return new Promise(resolve => {
    connectedDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.SELECT_CATEGORY_BY_ID,
        [categoryId],
        (_, { rows }) => {
          resolve(rows._array[0])
        },
        (transaction, error) => {
          console.error("Error fetching CATEGORY_BY_ID: ", transaction, error)
        }
      )
    })
  })
}

export const patchCategoryName = (categoryId, categoryName) => {
  return new Promise(resolve => {
    connectedDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.UPDATE_CATEGORY,
        [categoryName.toString().toLowerCase(), categoryId],
        () => {
          resolve("OK")
        },
        error => {
          console.error("Error fetching UPDATE_CATEGORY: ", error)
        }
      )
    })
  })
}

export const removeCategory = categoryId => {
  return new Promise(resolve => {
    connectedDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.REMOVE_CATEGORY,
        [categoryId],
        () => {
          resolve("OK")
        },
        error => {
          console.error("Error fetching REMOVE_CATEGORY: ", error)
        }
      )
    })
  })
}

export const addCategory = (name, imagePath, maxAmountPerMonth) => {
  return new Promise(resolve => {
    connectedDB.transaction(tx => {
      tx.executeSql(
        CATEGORY_QUERIES.ADD_CATEGORY,
        [name, imagePath, maxAmountPerMonth],
        () => {
          resolve("OK")
        },
        error => {
          console.error("Error adding ADD_CATEGORY: ", error)
        }
      )
    })
  })
}
