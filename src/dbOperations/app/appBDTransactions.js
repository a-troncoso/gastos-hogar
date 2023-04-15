import { MAIN_QUERIES } from "./appQueries";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { connectedDB } from "../utils/database";

const dbName = "db.GastosHogar";
const connDB = connectedDB({ engine: "sqlite", name: dbName });

const _createUserTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_USER
          : MAIN_QUERIES.CREATE_TABLE_USER,
        [],
        (_, s) => {
          resolve(s);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const _createExpenseTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_EXPENSE
          : MAIN_QUERIES.CREATE_TABLE_EXPENSE,
        [],
        (_, s) => {
          resolve(s);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const _createCategoryTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_CATEGORY
          : MAIN_QUERIES.CREATE_TABLE_CATEGORY,
        [],
        (_, s) => {
          resolve(s);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const _createSubcategoryTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_SUBCATEGORY
          : MAIN_QUERIES.CREATE_TABLE_SUBCATEGORY,
        [],
        (_, s) => {
          resolve(s);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const _createPurchaseImageTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_PURCHASE_IMAGE
          : MAIN_QUERIES.CREATE_TABLE_PURCHASE_IMAGE,
        [],
        (_, s) => {
          resolve(s);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const _createExternalSourceTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        opts && opts.overrideTable
          ? MAIN_QUERIES.OVERRIDE_TABLE_EXTERNAL_SOURCE
          : MAIN_QUERIES.CREATE_TABLE_EXTERNAL_SOURCE,
        [],
        (_, s) => {
          resolve(s);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const _createTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        opts?.overrideTable ? props.queryOverride : props.queryCreate,
        [],
        (_, s) => {
          resolve(s);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export const createInitialTables = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    return new Promise.all([
      _createUserTable({ ...opts }),
      _createExpenseTable({ ...opts }),
      _createCategoryTable({ ...opts }),
      _createSubcategoryTable({ ...opts }),
      _createPurchaseImageTable({ ...opts }),
      _createExternalSourceTable({ ...opts }),
      _createExternalSourceTable({ ...opts }),
      _createTable({
        ...opts,
        queryCreate: MAIN_QUERIES.CREATE_TABLE_INCOME,
        queryOverride: MAIN_QUERIES.OVERRIDE_TABLE_INCOME,
      }),
    ]).then(
      (_, s) => {
        resolve(s);
      },
      _ => {
        reject({ error: "Creating tables", desc: _ });
      }
    );
  });
};

export const insertBasicData = () => {
  const querysInsert = [
    `INSERT OR IGNORE INTO "user"("id", "name", "imagePath") VALUES (1, "alvaro", "");`,
    `INSERT OR IGNORE INTO "category"("id", "name", "maxAmountPerMonth") VALUES (1, "Sin categoría", 0);`,
    `INSERT OR IGNORE INTO "subcategory"("id", "name", "imagePath") VALUES (1, "Sin subcategoría", "");`,
  ];

  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      querysInsert.forEach(query => {
        tx.executeSql(
          query,
          [],
          (_, s) => resolve(s),
          (_, error) => reject({ ...error, desc: "inserting basic data" })
        );
      });
    });
  });
};

export const selectBasicData = table => {
  const querys = [`SELECT * FROM ${table};`];

  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        querys[0],
        [],
        (_, s) => resolve(JSON.stringify(s)),
        (_, error) => reject({ ...error, desc: "selecting basic data" })
      );
    });
  });
};

export const describeTable = table => {
  const querys = [`pragma table_info(${table});`];

  return new Promise((resolve, reject) => {
    connDB.transaction(tx => {
      tx.executeSql(
        querys[0],
        [],
        (_, { rows }) =>
          resolve(rows._array.map(r => ({ field: r.name, type: r.type }))),
        (_, error) => reject({ ...error, desc: `Describing table ${table}` })
      );
    });
  });
};

export const selectOldData = table => {
  const OLD_DB = SQLite.openDatabase(
    `${FileSystem.documentDirectory}/SQLite/db.GastosHogarDB`
  );

  const querys = [`SELECT * FROM ${table};`];

  return new Promise((resolve, reject) => {
    OLD_connDB.transaction(tx => {
      tx.executeSql(
        querys[0],
        [],
        (_, s) => resolve(s),
        (_, error) => reject({ ...error, desc: "selecting basic data" })
      );
    });
  });
};
