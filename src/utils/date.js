const monthNamesList = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const formattedMonthName = (format) => {
  let exit = [];
  switch (format) {
    case "short":
      exit = monthNamesList.map((m) => m.substring(0, 3));
      break;
    default:
      exit = monthNamesList;
      break;
  }
  return exit;
};

export const monthNames = () => (format) => {
  let exit = null;
  if (format) exit = formattedMonthName(format);
  // TODO: In this case, doesn't found
  else exit = monthNamesList;

  return exit;
};

export const daysInMonth = () => {
  let exit = [];
  let initialDay = 1;
  while (initialDay <= 31) {
    exit.push(initialDay);
    initialDay = initialDay + 1;
  }

  return exit;
};

export const availableYears = () => {
  let exit = [];
  let initialYear = 2015;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  while (initialYear <= currentYear) {
    exit.push(initialYear);
    initialYear = initialYear + 1;
  }

  return exit;
};

export const formatDate = (_date) => {
  const date = new Date(_date);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) dt = "0" + dt;

  if (month < 10) month = "0" + month;

  return `${dt}-${month}-${year}`;
};

export const currentDate = () => new Date();

export const currentMonth = (inTwoDigits = false) => {
  const currentDate = new Date();

  return inTwoDigits
    ? `0${currentDate.getMonth() + 1}`.slice(-2)
    : currentDate.getMonth();
};

export const formattedMonth = (monthNumber, inTwoDigits = false) => {
  return inTwoDigits ? `0${monthNumber + 1}`.slice(-2) : monthNumber;
};

export const monthName = (monthNumber) => {
  const monthNames = monthNamesList;

  return monthNames[monthNumber];
};
