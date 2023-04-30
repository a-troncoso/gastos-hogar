const _regExp = new RegExp(/(\d)(?=(\d{3})+(?!\d))/, "g");

// TODO: Canditate to deprecate
// export const _formatInt = amount =>
//   parseFloat(amount.toString().replace(",", "."))
//     .toFixed()
//     .replace(".", ",")
//     .replace(_regExp, "$1.")

const _formatFloat = amount =>
  String(amount).replace(".", ",").replace(_regExp, "$1.");

const _cleanFormat = (amount, decimal = false) =>
  decimal ? _formatFloat(amount) : thousandFormat(amount);

export const toCurrencyFormat = (amount, decimal) =>
  `$ ${_cleanFormat(amount, decimal)}`;

export const extractNumbers = value => {
  const isNegative = value.toString().includes("-");
  const multiplyBy = isNegative ? -1 : 1;
  const onlyNumbers = value.toString().match(/\d+/g).join("");
  return value ? parseInt(onlyNumbers) * multiplyBy : 0;
};

export const thousandFormat = (
  number,
  decimals,
  dec_point = ",",
  thousands_sep = "."
) => {
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    // sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    // dec = typeof dec_point === "undefined" ? "." : dec_point,
    toFixedFix = function (n, prec) {
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      let k = Math.pow(10, prec);
      return Math.round(n * k) / k;
    },
    s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split(".");

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousands_sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec_point);
};
