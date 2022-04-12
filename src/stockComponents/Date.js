// timeFrames for graph data
export const timeFrames = [
  { symbol: 'D', val: 'Daily' },
  { symbol: 'W', val: 'Weekly' },
  { symbol: 'M', val: 'Monthly' },
];

// last year date
export function lastYearEpoch() {
  const date = Date.now();
  function calcDate(date) {
    let setDate = new Date(date);
    let lastYear = new Date(
      setDate.getFullYear() - 1,
      setDate.getMonth(),
      setDate.getDate()
    );
    return Math.floor(lastYear.valueOf() / 1000);
  }
  return calcDate(date);
}
// current year date
export function thisYearEpoch() {
  const date = Date.now();
  return Math.floor(date.valueOf() / 1000);
}

//convert from epoch to string;
export function convertEpochToDate(epoch) {
  const date = new Date(epoch * 1000);
  const processDate = date.toLocaleString().split(',');
  const temp = [];
  for (let i = processDate[0].split('/').length - 1; i >= 0; i--) {
    temp.push(processDate[0].split('/')[i]);
  }
  return temp;
}
//  convert date to epoch
export function dateToEpoch(date) {
  const toConvert = new Date(date);
  return Math.floor(toConvert.valueOf() / 1000);
}

// verify if end date > then current date
export function isDateInFuture(date) {
  const selDate = new Date(date);
  const dateNow = new Date();
  let areEqual = false;

  if (selDate.getFullYear() === dateNow.getFullYear()) {
    if (selDate.getMonth() === dateNow.getMonth()) {
      if (selDate.getDate() > dateNow.getDate()) {
        areEqual = true;
      }
    }
  }
  return areEqual;
}

// verify if selection is current date
export function isDateEqual(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let areEqual = false;

  if (startDate.getFullYear() === endDate.getFullYear()) {
    if (startDate.getMonth() === endDate.getMonth()) {
      if (startDate.getDate() === endDate.getDate()) {
        areEqual = true;
      }
    }
  }
  return areEqual;
}

export function convertEpochToLocale(epoch) {
  const date = new Date(epoch * 1000);
  return `Date: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
