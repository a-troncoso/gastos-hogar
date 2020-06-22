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

const _createPurchaseImageTable = () => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        MAIN_QUERIES.CREATE_TABLE_PURCHASE_IMAGE,
        [],
        () => {
          resolve("OK");
          console.log("Table urchaseImage created");
        },
        error => {
          reject("ERROR");
          console.log("Table urchaseImage not created: ", error);
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
      _createSubcategoryTable(),
      _createPurchaseImageTable()
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

export const dropTables = () => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        "DROP TABLE IF EXISTS user;",
        [],
        () => {
          resolve("OK");
          console.log("Table user droped");
        },
        error => {
          reject("ERROR");
          console.log("Table user not droped: ", error);
        }
      );
      tx.executeSql(
        "DROP TABLE IF EXISTS category;",
        [],
        () => {
          resolve("OK");
          console.log("Table category droped");
        },
        error => {
          reject("ERROR");
          console.log("Table category not droped: ", error);
        }
      );
      tx.executeSql(
        "DROP TABLE IF EXISTS table_name;",
        [],
        () => {
          resolve("OK");
          console.log("Table subcategory droped");
        },
        error => {
          reject("ERROR");
          console.log("Table subcategory not droped: ", error);
        }
      );
      tx.executeSql(
        "DROP TABLE IF EXISTS purchase;",
        [],
        () => {
          resolve("OK");
          console.log("Table purchase droped");
        },
        error => {
          reject("ERROR");
          console.log("Table purchase not droped: ", error);
        }
      );
      tx.executeSql(
        "DROP TABLE IF EXISTS purchase_image;",
        [],
        () => {
          resolve("OK");
          console.log("Table purchase_image droped");
        },
        error => {
          reject("ERROR");
          console.log("Table purchase_image not droped: ", error);
        }
      );
    });
  });
};

export const insertBasicData = () => {
  const querysInsert = [
    `INSERT INTO "category" ("name","image","active") VALUES ("comida","",1);`,
    `INSERT INTO "category" ("name","image","active") VALUES ("salud","",1);`,
    `INSERT INTO "category" ("name","image","active") VALUES ("aseo","",1);`,
    `INSERT INTO "category" ("name","image","active") VALUES ("ropa","",1);`,
    `INSERT INTO "category" ("name","image","active") VALUES ("entretención","",1);`
  ];

  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql("delete from category;");
      querysInsert.forEach(query => {
        tx.executeSql(query);
      });
      resolve("OK");
    });
  });
};
