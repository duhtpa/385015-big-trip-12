export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const sortByAscending = (arr) => {
  const namesComparator = (left, right) => {
    if (left < right) {
      return 1;
    } else if (left > right) {
      return -1;
    } return 0;
  };

  const resultArray = arr.slice().sort(function (left, right) {
    const rankDiff = left.date.begin - right.date.begin;
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.date.begin, right.date.begin);
    }

    return rankDiff;
  });

  return resultArray;
};

export const getDates = (eventsArr) => {
  let dates = new Set();

  eventsArr.slice(1).forEach((event) => {
    dates.add(event.date.begin.toLocaleString(`en-GB`, {month: `numeric`, day: `numeric`}));
  });

  dates = Array.from(dates);

  return dates;
};

export const getEventTime = (time) => {
  const hours = Math.floor(time / 60);
  const days = Math.floor(hours / 24);
  const minutes = time - (hours * 60);

  const dateString = `${days > 0 ? `${days}D` : ``} ${hours > 0 ? `${hours}H` : ``} ${minutes}M`;

  return dateString;
};
