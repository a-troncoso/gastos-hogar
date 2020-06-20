import React, { useEffect, useState } from "react";
import {
  createInitialTables,
  insertBasicData,
  dropTables
} from "./src/dbOperations/main";
import CustomRouter from "./src/router/CustomRouter";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const App = () => {
  const [isBasicDataCreated, setIsBasicDataCreated] = useState(false);

  useEffect(() => {
    _createBasicData();
  }, []);

  const _createBasicData = async () => {
    // await createInitialTables();
    // await insertBasicData();
    setIsBasicDataCreated(true);
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

  return isBasicDataCreated && <CustomRouter />;
};

export default App;
