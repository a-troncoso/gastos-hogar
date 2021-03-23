import DB from "../utils/database"
import { MAIN_QUERIES } from "./mainQueries"
import * as SQLite from "expo-sqlite"
import * as FileSystem from "expo-file-system"

const _createUserTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_USER
          : MAIN_QUERIES.CREATE_TABLE_USER,
        [],
        (_, s) => {
          resolve(s)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

const _createExpenseTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_EXPENSE
          : MAIN_QUERIES.CREATE_TABLE_EXPENSE,
        [],
        (_, s) => {
          resolve(s)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

const _createCategoryTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_CATEGORY
          : MAIN_QUERIES.CREATE_TABLE_CATEGORY,
        [],
        (_, s) => {
          resolve(s)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

const _createSubcategoryTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_SUBCATEGORY
          : MAIN_QUERIES.CREATE_TABLE_SUBCATEGORY,
        [],
        (_, s) => {
          resolve(s)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

const _createPurchaseImageTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_PURCHASE_IMAGE
          : MAIN_QUERIES.CREATE_TABLE_PURCHASE_IMAGE,
        [],
        (_, s) => {
          resolve(s)
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}

export const createInitialTables = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    return new Promise.all([
      _createUserTable({ ...opts }),
      _createExpenseTable({ ...opts }),
      _createCategoryTable({ ...opts }),
      _createSubcategoryTable({ ...opts }),
      _createPurchaseImageTable({ ...opts })
    ]).then(
      (_, s) => {
        resolve(s)
      },
      (_, error) => {
        reject({ ...error, desc: "creating tables" })
      }
    )
  })
}

export const insertBasicData = () => {
  const querysInsert = [
    `INSERT INTO "user"("name", "imagePath") VALUES ("alvaro", "");`,
    `INSERT INTO "subcategory"("name", "imagePath") VALUES ("Sin subcategoría", "");`
    // `INSERT INTO "category" ("name","imagePath","active") VALUES ("comida","",1);`,
    // `INSERT INTO "category" ("name","imagePath","active") VALUES ("salud","",1);`,
    // `INSERT INTO "category" ("name","imagePath","active") VALUES ("aseo","",1);`,
    // `INSERT INTO "category" ("name","imagePath","active") VALUES ("ropa","",1);`,
    // `INSERT INTO "category" ("name","imagePath","active") VALUES ("entretención","",1);`
  ]

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      querysInsert.forEach(query => {
        tx.executeSql(
          query,
          [],
          (_, s) => resolve(s),
          (_, error) => reject({ ...error, desc: "inserting basic data" })
        )
      })
    })
  })
}

export const selectBasicData = table => {
  const querys = [`SELECT * FROM ${table};`]

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        querys[0],
        [],
        (_, s) => resolve(s),
        (_, error) => reject({ ...error, desc: "selecting basic data" })
      )
    })
  })
}

export const describeTable = table => {
  const querys = [`pragma table_info(${table});`]

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        querys[0],
        [],
        (_, { rows }) =>
          resolve(rows._array.map(r => ({ field: r.name, type: r.type }))),
        (_, error) => reject({ ...error, desc: `describing table ${table}` })
      )
    })
  })
}

export const selectOldData = table => {
  const OLD_DB = SQLite.openDatabase(
    `${FileSystem.documentDirectory}/SQLite/db.GastosHogarDB`
  )

  const querys = [`SELECT * FROM ${table};`]

  return new Promise((resolve, reject) => {
    OLD_DB.transaction(tx => {
      tx.executeSql(
        querys[0],
        [],
        (_, s) => resolve(s),
        (_, error) => reject({ ...error, desc: "selecting basic data" })
      )
    })
  })
}
