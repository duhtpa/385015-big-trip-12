import AbstractView from "./abstract.js";

const createTripDayTemplate = (date, indexDay) => {
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

export default class TripDay extends AbstractView {
  constructor(date, indexDay) {
    super();
    this._date = date;
    this._indexDay = indexDay;
  }

  getTemplate() {
    return createTripDayTemplate(this._date, this._indexDay);
  }
}
