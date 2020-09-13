import MenuSortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import TripListView from "../view/tripList.js";
import TripDayView from "../view/tripDay.js";
import TripEventView from "../view/tripEvent.js";
import TripEventEditView from "../view/tripEventEdit.js";

import {getDates, sortByPrice, sortByTime} from "../utils/common.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor() {
    this._boardEvents = document.querySelector(`.page-main .trip-events`);
    this._currentSortType = SortType.DEFAULT;

    this._menuSortComponent = new MenuSortView();
    this._noEventComponent = new NoEventView();
    this._tripListComponent = new TripListView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(eventsArr) {
    this._eventsArr = eventsArr.slice();
    this._sortedEventsArr = eventsArr.slice();

    this._renderBoard(eventsArr);
    this._renderDays(eventsArr);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._eventsArr.sort(sortByPrice);
        break;
      case SortType.TIME:
        this._eventsArr.sort(sortByTime);
        break;
      default:
        this._eventsArr = this._sortedEventsArr.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    if (sortType === `price` || sortType === `time`) {
      this._eventsArr.forEach((tripEvent) => {
        this._renderEvent(this._tripListComponent, tripEvent);
        document.querySelector(`.trip-sort__item--day`).classList.add(`day-tag--hidden`);
      });
    } else {
      this._renderDays(this._eventsArr);
      document.querySelector(`.trip-sort__item--day`).classList.remove(`day-tag--hidden`);
    }
  }

  _clearEventList() {
    this._tripListComponent.getElement().innerHTML = ``;
  }

  _renderSort() {
    render(this._boardEvents, this._menuSortComponent, RenderPosition.BEFOREEND);
    this._menuSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(tripListElement, tripEvent) {
    const tripEventComponent = new TripEventView(tripEvent);
    const tripEventEditComponent = new TripEventEditView(tripEvent);

    const replaceEventToForm = () => {
      replace(tripEventEditComponent, tripEventComponent);
    };

    const replaceFormToEvent = () => {
      replace(tripEventComponent, tripEventEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    tripEventComponent.setEditClickHandler(() => {
      replaceEventToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripEventEditComponent.setFormSubmitHandler(() => {
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(tripListElement, tripEventComponent, RenderPosition.BEFOREEND);
  }

  _renderDays(eventsArr) {
    const tripList = this._boardEvents.querySelector(`.trip-days`);
    const dates = getDates(eventsArr);

    dates.forEach((date, index) => {
      const tripDayComponent = new TripDayView(date, index);

      render(tripList, tripDayComponent, RenderPosition.BEFOREEND);
      const dayEvents = this._boardEvents.querySelectorAll(`.trip-days__item > ul`);

      eventsArr.forEach((tripEvent) => {
        const eventDate = tripEvent.date.begin.toLocaleString(`en-GB`, {month: `numeric`, day: `numeric`});

        if (date === eventDate) {
          this._renderEvent(dayEvents[dates.indexOf(date)], tripEvent);
        }
      });
    });
  }

  _renderNoEvents() {
    render(this._boardEvents, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderBoard(eventsArr) {
    if (eventsArr.length === 0) {
      this._renderNoEvents();
    } else {
      this._renderSort();
    }

    render(this._boardEvents, this._tripListComponent, RenderPosition.BEFOREEND);
  }
}
