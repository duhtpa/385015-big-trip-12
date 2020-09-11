import MenuSortView from "../view/sort.js";
import NoEventView from "../view/no-event.js";
import TripListView from "../view/tripList.js";
import TripDayView from "../view/tripDay.js";
import TripEventView from "../view/tripEvent.js";
import TripEventEditView from "../view/tripEventEdit.js";

import {getDates} from "../utils/common.js";
import {render, RenderPosition, replace} from "../utils/render.js";

export default class Board {
  constructor() {
    this._boardEvents = document.querySelector(`.page-main .trip-events`);

    this._menuSortComponent = new MenuSortView();
    this._noEventComponent = new NoEventView();
    this._tripListComponent = new TripListView();
  }

  init(eventsArr) {
    this._eventsArr = eventsArr.slice();

    this._renderBoard(eventsArr);

    render(this._boardEvents, this._tripListComponent, RenderPosition.BEFOREEND);

    this._renderDays(eventsArr);
  }

  _renderSort() {
    render(this._boardEvents, this._menuSortComponent, RenderPosition.BEFOREEND);
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

      for (let i = 0; i < eventsArr.length; i++) {
        const eventDate = eventsArr[i].date.begin.toLocaleString(`en-GB`, {month: `numeric`, day: `numeric`});

        if (date === eventDate) {
          this._renderEvent(dayEvents[dates.indexOf(date)], eventsArr[i]);
        }
      }
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
  }
}
