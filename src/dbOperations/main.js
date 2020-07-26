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

const _createPurchaseTable = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.withOverride
          ? MAIN_QUERIES.OVERRIDE_TABLE_PURCHASE
          : MAIN_QUERIES.CREATE_TABLE_PURCHASE,
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
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.withOverride
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
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.withOverride
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
    DB.transaction(tx => {
      tx.executeSql(
        opts && opts.withOverride
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

export const createInitialTables = ({ ...opts }) => {
  return new Promise((resolve, reject) => {
    return new Promise.all([
      _createUserTable({ ...opts }),
      _createPurchaseTable({ ...opts }),
      _createCategoryTable({ ...opts }),
      _createSubcategoryTable({ ...opts }),
      _createPurchaseImageTable({ ...opts })
    ]).then(
      (_, s) => {
        resolve(s);
      },
      (_, error) => {
        reject({ ...error, desc: "creating tables" });
      }
    );
  });
};

export const insertBasicData = () => {
  const querysInsert = [
    `INSERT INTO "user"("name", "image") VALUES ("teresa", "image_teresa");`
    // `INSERT INTO "category" ("name","image","active") VALUES ("comida","",1);`,
    // `INSERT INTO "category" ("name","image","active") VALUES ("salud","",1);`,
    // `INSERT INTO "category" ("name","image","active") VALUES ("aseo","",1);`,
    // `INSERT INTO "category" ("name","image","active") VALUES ("ropa","",1);`,
    // `INSERT INTO "category" ("name","image","active") VALUES ("entretención","",1);`
  ];

  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
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
    DB.transaction(tx => {
      tx.executeSql(
        querys[0],
        [],
        (_, s) => resolve(s),
        (_, error) => reject({ ...error, desc: "selecting basic data" })
      );
    });
  });
};
