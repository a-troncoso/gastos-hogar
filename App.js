import { start } from "./start";
import React, { useEffect, useState } from "react";
import {
  createInitialTables,
  insertBasicData,
  selectBasicData,
  selectOldData,
  describeTable,
} from "./src/dbOperations/app/appBDTransactions";
import Navigation from "./src/navigation";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import alerts from "./src/components/atoms/Alerts";
import AppContext from "./src/state";
import { initialContext } from "./src/state";
import useGooglePermission from "./src/hooks/useGooglePermission";
import { GOOGLE_OAUTH_CLIENT_ID } from "./src/constants";
start();

const App = () => {
  const [isBasicTablesCreated, setIsBasicTablesCreated] = useState(false);
  const { accessToken } = useGooglePermission(GOOGLE_OAUTH_CLIENT_ID);

  console.log(accessToken);

  useEffect(() => {
    _createInitialTables({ overrideTables: false });
    // _describeTable({ table: "category" })
    // _selectBasicData({ table: "expense", createOutputFile: false })
    // _selectBasicData({ table: "category", createOutputFile: false })
    // _selectBasicData({ table: "subcategory", createOutputFile: false })
  }, []);

  const _createInitialTables = async ({ overrideTables }) => {
    try {
      await createInitialTables({ overrideTable: overrideTables });
      await insertBasicData();
    } catch (err) {
      console.err(err);
    }
    setIsBasicTablesCreated(true);
  };

  const _selectOldData = async () => {
    try {
      const oldData = await selectOldData("expense");
      console.h1("oldData", oldData);

      FileSystem.writeAsStringAsync(
        `${FileSystem.documentDirectory}/OLD_DATABASE.txt`,
        JSON.stringify(oldData.rows)
      );
    } catch (err) {
      console.err(err);
    }
  };

  const _selectBasicData = async ({ table, createOutputFile }) => {
    try {
      const data = await selectBasicData(table);
      console.h1(table);
      console.h1(data);

      if (createOutputFile)
        FileSystem.writeAsStringAsync(
          `${FileSystem.documentDirectory}/OLD_DATABASE.txt`,
          JSON.stringify(data.rows)
        );
    } catch (err) {
      console.err(err);
    }
  };

  const _describeTable = async ({ table }) => {
    try {
      const data = await describeTable(table);
      console.h1(table);
      console.h1(data);
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
      alerts.throwErrorAlert("crear _makeSQLiteDirAsync", JSON.stringify(e));
    }
  };

  return (
    isBasicTablesCreated && (
      <AppContext.Provider value={initialContext}>
        <Navigation />
      </AppContext.Provider>
    )
  );
};;;

export default App;
