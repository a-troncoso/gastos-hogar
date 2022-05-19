const extractNumbers = str => parseInt(str.replace(/^\D+/g, ""));
const extractCharacters = str => String(str.replace(/\d+/g, ""));
const isCellWithValue = cell => Boolean(cell && cell.v);

export default () => {
  const generateTable = ({ data }) => {
    const colMap = {
      A: "date",
      D: "operationNumber",
      F: "description",
      H: "amount",
    };
    let table = generateData({ data, colMap });
    return { table };
  };

  const generateData = ({ data, colMap }) => {
    let table = [];
    let rows = findTableRows({ data });
    let rowPointer = rows.first;
    while (rowPointer <= rows.last) {
      let transaction = {};
      for (const col in colMap) {
        const cell = data[col + rowPointer];
        if (cell && cell.v) transaction[colMap[col]] = cell.v;
      }
      table.push(transaction);
      rowPointer = rowPointer + 1;
    }
    return table;
  };

  /*
  return object { first: number, last: number }
  */
  const findTableRows = ({ data }) => {
    return {
      first: findFirstTableRow({ data }),
      last: findLastTableRow({ data }),
    };
  };

  const findFirstTableRow = ({ data }) => {
    const columnRange = findColumnRange(data["!ref"]);
    const extracted = extractCells({ data, columnRange });
    const firstRow = Object.fromEntries(
      Object.entries(extracted).filter(elm => {
        return elm[0].charAt(0) === columnRange.first;
      })
    );
    const TABLE_TITLE = "Movimientos";
    const cellOfTableTitle = Object.entries(firstRow).filter(elm => {
      return elm[1].v === TABLE_TITLE;
    })[0][0];

    //TODO: aqui estamos encontrando el numero de la fila donde esta la cabecera de la tabla
    // por ahora le sumamos 2 asumiendo que la primera fila de la tabla está dos posiciones más abajo (ya que bajo el titulo están las cabeceras de la tabla)
    const firstTableRow = extractNumbers(cellOfTableTitle) + 2;
    return firstTableRow;
  };

  const findLastTableRow = ({ data }) => {
    const firstRow = findFirstTableRow({ data });
    let lastRow = firstRow;
    let rowPointer = firstRow;
    do {
      if (isCellWithValue(data[`A${rowPointer}`])) lastRow = rowPointer;
      rowPointer = rowPointer + 1;
    } while (rowPointer <= lastRow + 1);
    return lastRow;
  };

  /*
  return object { first: number, last: number }
  */
  const findAbsoluteRow = rangeInExcelFormat => {
    return {
      first: extractNumbers(rangeInExcelFormat.split(":")[0]),
      last: extractNumbers(rangeInExcelFormat.split(":")[1]),
    };
  };

  /*
  Obtain data to find column range of all sheet (the first column letter and last column letter)
  return object { first: string, last: string }
  */

  const findColumnRange = rangeInExcelFormat => {
    return {
      first: extractCharacters(
        rangeInExcelFormat.split(":")[0].replace(/\d+/g, "")
      ),
      last: extractCharacters(
        rangeInExcelFormat.split(":")[1].replace(/\d+/g, "")
      ),
    };
  };

  const generateAlphabet = (firstLetter, lastLetter, { uppercased }) => {
    const charCode = uppercased ? 65 : 97;
    let alphabet = [...Array(26)].map((_, i) =>
      String.fromCharCode(i + charCode)
    );
    let firstLetterIndex = alphabet.indexOf(firstLetter);
    let lastLetterIndex = alphabet.indexOf(lastLetter);
    return alphabet.slice(firstLetterIndex, lastLetterIndex + 1);
  };

  /*
  params { columnRange: { first: number, last: number } }
  return object { a1: {}, a2: {}, a3: {} }
  */
  const extractCells = ({ data, columnRange }) => {
    const alphabet = generateAlphabet(columnRange.first, columnRange.last, {
      uppercased: true,
    });

    const dataInArray = Object.entries(data);
    const filteredData = dataInArray.filter(elm =>
      alphabet.includes(elm[0].charAt(0))
    );
    const cells = Object.fromEntries(filteredData);

    return cells;
  };

  return { generateTable };
};
