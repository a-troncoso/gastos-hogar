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
  "diciembre"
]

const formattedMonthName = (monthNumber, format) => {
  let exit = []
  switch (format) {
    case "short":
      exit = monthNamesList[monthNumber].substring(0, 3)
      break
    default:
      exit = monthNamesList[monthNumber]
      break
  }
  return exit
}

const formattedMonthNames = format => {
  let exit = []
  switch (format) {
    case "short":
      exit = monthNamesList.map((m, i) => formattedMonthName(i, "short"))
      break
    default:
      exit = monthNamesList
      break
  }
  return exit
}

export const monthNames = () => format => {
  let exit = null
  if (format) exit = formattedMonthNames(format)
  // TODO: In this case, doesn't found
  else exit = monthNamesList

  return exit
}

export const daysInMonth = () => {
  let exit = []
  let initialDay = 1
  while (initialDay <= 31) {
    exit.push(initialDay)
    initialDay = initialDay + 1
  }

  return exit
}

export const availableYears = () => {
  let exit = []
  let initialYear = 2015
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  while (initialYear <= currentYear) {
    exit.push(initialYear)
    initialYear = initialYear + 1
  }

  return exit
}

export const formatDate = (_date, ...rest) => {
  const date = new Date(_date)
  const restParams = rest[0]
  let day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  let formattedMonth =
    restParams && restParams.withMonthName
      ? formattedMonthName(month, "short")
      : month + 1

  if (day < 10) day = "0" + day
  if (typeof formattedMonth == "number" && formattedMonth < 10)
    formattedMonth = "0" + formattedMonth

  return `${day}-${formattedMonth}-${year}`
}

export const currentDate = () => new Date()

export const currentMonth = (inTwoDigits = false) => {
  const currentDate = new Date()

  return inTwoDigits
    ? `0${currentDate.getMonth() + 1}`.slice(-2)
    : currentDate.getMonth()
}

export const formattedMonthNumber = (monthNumber, { inTwoDigits = false }) => {
  return inTwoDigits ? `0${monthNumber}`.slice(-2) : monthNumber
}

export const monthName = monthNumber => {
  const monthNames = monthNamesList

  return monthNames[monthNumber]
}
