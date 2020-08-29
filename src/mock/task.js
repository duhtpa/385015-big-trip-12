const MAX_PHOTOS_IN_POINT = 5;
const MAX_DAYS_GAP = 1;

const DescriptionStrings = {
  MAX: 5,
  MIN: 1,
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePointType = () => {
  const pointTypes = [
    `Taxi to `,
    `Bus to `,
    `Train to `,
    `Ship to `,
    `Transport to `,
    `Drive to `,
    `Flight to `,
    `Check-in in `,
    `Sightseeing in `,
    `Restaurant in`,
  ];

  const randomIndex = getRandomInteger(0, pointTypes.length - 1);

  return pointTypes[randomIndex];
};

const generateCity = () => {
  const cities = [
    `Amsterdam`,
    `Chamonix`,
    `Geneva`,
    `Saint Petersburg`,
    `Irkutsk`,
    `London`,
    `Moscow`,
    `Orel`,
    `Berlin`
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generateOffers = () => {
  const options = [
    {
      type: `luggage`,
      name: `Add luggage`,
      price: 30,
    },
    {
      type: `meal`,
      name: `Add meal`,
      price: 100,
    },
    {
      type: `seats`,
      name: `Choose seats`,
      price: 15,
    },
    {
      type: `uber`,
      name: `Order Uber`,
      price: 20,
    },
    {
      type: `comfort`,
      name: `Switch to comfort`,
      price: 5,
    },
    {
      type: `train`,
      name: `Travel by train`,
      price: 40,
    },
  ];

  const randomIndex = getRandomInteger(0, options.length - 1);

  const offers = options.slice(randomIndex);

  return offers;
};

const generateDescription = () => {
  const strings = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ];

  const randomIndex = getRandomInteger(0, strings.length - 1);

  return strings[randomIndex];
};

const stringLength = getRandomInteger(DescriptionStrings.MIN, DescriptionStrings.MAX);
const description = new Array(stringLength).fill().map(generateDescription);

const generatePhoto = () => {
  const pictureRandom = `http://picsum.photos/248/152?r=${Math.random()}`;

  return pictureRandom;
};

const photos = new Array(getRandomInteger(1, MAX_PHOTOS_IN_POINT - 1)).fill().map(generatePhoto);

const generateTime = (date) => {
  const timeRandom = date.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59), getRandomInteger(0, 59), 999);

  return timeRandom;
};

const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDate = new Date();

  generateTime(currentDate);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

export const generateEvent = () => {
  const dateBegin = generateDate();
  const dateGap = getRandomInteger(1, MAX_DAYS_GAP);
  const dateEnd = new Date(dateBegin);
  dateEnd.setDate(dateBegin.getDate() + dateGap);
  generateTime(dateEnd);

  const pointTime = Math.floor((dateEnd - dateBegin) / 1000 / 60);

  return {
    pointType: generatePointType(),
    city: generateCity(),
    date: {
      begin: dateBegin,
      end: dateEnd,
    },
    pointTime,
    offers: generateOffers(),
    destination: {
      description,
      photos,
    }
  };
};
