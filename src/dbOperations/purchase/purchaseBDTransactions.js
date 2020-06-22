import DB from "../../utils/database";
import { PURCHASE_QUERIES } from "./purchaseQueries";

export const insertPurchase = (pictures, categoryID) => {
  const currendDate = new Date();

  DB.transaction(tx => {
    tx.executeSql(
      PURCHASE_QUERIES.INSERT_PURCHASE,
      [categoryID, currendDate.toISOString()],
      (_, result) => {
        console.info("Purchase inserted in DataBase: ", result);

        const purchaseId = result.insertId;

        pictures.forEach(pictureURI => {
          tx.executeSql(
            PURCHASE_QUERIES.INSERT_PURCHASE_IMAGE,
            [purchaseId, pictureURI],
            (_, result) => {
              console.info("Purchase Image inserted  ", result);
            },
            error => {
              console.error(
                "Error inserting Purchase Image in Database: ",
                error
              );
            }
          );
          tx.executeSql(
            "select * from purchase_image;",
            [],
            (_, result) => {
              console.info("select * from purchase_image", result);
            },
            error => {
              console.error("Error select * from purchase_image: ", error);
            }
          );
        });
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
          console.error("Error fetching SELECT_PURCHASES_BY_CATEGORY: ", error);
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
          const returned =
            rows._array.length > 0 ? { ...rows._array[0], images: [] } : {};
          delete returned.image;

          rows._array.forEach(r => {
            returned.images = returned.images.concat(r.image);
          });

          resolve(returned);
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
        PURCHASE_QUERIES.UPDATE_PURCHASE_AMOUNT,
        [parseInt(amount, 10), purchaseId],
        () => {
          resolve("OK");
        },
        error => {
          console.error("Error fetching UPDATE_PURCHASE_AMOUNT: ", error);
        }
      );
    });
  });
};

export const patchPurchaseCategory = (purchaseId, categoryId) => {
  return new Promise(resolve => {
    DB.transaction(tx => {
      tx.executeSql(
        PURCHASE_QUERIES.UPDATE_PURCHASE_CATEGORY,
        [categoryId, purchaseId],
        () => {
          resolve("OK");
        },
        error => {
          console.error("Error fetching UPDATE_PURCHASE_CATEGORY: ", error);
        }
      );
    });
  });
};
