import DB from "../../utils/database";
import { PURCHASE_QUERIES } from "./purchaseQueries";

export const insertPurchase = (pictureURI, categoryID) => {
  const currendDate = new Date();

  DB.transaction(tx => {
    tx.executeSql(
      PURCHASE_QUERIES.INSERT_PURCHASE,
      [pictureURI, categoryID, currendDate.toISOString()],
      (_, result) => {
        console.info("Purchase inserted in DataBase: ", result);
      },
      error => {
        console.error("Error inserting Purchase in Database: ", error);
      }
    );
  });
};

export const fetchTotalPurchasesByCategory = month => {
  return new Promise((resolve, reject) => {
    DB.transaction(tx => {
      tx.executeSql(
        PURCHASE_QUERIES.SELECT_TOTAL_PURCHASES_BY_CATEGORY,
        [month],
        (_, { rows }) => {
          resolve(
            rows._array.map(r => {
              return { ...r, extraInfo: { amount: r.amount } };
            })
          );
        },
        error => {
          reject(error);
        }
      );
    });
  });
};

export const fetchPurchasesByCategory = (month, categoryId) => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        PURCHASE_QUERIES.SELECT_PURCHASES_BY_CATEGORY,
        [month, categoryId],
        (_, { rows }) => {
          resolve(rows._array);
        },
        error => {
          console.error("Error fetching PURCHASES_BY_CATEGORY: ", error);
        }
      );
    });
  });
};

export const fetchPurchaseById = purchaseId => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        PURCHASE_QUERIES.SELECT_PURCHASE_BY_ID,
        [purchaseId],
        (_, { rows }) => {
          resolve(rows._array[0]);
        },
        error => {
          console.error("Error fetching PURCHASE_BY_ID: ", error);
        }
      );
    });
  });
};

export const patchPurchaseAmount = (purchaseId, amount) => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        PURCHASE_QUERIES.UPDATE_PURCHASE,
        [parseInt(amount, 10), purchaseId],
        () => {
          resolve("OK");
        },
        error => {
          console.error("Error fetching UPDATE_PURCHASE: ", error);
        }
      );
    });
  });
};
