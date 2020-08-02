import { start } from "./start";
import React, { useEffect, useState } from "react";
import {
  createInitialTables,
  insertBasicData,
  selectBasicData,
  selectOldData
} from "./src/dbOperations/main";
import CustomRouter from "./src/router/CustomRouter";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

start();

const App = () => {
  const [isBasicTablesCreated, setIsBasicTablesCreated] = useState(false);

  useEffect(() => {
    _createInitialTables();
  }, []);

  const _createInitialTables = async () => {
    try {
      await createInitialTables({ withOverride: false });
      await insertBasicData();
    } catch (err) {
      console.err(err);
    }
    setIsBasicTablesCreated(true);
  };

  const _selectOldData = async () => {
    try {
      const oldData = await selectOldData("purchase");
      console.h1("oldData", oldData);

      FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}/OLD_DATABASE.txt`,
        JSON.stringify(oldData.rows)
      );
    } catch (err) {
      console.err(err);
    }
  };

  const _selectBasicData = async () => {
    try {
      const data = await selectBasicData("purchase");
      console.h1(data);

      FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}/OLD_DATABASE.txt`,
        JSON.stringify(data.rows)
      );
    } catch (err) {
      console.err(err);
    }
  };

  const _importSQLBase = async () => {
    FileSystem.downloadAsync(
      Expo.Asset.fromModule(require("./assets/db/db.mp4")).uri,
      `${FileSystem.documentDirectory}/SQLite/db.GastosHogar_v002`
    );
  };

  const _makeSQLiteDirAsync = async () => {
    const dbTest = SQLite.openDatabase("dummy.db");

    try {
      await dbTest.transaction(tx => tx.executeSql(""));
    } catch (e) {
      console.log("error!", e);
    }
  };

  return isBasicTablesCreated && <CustomRouter />;
};

export default App;
