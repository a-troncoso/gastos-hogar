import { start } from "./start";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import {
  createInitialTables,
  insertBasicData,
  selectBasicData,
  selectOldData,
  describeTable,
} from "./src/dbOperations/app/appBDTransactions";
import AppNavigation from "./src/navigation";
import { openDatabase } from "expo-sqlite";
import { writeAsStringAsync } from "expo-file-system";
import alerts from "./src/components/atoms/Alerts";
import AppContext from "./src/state";
import { initialContext } from "./src/state";
// import useDataExtractor from "./src/hooks/useDataExtractor/useDataExtractor";

start();

const App = () => {
  const [isBasicTablesCreated, setIsBasicTablesCreated] = useState(false);

  // useDataExtractor();

  useEffect(() => {
    setup();
    _selectBasicData({ table: "income" });
  }, []);

  const setup = async () => {
    await _createInitialTables({ overrideTables: false });
  };

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

      writeAsStringAsync(
        `${FileSystem.documentDirectory}/OLD_DATABASE.txt`,
        JSON.stringify(oldData.rows)
      );
    } catch (err) {
      console.err(err);
    }
  };

  const _selectBasicData = async ({ table, createOutputFile = false }) => {
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
      console.h1(`Información de la tabla ${table}`);
      console.h1(data);
    } catch (err) {
      console.err(err);
    }
  };

  const _makeSQLiteDirAsync = async () => {
    const dbTest = openDatabase("dummy.db");

    try {
      await dbTest.transaction(tx => tx.executeSql(""));
    } catch (e) {
      alerts.throwErrorAlert("crear _makeSQLiteDirAsync", JSON.stringify(e));
    }
  };

  return (
    isBasicTablesCreated && (
      <AppContext.Provider value={initialContext}>
        <AppNavigation />
      </AppContext.Provider>
    )
  );
};

export default App;
