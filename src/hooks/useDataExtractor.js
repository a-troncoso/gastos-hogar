import useGoogleDrive from "./useGoogleDrive";
import useFileSystem from "./useFileSystem";
import useXLS from "./useXLS";
import useCartolaBuilder from "./useCartolaBuilder";
import { insertExpensesFromExternalSource } from "../dbOperations/purchase/purchaseBDTransactions";
import { fetchExternalSurceByFileId } from "../dbOperations/externalSources/externalSourcesBDTransactions";

const CARTOLA_FILENAME = "Cartola_Chequera";

export default () => {
  const { findFileByName, downloadFile } = useGoogleDrive();
  const { readFile } = useFileSystem();
  const { readXLS } = useXLS();
  const { generateTable } = useCartolaBuilder();

  const isExternalSourceAlreadyCharged = async fileId => {
    const externalSource = await fetchExternalSurceByFileId(fileId);
    fetchExternalSurceByFileId(fileId);
  };

  const chargeDataFromExternalSource = async () => {
    try {
      const file = await findFileByName(CARTOLA_FILENAME);
      console.log("file", file);
      const externalSourceData = await fetchExternalSurceByFileId(file.id);
      console.log("externalSourceData", externalSourceData);
      const isExternalSourceAlreadyCharged = !!externalSourceData;
      console.log(
        "isExternalSourceAlreadyCharged",
        isExternalSourceAlreadyCharged
      );

      if (isExternalSourceAlreadyCharged) return;

      const dataSheet = await extactDataFromSheet();
      console.log("dataSheet", dataSheet);
      // saveDataOnDatabase({ data: dataSheet });
    } catch (error) {
      console.log(
        "Error al cargar data de la fuente externa",
        JSON.stringify(error)
      );
    }
  };

  const extractDataFromSheet = async () => {
    try {
      const file = await findFileByName(CARTOLA_FILENAME);
      const { uri } = await downloadFile(file.id);
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
