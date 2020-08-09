import {createTripMainTemplate} from "./view/board.js";
import {createSiteMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortMenuTemlate} from "./view/sort.js";
import {createListTrip} from "./view/tripList.js";
import {createTripDay} from "./view/tripDay.js";
import {createEventTemplate} from "./view/tripEvent.js";
import {createEditEventTemplate} from "./view/tripEventEdit.js";

const EVENT_COUNT = 3;

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
render(tripList, createTripDay(), `beforeend`);

const tripDay = tripEventsBlock.querySelector(`.trip-days__item > ul`);

render(tripDay, createEditEventTemplate(), `beforeend`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripDay, createEventTemplate(), `beforeend`);
}
