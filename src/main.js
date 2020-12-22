import {createTripInfoTemplate} from "./view/trip-info.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createSortTemplate} from "./view/sort.js";
import {createEventsListTemplate} from "./view/list-events.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {createEventsItemTemplate} from "./view/events-item.js";
import {generateTripPoints, TypeEvents, CITIES, generateVoidPoint} from "./mock/trip";
import {render} from "./helpers/utils";

const EVENT_POINTS = generateTripPoints(10);
const EVENT_EDIT = generateTripPoints(1);
const EVENT_CREATE = generateVoidPoint(1);

const bodyElement = document.querySelector(`.page-body`);
const headerMainElement = bodyElement.querySelector(`.trip-main`);
const ControlsElement = headerMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = bodyElement.querySelector(`.trip-events`);

render(headerMainElement, createTripInfoTemplate(), `afterbegin`);
render(ControlsElement, createMenuTemplate(), `beforeend`);
render(ControlsElement, createFiltersTemplate(), `beforeend`);
render(siteTripEventsElement, createSortTemplate(), `beforeend`);
render(siteTripEventsElement, createEventsListTemplate(), `beforeend`);

const siteListEventsElement = siteTripEventsElement.querySelector(`.trip-events__list`);

render(siteListEventsElement, createFormEditTemplate(...EVENT_EDIT, TypeEvents, CITIES, `edit`), `beforeend`);

EVENT_POINTS.forEach((point) => {
  render(siteListEventsElement, createEventsItemTemplate(point), `beforeend`);
});

render(siteListEventsElement, createFormEditTemplate(EVENT_CREATE, TypeEvents, CITIES, `create`), `beforeend`);

// todo: надо считать duration где-то тут
