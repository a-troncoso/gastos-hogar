import React, { useEffect } from "react";
import { createInitialTables, insertBasicData } from "./src/dbOperations/main";
import CustomRouter from "./src/router/CustomRouter";

const App = () => {
  useEffect(() => {
    createInitialTables();
    insertBasicData();
  }, []);

  return <CustomRouter />;
};

export default App;
