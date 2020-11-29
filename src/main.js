import {createTripInfoTemplate} from "./view/trip-info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventsListTemplate} from "./view/list-events.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {createEventsItemTemplate} from "./view/events-item.js";
import {createFormNewPointTemplate} from "./view/form-new-point.js";
import {generateTrip} from "./mock/trip";

generateTrip();

const COUNT_ITEM_EVENT = 3;

const bodyElement = document.querySelector(`.page-body`);
const headerMainElement = bodyElement.querySelector(`.trip-main`);
const ControlsElement = headerMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = bodyElement.querySelector(`.trip-events`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerMainElement, createTripInfoTemplate(), `afterbegin`);
render(ControlsElement, createMenuTemplate(), `beforeend`);
render(ControlsElement, createFiltersTemplate(), `beforeend`);
render(siteTripEventsElement, createSortTemplate(), `beforeend`);
render(siteTripEventsElement, createEventsListTemplate(), `beforeend`);

const siteListEventsElement = siteTripEventsElement.querySelector(`.trip-events__list`);

render(siteListEventsElement, createFormEditTemplate(), `beforeend`);

for (let i = 0; i < COUNT_ITEM_EVENT; i++) {
  render(siteListEventsElement, createEventsItemTemplate(), `beforeend`);
}

render(siteListEventsElement, createFormNewPointTemplate(), `beforeend`);
