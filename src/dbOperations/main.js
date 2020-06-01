import * as SQLite from "expo-sqlite";
import { MAIN_QUERIES } from "./mainQueries";

export const createInitialTables = () => {
  const db = SQLite.openDatabase(
    `${FileSystem.documentDirectory}/SQLite/db.GastosHogarDB`
  );

  db.transaction(
    tx => {
      tx.executeSql(
        MAIN_QUERIES.CREATE_TABLE_USER,
        [],
        () => {
          console.log("Table user created");
        },
        error => {
          console.log("Table user not created: ", error);
        }
      );
      tx.executeSql(
        MAIN_QUERIES.CREATE_TABLE_PURCHASE,
        [],
        () => {
          console.log("Table purchase created");
        },
        error => {
          console.log("Table purchase not created: ", error);
        }
      );
      tx.executeSql(
        MAIN_QUERIES.CREATE_TABLE_CATEGORY,
        [],
        () => {
          console.log("Table category created");
        },
        error => {
          console.log("Table category not created: ", error);
        }
      );
      tx.executeSql(
        MAIN_QUERIES.CREATE_TABLE_SUBCATEGORY,
        [],
        () => {
          console.log("Table subcategory created");
        },
        error => {
          console.log("Table subcategory not created: ", error);
        }
      );
    },
    error => {
      console.error("Error creating tables: ", error);
    },
    () => {
      console.log("All tables created");
    }
  );
};

export const insertBasicData = () => {
  const db = SQLite.openDatabase(
    `${FileSystem.documentDirectory}/SQLite/db.GastosHogarDB`
  );

  db.transaction(tx => {
    tx.executeSql("delete from category;");
    tx.executeSql("insert into category (name, image) values ('comida', '');");
    tx.executeSql("insert into category (name, image) values ('salud', '');");
    tx.executeSql("insert into category (name, image) values ('aseo', '');");
    tx.executeSql("insert into category (name, image) values ('ropa', '');");
    tx.executeSql(
      "insert into category (name, image) values ('entretención', '');"
    );
  });
};
