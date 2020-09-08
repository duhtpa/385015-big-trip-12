import TripMainView from "./view/board.js";
import SiteMenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortMenu from "./view/sort.js";
import TripList from "./view/tripList.js";
import NoEventView from "./view/no-event.js";
import TripDayView from "./view/tripDay.js";
import TripEventView from "./view/tripEvent.js";
import TripEventEditView from "./view/tripEventEdit.js";

import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils.js";

const EVENT_COUNT = 20;

const arrEvents = new Array(EVENT_COUNT).fill().map(generateEvent);

const sortArrayEvents = (arr) => {
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

const events = sortArrayEvents(arrEvents);

const siteHeaderSection = document.querySelector(`.page-header`);
const tripMainBlock = siteHeaderSection.querySelector(`.trip-main`);
const tripControlHeaders = tripMainBlock.querySelectorAll(`.trip-controls > h2`);

const siteMainSection = document.querySelector(`.page-main`);
const tripEventsBlock = siteMainSection.querySelector(`.trip-events`);

const renderEvent = (tripListElement, tripEvent) => {
  const tripEventComponent = new TripEventView(tripEvent);
  const tripEventEditComponent = new TripEventEditView(tripEvent);

  const replaceEventToForm = () => {
    tripListElement.replaceChild(tripEventEditComponent.getElement(), tripEventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    tripListElement.replaceChild(tripEventComponent.getElement(), tripEventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  // let a = tripEventEditComponent.getElement();
  // let b = a.querySelector(`.event__header`);
  // console.log(b);
  tripEventEditComponent.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripListElement, tripEventComponent.getElement(), RenderPosition.BEFOREEND);
};

render(tripMainBlock, new TripMainView().getElement(), RenderPosition.AFTERBEGIN);

render(tripControlHeaders[0], new SiteMenuView().getElement(), RenderPosition.AFTEREND);
render(tripControlHeaders[1], new FilterView().getElement(), RenderPosition.AFTEREND);

if (arrEvents.length === 0) {
  render(tripEventsBlock, new NoEventView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsBlock, new SortMenu().getElement(), RenderPosition.BEFOREEND);
}

render(tripEventsBlock, new TripList().getElement(), RenderPosition.BEFOREEND);

const tripList = tripEventsBlock.querySelector(`.trip-days`);

const getDayArray = (eventsArr) => {
  let dates = new Set();

  const getSetDate = () => {
    eventsArr.slice(1).forEach((event) => {
      dates.add(event.date.begin.toLocaleString(`en-GB`, {month: `numeric`, day: `numeric`}));
    });

    dates = Array.from(dates);

    return dates;
  };

  dates = getSetDate(eventsArr);

  dates.forEach((date, index) => {
    render(tripList, new TripDayView(date, index).getElement(), RenderPosition.BEFOREEND);
    let tripDay = tripEventsBlock.querySelectorAll(`.trip-days__item > ul`);

    for (let i = 0; i < eventsArr.length; i++) {
      const eventDate = eventsArr[i].date.begin.toLocaleString(`en-GB`, {month: `numeric`, day: `numeric`});

      if (date === eventDate) {
        renderEvent(tripDay[dates.indexOf(date)], eventsArr[i]);
      }
    }
  });
};

getDayArray(events);
