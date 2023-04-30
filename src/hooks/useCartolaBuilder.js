import { extractNumbers } from "../utils/number";
import { formatDate } from "../utils/date";

const extractCharacters = str => String(str.replace(/\d+/g, ""));
const isCellWithValue = cell => Boolean(cell && cell.v);

const TEXT_TITLE_TABLE_MOVEMENTS = "Movimientos";
const TEXT_TITLE_TABLE_DETAIL_MOVEMENTS = "Detalle de Movimientos";

const colNormalizer = {
  date: date => {
    let _date = date;

    const dateHasYear = _date.split("/").length === 3;
    if (!dateHasYear) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      _date = `${date}/${currentYear}`;
    }
    return formatDate(_date, {
      separator: "/",
      isInISOFormat: false,
      toISOFormat: true,
    });
  },
  amount: extractNumbers,
};

export default () => {
  const generateTable = ({ data, movementType = "expenses" }) => {
    let table = generateData({ data, movementType });
    return { table };
  };

  const generateData = ({ data, movementType }) => {
    let table = [];
    let rows = findTableRows({ data });
    let rowPointer = rows.first;
    const colMap = findColMap({ data, movementType });

    while (rowPointer <= rows.last) {
      let transaction = {};

      for (const col in colMap) {
        const cell = data[col + rowPointer];
        if (Object.keys(cell).length > 0) {
          const colHasNormalizer = Boolean(colNormalizer[colMap[col]]);

          const cellWord = cell.w ?? "";

          if (colHasNormalizer) {
            transaction[colMap[col]] = colNormalizer[colMap[col]](cellWord);
          } else transaction[colMap[col]] = cellWord;
        }
      }

      rowPointer = rowPointer + 1;

      const conditionsByMovementTypeByTableTitle = {
        expenses: {
          [TEXT_TITLE_TABLE_MOVEMENTS]: transaction.amount > 0,
          [TEXT_TITLE_TABLE_DETAIL_MOVEMENTS]: transaction.amount < 0,
        },
        income: {
          [TEXT_TITLE_TABLE_MOVEMENTS]: transaction.amount > 0,
          [TEXT_TITLE_TABLE_DETAIL_MOVEMENTS]: transaction.amount > 0,
        },
      };
      const tableTitle = getTableTitle({ data });
      const isTransactionValid =
        conditionsByMovementTypeByTableTitle[movementType][tableTitle];

      if (transaction.amount < 0) transaction.amount = transaction.amount * -1;
      if (isTransactionValid) table.push(transaction);
    }
    return table;
  };

  const findColMap = ({ data, movementType }) => {
    const tableTitle = getTableTitle({ data });

    // Para expenses - tabla titulada Movimientos
    const expensesMovementsTitle = {
      A: "date",
      B: "operationNumber",
      C: "description",
      D: "amount",
    };

    // Para tabla titulada Detalle de Movimientos
    const detailMovTitle = {
      A: "date",
      B: "description",
      C: "operationNumber",
      D: "amount",
    };

    // Para income - tabla titulada Movimientos
    const incomesMovementsTitle = {
      A: "date",
      B: "operationNumber",
      C: "description",
      E: "amount",
    };

    const colMapByMovementTypeByTableTitle = {
      expenses: {
        [TEXT_TITLE_TABLE_MOVEMENTS]: expensesMovementsTitle,
        [TEXT_TITLE_TABLE_DETAIL_MOVEMENTS]: detailMovTitle,
      },
      income: {
        [TEXT_TITLE_TABLE_MOVEMENTS]: incomesMovementsTitle,
        [TEXT_TITLE_TABLE_DETAIL_MOVEMENTS]: detailMovTitle,
      },
    };
    return colMapByMovementTypeByTableTitle[movementType][tableTitle];
  };

  /*
  return string "A12"
  */
  const findCellOfTableTitle = ({ data }) => {
    // data = { objInutiles: {...}, A1: {v: "Primera celda"}, C2: {v: "Movimientos"} }
    const columnRange = findColumnRange(data["!ref"]);
    // cells = { A1: {v: "Primera celda"}, C2: {v: "Movimientos"} }
    const cells = extractCells({ data, columnRange });
    // [[A1, {v: "Movimientos"}]]]
    const arrayOfCells = Object.entries(cells);
    // c = [A1, {v: "Movimientos"}]
    const arrayFirstRow = arrayOfCells.filter(
      elm => elm[0].charAt(0) === columnRange.first
    );
    // {A1: {v: "Primera celda"}, C2: {v: "Movimientos"}}
    const firstRow = Object.fromEntries(arrayFirstRow);

    // Depende de la hoja de excel, puede ser que la tabla de detalle
    // de movimientos esté debajo de la tabla de movimientos
    // Tipo de hoja -> Cabecera de tabla
    // Movimientos  -> Movimientos
    // Cartola      -> Detalle de Movimientos
    let cellOfTableTitle =
      findCellTitle(firstRow, TEXT_TITLE_TABLE_DETAIL_MOVEMENTS) ??
      findCellTitle(firstRow, TEXT_TITLE_TABLE_MOVEMENTS);

    return cellOfTableTitle;
  };

  const getTableTitle = ({ data }) => {
    const cellOfTableTitle = findCellOfTableTitle({ data });
    return data[cellOfTableTitle].v;
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
    const cellOfTableTitle = findCellOfTableTitle({ data });

    if (!cellOfTableTitle)
      throw new Error("No se encontró la cabecera de la tabla de movimientos");

    //TODO: aqui estamos encontrando el numero de la fila donde esta la cabecera de la tabla
    // por ahora le sumamos 2 asumiendo que la primera fila de la tabla está dos posiciones más abajo
    // (ya que bajo el titulo están las cabeceras de la tabla)
    const firstTableRow = extractNumbers(cellOfTableTitle) + 2;
    return firstTableRow;
  };

  const findCellTitle = (row, title) => {
    return Object.entries(row).filter(elm => elm[1].v === title)[0]?.[0];
  };

  const findLastTableRow = ({ data, sheetName }) => {
    const firstRow = findFirstTableRow({ data, sheetName });
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
