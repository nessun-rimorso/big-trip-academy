import TripInfo from "./view/trip-info.js";
import SiteMenu from "./view/menu.js";
import Filters from "./view/filters.js";
import Sort from "./view/sort.js";
import EventsList from "./view/list-events.js";
import EventItem from "./view/events-item.js";
import EventEdit from "./view/form-edit.js";
import NoEventTripView from "./view/no-event-trip.js";

import {generateTripPoints, generateVoidPoint} from "./mock/trip";
import {render, RenderPosition} from "./helpers/utils";

const EVENT_POINTS = generateTripPoints(0);
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

const renderTrip = (ListElement, trip) => {
  const tripComponent = new EventItem(trip);
  const tripEditComponent = new EventEdit(trip);

  const replaceCardToForm = () => {
    ListElement.replaceChild(tripEditComponent.getElement(), tripComponent.getElement());
  };

  const replaceFormToCard = () => {
    ListElement.replaceChild(tripComponent.getElement(), tripEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(ListElement, tripComponent.getElement(), RenderPosition.BEFOREEND);
};

// render(siteListEventsElement, new EventEdit(...EVENT_EDIT, `edit`).getElement(), RenderPosition.BEFOREEND);

EVENT_POINTS.forEach((trip) => {
  renderTrip(siteListEventsElement, trip);
});

if (!EVENT_POINTS.length) {
  render(siteTripEventsElement, new NoEventTripView().getElement(), RenderPosition.BEFOREEND);
}

// render(siteListEventsElement, new EventEdit().getElement(EVENT_CREATE, TypeEvents, CITIES, `create`), RenderPosition.BEFOREEND);

// todo: надо считать duration где-то тут

