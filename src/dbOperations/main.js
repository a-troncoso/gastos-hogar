import DB from "../utils/database";
import { MAIN_QUERIES } from "./mainQueries";

const _createUserTable = () => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        MAIN_QUERIES.CREATE_TABLE_USER,
        [],
        () => {
          resolve("OK");
          console.log("Table user created");
        },
        error => {
          reject("ERROR");
          console.log("Table user not created: ", error);
        }
      );
    });
  });
};

const _createPurchaseTable = () => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        MAIN_QUERIES.CREATE_TABLE_PURCHASE,
        [],
        () => {
          resolve("OK");
          console.log("Table purchase created");
        },
        error => {
          reject("ERROR");
          console.log("Table purchase not created: ", error);
        }
      );
    });
  });
};

const _createCategoryTable = () => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        MAIN_QUERIES.CREATE_TABLE_CATEGORY,
        [],
        () => {
          resolve("OK");
          console.log("Table category created");
        },
        error => {
          reject("ERROR");
          console.log("Table category not created: ", error);
        }
      );
    });
  });
};

const _createSubcategoryTable = () => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        MAIN_QUERIES.CREATE_TABLE_SUBCATEGORY,
        [],
        () => {
          resolve("OK");
          console.log("Table subcategory created");
        },
        error => {
          reject("ERROR");
          console.log("Table subcategory not created: ", error);
        }
      );
    });
  });
};

export const createInitialTables = () => {
  return new Promise((resolve, reject) => {
    return new Promise.all([
      _createUserTable(),
      _createPurchaseTable(),
      _createCategoryTable(),
      _createSubcategoryTable()
    ]).then(
      () => {
        resolve("OK");
      },
      () => {
        reject("ERROR");
      }
    );
  });
};

export const insertBasicData = () => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql("delete from category;");
      tx.executeSql(
        "insert into category (name, image) values ('comida', '');"
      );
      tx.executeSql("insert into category (name, image) values ('salud', '');");
      tx.executeSql("insert into category (name, image) values ('aseo', '');");
      tx.executeSql("insert into category (name, image) values ('ropa', '');");
      tx.executeSql(
        "insert into category (name, image) values ('entretención', '');"
      );
      resolve("OK");
    });
  });
};
