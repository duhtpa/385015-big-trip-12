import {createElement} from "../utils.js";

const createTripDay = (date, indexDay) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${indexDay + 1}</span>
        <time class="day__date" datetime="${date}">${date}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class TripDay {
  constructor(date, indexDay) {
    this._date = date;
    this._indexDay = indexDay;
    this._element = null;
  }

  getTemplate() {
    return createTripDay(this._date, this._indexDay);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
