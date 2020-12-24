import TripInfo from "./view/trip-info.js";
import SiteMenu from "./view/menu.js";
import Filters from "./view/filters.js";
import Sort from "./view/sort.js";
import EventsList from "./view/list-events.js";

import {createEventsListTemplate} from "./view/list-events.js";
import {createEventsItemTemplate} from "./view/events-item.js";
import {createFormEditTemplate} from "./view/form-edit.js";
import {generateTripPoints, TypeEvents, CITIES, generateVoidPoint} from "./mock/trip";
import {render, RenderPosition} from "./helpers/utils";

const EVENT_POINTS = generateTripPoints(10);
const EVENT_EDIT = generateTripPoints(1);
const EVENT_CREATE = generateVoidPoint(1);

const bodyElement = document.querySelector(`.page-body`);
const headerMainElement = bodyElement.querySelector(`.trip-main`);
const ControlsElement = headerMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = bodyElement.querySelector(`.trip-events`);

render(headerMainElement, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);
render(ControlsElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(ControlsElement, new Filters().getElement(), RenderPosition.BEFOREEND);
render(siteTripEventsElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(siteTripEventsElement, new EventsList().getElement(), RenderPosition.BEFOREEND);

const siteListEventsElement = siteTripEventsElement.querySelector(`.trip-events__list`);

// render(siteListEventsElement, createFormEditTemplate(...EVENT_EDIT, TypeEvents, CITIES, `edit`), `beforeend`);
//
// EVENT_POINTS.forEach((point) => {
//   render(siteListEventsElement, createEventsItemTemplate(point), `beforeend`);
// });
//
// render(siteListEventsElement, createFormEditTemplate(EVENT_CREATE, TypeEvents, CITIES, `create`), `beforeend`);

// todo: надо считать duration где-то тут
