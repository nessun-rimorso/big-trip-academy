import EventsList from "../view/events-list";
import NoEventTripView from "../view/no-event-trip";
import Sort from "../view/sort.js";
import PointPresenter from "./point.js";
import {updateItem} from "../utils/common.js";

import {render, RenderPosition, replace} from "../utils/render.js";

const EVENT_POINTS = 10;

export default class TripPresenter {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};

    this._sortComponent = new Sort();
    this._pointsListComponent = new EventsList();
    this._noTripComponent = new NoEventTripView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noTripComponent, RenderPosition.AFTERBEGIN);
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderPointsList() {
    this._renderPoints(0, Math.min(this._tripPoints.length, EVENT_POINTS));
  }

  _renderTrip() {
    if (!this._tripPoints.length) {
      this._renderNoPoints();
    }

    this._renderSort();
    this._renderPointsList();

    this._renderPointsList(0, Math.min(this._tripPoints.length, EVENT_POINTS));
  }
}
