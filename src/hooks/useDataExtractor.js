import useGoogleDrive from "./useGoogleDrive";
import useFileSystem from "./useFileSystem";
import useXLS from "./useXLS";
import useCartolaBuilder from "./useCartolaBuilder";
import { insertExpensesFromExternalSource } from "../dbOperations/purchase/purchaseBDTransactions";
import {
  fetchExternalSourceByFileId,
  insertExternalSource,
} from "../dbOperations/externalSources/externalSourcesBDTransactions";

const CARTOLA_FILENAME = "Cartola_Chequera";

export default () => {
  const { findFilesByName, downloadFile } = useGoogleDrive({
    onReadyGoogleDrive: gDriveInstance => {
      chargeDataFromExternalSource(gDriveInstance);
    },
  });
  const { readFile } = useFileSystem();
  const { readXLS } = useXLS();
  const { generateTable } = useCartolaBuilder();

  const chargeDataFromExternalSource = async gDriveInstance => {
    try {
      const files = await findFilesByName(CARTOLA_FILENAME, gDriveInstance);
      files.forEach(async file => {
        const externalSourceData = await fetchExternalSourceByFileId(file.id);
        const externalSourceAlreadyExist = Boolean(externalSourceData);
        if (externalSourceAlreadyExist) {
          console.log(
            "No se agrega el external_source " + file.name + " porque ya existe"
          );
        } else {
          insertExternalSource({ fileId: file.id, fileName: file.name });
          const dataSheet = await extractDataFromSheetFile(
            gDriveInstance.accessToken,
            file.id
          );
          saveDataOnDatabase({ data: dataSheet });
        }
      });
    } catch (error) {
      console.log(
        "Error al cargar data de la fuente externa",
        error,
        error.cause
      );
    }
  };

  const extractDataFromSheetFile = async (accessToken, fileId) => {
    try {
      const { uri } = await downloadFile(fileId, accessToken);
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
    chargeDataFromExternalSource,
  };
};
