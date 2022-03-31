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

export function dateToEpoch(date) {
  const toConvert = new Date(date);
  return Math.floor(toConvert.valueOf() / 1000);
}
