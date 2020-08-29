import {createTripMainTemplate} from "./view/board.js";
import {createSiteMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortMenuTemlate} from "./view/sort.js";
import {createListTrip} from "./view/tripList.js";
import {createTripDay} from "./view/tripDay.js";
import {createEventTemplate} from "./view/tripEvent.js";
import {createEditEventTemplate} from "./view/tripEventEdit.js";
import {generateEvent} from "./mock/task.js";

const EVENT_COUNT = 20;

const arrEvents = new Array(EVENT_COUNT).fill().map(generateEvent);

const sortArrayEvents = (arr) => {
  const namesComparator = (left, right) => {
    if (left < right) {
      return 1;
    } else if (left > right) {
      return -1;
    } else {
      return 0;
    }
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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderSection = document.querySelector(`.page-header`);
const tripMainBlock = siteHeaderSection.querySelector(`.trip-main`);
const tripControlHeaders = tripMainBlock.querySelectorAll(`.trip-controls > h2`);

const siteMainSection = document.querySelector(`.page-main`);
const tripEventsBlock = siteMainSection.querySelector(`.trip-events`);

render(tripMainBlock, createTripMainTemplate(), `afterbegin`);

render(tripControlHeaders[0], createSiteMenuTemplate(), `afterend`);
render(tripControlHeaders[1], createFilterTemplate(), `afterend`);

render(tripEventsBlock, createSortMenuTemlate(), `beforeend`);

render(tripEventsBlock, createListTrip(), `beforeend`);

const tripList = tripEventsBlock.querySelector(`.trip-days`);

render(tripList, createEditEventTemplate(events[0]), `beforebegin`);

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
    render(tripList, createTripDay(date, index), `beforeend`);
    let tripDay = tripEventsBlock.querySelectorAll(`.trip-days__item > ul`);

    for (let i = 1; i < eventsArr.length; i++) {
      const eventDate = eventsArr[i].date.begin.toLocaleString(`en-GB`, {month: `numeric`, day: `numeric`});

      if (date === eventDate) {
        render(tripDay[dates.indexOf(date)], createEventTemplate(eventsArr[i]), `beforeend`);
      }
    }
  });
};

getDayArray(events);
