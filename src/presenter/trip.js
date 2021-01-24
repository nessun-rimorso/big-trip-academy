import EventsList from "../view/events-list";
import NoEventTripView from "../view/no-event-trip";
import Sort from "../view/sort.js";
import PointPresenter from "./point.js";
import {updateItem} from "../utils/common.js";
import {sortDay, sortPrice} from "../utils/point.js";
import {SortType} from "../helpers/constants";

import {render, RenderPosition, replace} from "../utils/render.js";

const EVENT_POINTS = 10;

export default class TripPresenter {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = new Sort();
    this._pointsListComponent = new EventsList();
    this._noTripComponent = new NoEventTripView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
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

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._tripPoints.sort(sortDay);
        break;
      case SortType.PRICE:
        this._tripPoints.sort(sortPrice);
        break;
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPointsList();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    this._renderPoints();
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
