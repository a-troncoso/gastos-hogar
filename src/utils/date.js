export const formatDate = _date => {
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
