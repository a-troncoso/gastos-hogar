import { start } from "./start";
import React, { useEffect, useState } from "react";
import {
  createInitialTables,
  insertBasicData,
  selectBasicData
} from "./src/dbOperations/main";
import CustomRouter from "./src/router/CustomRouter";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

import DB from "./src/utils/database";

start();

const App = () => {
  const [isBasicTablesCreated, setIsBasicTablesCreated] = useState(false);

  useEffect(() => {
    _createInitialTables();

    // _selectBasicData();
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

  const _createBasicData = async () => {
    // await insertBasicData();
  };

  const _selectBasicData = async () => {
    
    try {
      const a = await selectBasicData('purchase');
      console.h1(a);
    } catch (err) {
      console.err(err);
    }
  }
  const _importSQLBase = async () => {
    FileSystem.downloadAsync(
      Expo.Asset.fromModule(require("./assets/db/db.mp4")).uri,
      `${FileSystem.documentDirectory}/SQLite/db.GastosHogar_v002`
    );

    // FileSystem.readAsStringAsync(
    //   `${FileSystem.documentDirectory}/SQLite/db.GastosHogar_v002`
    // ).then(info => console.log("Info Database importada", info));
  };

  // const _makeSQLiteDirAsync = async () => {
  //   const dbTest = SQLite.openDatabase("dummy.db");

  //   try {
  //     await dbTest.transaction(tx => tx.executeSql(""));
  //   } catch (e) {
  //     console.log("error!", e);
  //   }
  // };

  return isBasicTablesCreated && <CustomRouter />;
};

export default App;
