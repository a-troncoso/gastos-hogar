import DB from "../utils/database";
import { MAIN_QUERIES } from "./mainQueries";

const _createUserTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.withOverride
          ? MAIN_QUERIES.OVERRIDE_TABLE_USER
          : MAIN_QUERIES.CREATE_TABLE_USER,
        [],
        () => {
          resolve("OK");
        },
        error => {
          reject(error);
          // console.log("Table user not created: ", error);
        }
      );
    });
  });
};

const _createPurchaseTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.withOverride
          ? MAIN_QUERIES.OVERRIDE_TABLE_PURCHASE
          : MAIN_QUERIES.CREATE_TABLE_PURCHASE,
        [],
        () => {
          resolve("OK");
          // console.log("Table purchase created");
        },
        error => {
          reject(error);
          // console.log("Table purchase not created: ", error);
        }
      );
    });
  });
};

const _createCategoryTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.withOverride
          ? MAIN_QUERIES.OVERRIDE_TABLE_CATEGORY
          : MAIN_QUERIES.CREATE_TABLE_CATEGORY,
        [],
        () => {
          resolve("OK");
          // console.log("Table category created");
        },
        error => {
          reject(error);
          // console.log("Table category not created: ", error);
        }
      );
    });
  });
};

const _createSubcategoryTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.withOverride
          ? MAIN_QUERIES.OVERRIDE_TABLE_SUBCATEGORY
          : MAIN_QUERIES.CREATE_TABLE_SUBCATEGORY,
        [],
        () => {
          resolve("OK");
          // console.log("Table subcategory created");
        },
        error => {
          reject(error);
          // console.log("Table subcategory not created: ", error);
        }
      );
    });
  });
};

const _createPurchaseImageTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.withOverride
          ? MAIN_QUERIES.OVERRIDE_TABLE_PURCHASE_IMAGE
          : MAIN_QUERIES.CREATE_TABLE_PURCHASE_IMAGE,
        [],
        () => {
          resolve("OK");
          // console.log("Table urchaseImage created");
        },
        error => {
          reject(error);
          // console.log("Table purchaseImage not created: ", error);
        }
      );
    });
  });
};

export const createInitialTables = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    return new Promise.all([
      _createUserTable({ ...opts }),
      _createPurchaseTable({ ...opts }),
      _createCategoryTable({ ...opts }),
      _createSubcategoryTable({ ...opts }),
      _createPurchaseImageTable({ ...opts })
    ]).then(
      () => {
        resolve("OK");
      },
      error => {
        reject({ ...error, desc: "creating tables" });
      }
    );
  });
};

export const insertBasicData = () => {
  // const querysInsert = [
  //   `INSERT INTO "category" ("name","image","active") VALUES ("comida","",1);`,
  //   `INSERT INTO "category" ("name","image","active") VALUES ("salud","",1);`,
  //   `INSERT INTO "category" ("name","image","active") VALUES ("aseo","",1);`,
  //   `INSERT INTO "category" ("name","image","active") VALUES ("ropa","",1);`,
  //   `INSERT INTO "category" ("name","image","active") VALUES ("entretención","",1);`
  // ];

  const querysInsert = [`INSERT INTO "user"("id") VALUES (3);`];

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      // querysInsert.forEach(query => {
      //   tx.executeSql(
      //     query,
      //     [],
      //     () => resolve("OK"),
      //     error => reject(error)
      //   );
      // });

      tx.executeSql(
        "INSERT INTO user(name, image) VALUES ('teresa', 'image_teresa');",
        [],
        () => resolve("OK"),
        error => reject({ ...error, desc: "inserting basic data" })
      );
    });
  });
};

export const selectBasicData = () => {
  const querys = [`SELECT * FROM user;`];

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        querys[0],
        [],
        data => resolve(data),
        error => reject({ ...error, desc: "selecting basic data" })
      );
    });
  });
};
