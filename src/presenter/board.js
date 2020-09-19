import MenuSortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import TripListView from "../view/tripList.js";
import TripDayView from "../view/tripDay.js";

import {getDates, sortByPrice, sortByTime} from "../utils/common.js";
import TripEventPresenter from "./tripEvent.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition} from "../utils/render.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor() {
    this._boardEvents = document.querySelector(`.page-main .trip-events`);
    this._currentSortType = SortType.DEFAULT;
    this._tripEventPresenter = {};

    this._menuSortComponent = new MenuSortView();
    this._noEventComponent = new NoEventView();
    this._tripListComponent = new TripListView();

    this._handleTripEventChange = this._handleTripEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(eventsArr) {
    this._eventsArr = eventsArr.slice();
    this._sortedEventsArr = eventsArr.slice();

    this._renderBoard(eventsArr);
    this._renderDays(eventsArr);
  }

  _handleModeChange() {
    Object
      .values(this._tripEventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleTripEventChange(updatedTripEvent) {
    this._boardTripEvent = updateItem(this._eventsArr, updatedTripEvent);
    this._sourcedBoardTripEvent = updateItem(this._sortedEventsArr, updatedTripEvent);
    this._tripEventPresenter[updatedTripEvent.id].init(updatedTripEvent);
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

    this._clearEventList();
    this._sortEvents(sortType);

    if (sortType === `price` || sortType === `time`) {
      this._eventsArr.forEach((tripEvent) => {
        this._renderEvent(this._tripListComponent, tripEvent);
        document.querySelector(`.trip-days`).style = `margin-left: 80px`;
        document.querySelector(`.trip-sort__item--day`).style = `visibility: hidden`;

        Array.from(document.querySelectorAll(`.day__info`))
          .forEach((dayInfo) => {
            dayInfo.remove();
          });

      });
    } else {
      this._tripListComponent.getElement().innerHTML = ``;

      this._renderDays(this._eventsArr);
      document.querySelector(`.trip-days`).style = `margin-left: 0`;
      document.querySelector(`.trip-sort__item--day`).style = `visibility: visible`;
    }
  }

  _clearEventList() {
    Object
      .values(this._tripEventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripEventPresenter = {};
  }

  _renderSort() {
    render(this._boardEvents, this._menuSortComponent, RenderPosition.BEFOREEND);
    this._menuSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(tripListElement, tripEvent) {
    const tripEventPresenter = new TripEventPresenter(tripListElement, this._handleTripEventChange, this._handleModeChange);
    tripEventPresenter.init(tripEvent);
    this._tripEventPresenter[tripEvent.id] = tripEventPresenter;
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
