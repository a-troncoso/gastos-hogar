import React, { useEffect, useState } from "react";
import {
  createInitialTables,
  insertBasicData,
  selectBasicData
} from "./src/dbOperations/main";
import CustomRouter from "./src/router/CustomRouter";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const App = () => {
  const [isBasicTablesCreated, setIsBasicTablesCreated] = useState(false);

  useEffect(() => {
    console.log(`${FileSystem.documentDirectory}/SQLite/db.GastosHogar_v003`);
    _createInitialTables();
  }, []);

  const _createInitialTables = async () => {
    try {
      const a = await createInitialTables({ withOverride: true });
      console.log("all tables created", a);
      const b = await insertBasicData();
      console.log("basic data inserted", b);
      const c = await selectBasicData();
      console.log("selectBasicData", c);
    } catch (err) {
      console.log("[ERROR]", err);
    }
    setIsBasicTablesCreated(true);
  };

  const _createBasicData = async () => {
    // await insertBasicData();
  };

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
