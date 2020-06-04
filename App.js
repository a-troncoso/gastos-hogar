import React, { useEffect, useState } from "react";
import { createInitialTables, insertBasicData } from "./src/dbOperations/main";
import CustomRouter from "./src/router/CustomRouter";

const App = () => {
  const [isBasicDataCreated, setIsBasicDataCreated] = useState(false);

  useEffect(() => {
    _createBasicData();
  }, []);

  const _createBasicData = async () => {
    await createInitialTables();
    await insertBasicData();
    setIsBasicDataCreated(true);
  };

  return isBasicDataCreated && <CustomRouter />;
};

export default App;
