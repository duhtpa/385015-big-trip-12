export const BLANK_EVENT = {
  pointType: `Taxi to `,
  city: `Amsterdam`,
  date: new Date(),
  offers: {
    type: `uber`,
    name: `Order Uber`,
    price: 20,
  },
};

export const SortType = {
  DEFAULT: `event`,
  PRICE: `price`,
  TIME: `time`,
};
