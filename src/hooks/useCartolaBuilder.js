export default () => {
  const generateTable = ({ data }) => {
    const READ_FROM_ROW = 14;
    let table = [];
    const colMap = {
      A: "date",
      D: "operationNumber",
      F: "description",
      H: "amount",
    };
    let rowCounter = READ_FROM_ROW;

    while (rowCounter <= 29) {
      let transaction = {};
      for (const col in colMap) {
        const cell = data[col + rowCounter];
        if (cell && cell.v) transaction[colMap[col]] = cell.v;
      }
      table.push(transaction);
      rowCounter = rowCounter + 1;
    }

    return { table };

    // for (const elm in sheet) {
    //   if (elm.length === 3) {
    //     const row = parseInt(elm.substring(elm.length - 2), 10);

    //     if (!isNaN(row) && row >= READ_FROM_ROW) {
    //       let transaction = {};

    //       for (const col in colMap) {
    //         const cell = sheet[col + row];
    //         if (cell && cell.v) transaction[colMap[col]] = cell.v;
    //       }
    //       console.log("transaction", transaction);
    //       // table.push(transaction);
    //       rowCounter = rowCounter + 1;
    //     }
    //   }
    // }
    // console.log("table", table);
  };

  return { generateTable };
};
