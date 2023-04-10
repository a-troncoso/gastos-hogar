import * as XLSX from "xlsx";

export default () => {
  const readXLS = ({ data, sheets }) => {
    const workbook = XLSX.read(data, {
      type: "base64",
      sheets,
    });

    return { workbook };
  };

  return {
    readXLS,
  };
};
