const _regExp = new RegExp(/(\d)(?=(\d{3})+(?!\d))/, "g");

const _formatInt = amount =>
  parseFloat(amount.toString().replace(",", "."))
    .toFixed()
    .replace(".", ",")
    .replace(_regExp, "$1.");

const _formatFloat = amount =>
  String(amount)
    .replace(".", ",")
    .replace(_regExp, "$1.");

const _cleanFormat = (amount, decimal = false) =>
  decimal ? _formatFloat(amount) : _formatInt(amount);

export const toCurrencyFormat = (amount, decimal) =>
  `$ ${_cleanFormat(amount, decimal)}`;

