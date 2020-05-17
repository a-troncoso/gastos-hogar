import React, { useEffect } from "react";
import * as SQLite from "expo-sqlite";
import CustomRouter from "./src/router/CustomRouter";

const db = SQLite.openDatabase("db.GastosHogarDB");

const App = () => {
  useEffect(() => {
    db.transaction(
      tx => {
        tx.executeSql(
          "create table if not exists user (id integer primary key not null, name text, image text, purchaseId integer);"
        );
        tx.executeSql(
          "create table if not exists purchase (id integer primary key not null, image text, category text, subcategory text, amount integer, comment text, date text);"
        );
        tx.executeSql(
          "create table if not exists category (id integer primary key not null, name text, image text);"
        );
        tx.executeSql(
          "create table if not exists subcategory (id integer primary key not null, name text, image text);"
        );
      },
      error => {
        console.error("Error in transaction", error);
      },
      () => {
        console.info(
          "Tables user, purchase, category, subcategory are created"
        );
      }
    );
  }, []);

  return <CustomRouter />;
};

export default App;
