import TripInfo from "./view/trip-info.js";
import SiteMenu from "./view/menu.js";
import Filters from "./view/filters.js";
import TripsModel from "./model/trip";

import TripBoardPresenter from "./presenter/trip-board.js";
import {render, RenderPosition} from "./utils/render.js";

import {generateTripPoints, generateVoidPoint} from "./mock/trip";


const EVENT_POINTS = generateTripPoints(10);
const EVENT_EDIT = generateTripPoints(1);
const EVENT_CREATE = generateVoidPoint(1);

const tripsModel = new TripsModel();
tripsModel.setPoints(EVENT_POINTS);

const bodyElement = document.querySelector(`.page-body`);
const headerMainElement = bodyElement.querySelector(`.trip-main`);
const ControlsElement = headerMainElement.querySelector(`.trip-controls`);
const siteTripEventsElement = bodyElement.querySelector(`.trip-events`);

render(headerMainElement, new TripInfo(), RenderPosition.AFTERBEGIN);
render(ControlsElement, new SiteMenu(), RenderPosition.BEFOREEND);
render(ControlsElement, new Filters(), RenderPosition.BEFOREEND);

const tripBoardPresenter = new TripBoardPresenter(siteTripEventsElement, tripsModel);
tripBoardPresenter.init();
