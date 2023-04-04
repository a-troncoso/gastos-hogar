import useGoogleDrive from "./useGoogleDrive";
import useFileSystem from "./useFileSystem";
import useXLS from "./useXLS";
import useCartolaBuilder from "./useCartolaBuilder";
import { insertExpensesFromExternalSource } from "../dbOperations/purchase/purchaseBDTransactions";
import {
  fetchExternalSurceByFileId,
  insertExternalSource,
} from "../dbOperations/externalSources/externalSourcesBDTransactions";

const CARTOLA_FILENAME = "Cartola_Chequera";

export default () => {
  const { findFileByName, downloadFile } = useGoogleDrive({
    onReadyGoogleDrive: gDriveInstance => {
      console.log("Se ejecuta onReadyGoogleDrive desde useDataExtractor.js");
      chargeDataFromExternalSource(gDriveInstance);
    },
  });
  const { readFile } = useFileSystem();
  const { readXLS } = useXLS();
  const { generateTable } = useCartolaBuilder();

  const chargeDataFromExternalSource = async gDriveInstance => {
    console.log("Ejecutamos chargeDataFromExternalSource");
    try {
      const file = await findFileByName(CARTOLA_FILENAME, gDriveInstance);
      console.log("file", file);
      const externalSourceData = await fetchExternalSurceByFileId(file.id);
      console.log("externalSourceData", externalSourceData);
      const externalSourceAlreadyExist = !!externalSourceData;
      console.log("externalSourceAlreadyExist", externalSourceAlreadyExist);

      if (externalSourceAlreadyExist)
        throw Error("No se puede guardar el external_source", {
          cause: "Ya se encuentra cargado el archivo " + CARTOLA_FILENAME,
        });
      else
        insertExternalSource({ fileId: file.id, fileName: CARTOLA_FILENAME });

      const dataSheet = await extractDataFromSheet(gDriveInstance);
      console.log("dataSheet", dataSheet);
      // saveDataOnDatabase({ data: dataSheet });
    } catch (error) {
      console.log(
        "Error al cargar data de la fuente externa",
        error,
        error.cause
      );
    }
  };

  const extractDataFromSheet = async gDriveInstance => {
    try {
      const file = await findFileByName(CARTOLA_FILENAME, gDriveInstance);
      const { uri } = await downloadFile(file.id, gDriveInstance.accessToken);
      console.log("uri", uri);
      const data = await readFile({ uri });
      const { workbook } = readXLS({
        data,
        sheets: "cartolaChequeraElectrónica",
      });
      const { table } = generateTable({
        data: workbook.Sheets["cartolaChequeraElectrónica"],
      });
      return table;
    } catch (error) {
      console.log("error", JSON.stringify(error));
    }
  };

  const saveDataOnDatabase = async ({ data }) => {
    try {
      insertExpensesFromExternalSource(data);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    extractDataFromSheet,
    chargeDataFromExternalSource,
  };
};
