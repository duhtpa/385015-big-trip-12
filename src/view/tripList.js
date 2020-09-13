import AbstractView from "./abstract.js";

const createTripList = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripList extends AbstractView {
  getTemplate() {
    return createTripList();
  }
}
