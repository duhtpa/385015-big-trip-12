import MenuTripInfoView from "./view/tripInfo.js";
import MenuTabsView from "./view/tabs.js";
import MenuFiltersView from "./view/filters.js";

import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/board.js";
import {sortingByAscending} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";

const EVENT_COUNT = 20;

const arrEvents = new Array(EVENT_COUNT).fill().map(generateEvent);

const events = sortingByAscending(arrEvents);

const headerSection = document.querySelector(`.page-header`);
const headerMenu = headerSection.querySelector(`.trip-main`);
const headerMenuControls = headerMenu.querySelectorAll(`.trip-controls > h2`);

const tripPresenter = new TripPresenter();

render(headerMenu, new MenuTripInfoView().getElement(), RenderPosition.AFTERBEGIN);

render(headerMenuControls[0], new MenuTabsView().getElement(), RenderPosition.AFTEREND);
render(headerMenuControls[1], new MenuFiltersView().getElement(), RenderPosition.AFTEREND);

tripPresenter.init(events);
