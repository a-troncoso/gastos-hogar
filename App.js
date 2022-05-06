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
import useGoogleDrive from "./src/hooks/useGoogleDrive";

start();

const App = () => {
  const [isBasicTablesCreated, setIsBasicTablesCreated] = useState(false);
  const { files, fetchFileBinary, fetchMetadata, fetchContent } =
    useGoogleDrive();

  // const cartolaFileId = files.find(f => {
  //   if (f.name === "cartola.xls") return f.id;
  // });

  const cartolaFile = files.find(f => f.name === "cartola.xls");

  const obtainBinary = async () => {
    try {
      console.log("cartolaFile", cartolaFile);
      const cartola = await fetchFileBinary(cartolaFile.id);
      // console.log("cartolaBinary", cartolaBinary);
    } catch (error) {
      console.log("error", error);
    }
  };

  const obtainMetadata = async () => {
    try {
      console.log("cartolaFile", cartolaFile);
      const cartola = await fetchMetadata(cartolaFile.id);
      // console.log("cartolaBinary", cartolaBinary);
    } catch (error) {
      console.log("error", error);
    }
  };

  const obtainContent = async () => {
    try {
      console.log("cartolaFile", cartolaFile);
      const cartola = await fetchContent(cartolaFile.id);
      // console.log("cartolaBinary", cartolaBinary);
    } catch (error) {
      console.log("error", error);
    }
  };

  if (cartolaFile) {
    console.log("[VAMOS A OBTENER EL ARCHIVO]");
    obtainContent();
  }

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
};

export default App;
