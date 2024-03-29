import useGoogleDrive from "../useGoogleDrive";
import useFileSystem from "../useFileSystem";
import useXLS from "../useXLS";
import useCartolaBuilder from "../useCartolaBuilder";
import { insertExpensesFromExternalSource } from "../../dbOperations/purchase/purchaseBDTransactions";
import { insertIncomesFromExternalSource } from "../../dbOperations/income/incomeBDTransactions";
import {
  fetchExternalSourceByFileId,
  insertExternalSource,
} from "../../dbOperations/externalSources/externalSourcesBDTransactions";
import { CARTOLA_FILENAME } from "./constants";

export default ({ movementType = "expenses", onSendMessage = () => {} }) => {
  // TODO: Si en el futuro necesito Google Drive habilitar esto
  // const { findFilesByName, downloadFile } = useGoogleDrive({
  //   onReadyGoogleDrive: gDriveInstance => {
  //     // chargeDataFromExternalSource(gDriveInstance);
  //   },
  // });
  const { readFile } = useFileSystem();
  const { readXLS } = useXLS();
  const { generateTable } = useCartolaBuilder();

  const chargeDataFromDevice = async file => {
    try {
      const externalSourceData = await fetchExternalSourceByFileId(file.id);
      const externalSourceAlreadyExist = Boolean(externalSourceData);

      if (externalSourceAlreadyExist) {
        onSendMessage({ MSG_CODE: "EXTERNAL_SOURCE_ALREADY_EXIST" });
      } else {
        const dataSheet = await extractDataFromSheetFile({
          file,
          movementType,
        });
        saveDataOnDatabase({ data: dataSheet, movementType });
        onSendMessage({ MSG_CODE: "EXTERNAL_SOURCE_SAVED" });
      }
    } catch (error) {
      console.error(
        "Error al cargar data de la fuente externa",
        error,
        error.cause
      );
    }
  };

  const chargeDataFromExternalSource = async gDriveInstance => {
    try {
      const files = await findFilesByName(CARTOLA_FILENAME, gDriveInstance);
      files.forEach(async file => {
        const externalSourceData = await fetchExternalSourceByFileId(file.id);
        const externalSourceAlreadyExist = Boolean(externalSourceData);
        if (!externalSourceAlreadyExist) {
          insertExternalSource({ fileId: file.id, fileName: file.name });
          const dataSheet = await extractDataFromSheetFile(
            gDriveInstance.accessToken,
            file.id
          );
          saveDataOnDatabase({ data: dataSheet });
        }
      });
    } catch (error) {
      console.error(
        "Error al cargar data de la fuente externa",
        error,
        error.cause
      );
    }
  };

  const extractDataFromSheetFile = async ({
    accessToken = "",
    file,
    movementType = "expenses",
  }) => {
    try {
      let uri;
      if (accessToken) {
        const fileData = await downloadFile(file.id, accessToken);
        uri = fileData.uri;
      } else uri = file.uri;

      const data = await readFile({ uri });
      const { workbook } = readXLS({
        data,
      });

      const sheetName = getSheetName(workbook);

      if (!sheetName) throw new Error("No se encuentra la hoja de la cartola");

      const { table } = generateTable({
        data: workbook.Sheets[sheetName],
        movementType,
      });

      return table;
    } catch (error) {
      console.error("Error al extraer datos desde la planilla: ", error);
    }
  };

  const getSheetName = xlsFile => Object.keys(xlsFile.Sheets)[0];

  const saveDataOnDatabase = async ({ movementType, data }) => {
    const actionByMovementType = {
      expenses: () => insertExpensesFromExternalSource(data),
      income: () => insertIncomesFromExternalSource(data),
    };

    try {
      actionByMovementType[movementType](data);
    } catch (e) {
      console.error("Error al guardar data en la base de datos");
    }
  };

  return {
    chargeDataFromExternalSource,
    chargeDataFromDevice,
  };
};
