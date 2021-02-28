import EventsList from "../view/events-list";
import NoEventTripView from "../view/no-event-trip";
import Sort from "../view/sort.js";
import PointPresenter from "./point.js";
import {updateItem} from "../utils/common.js";
import {sortDay, sortPrice} from "../utils/point.js";
import {SortType} from "../helpers/constants";

import {render, RenderPosition, replace} from "../utils/render.js";

const EVENT_POINTS = 10;

export default class TripBoardPresenter {
  constructor(tripContainer, tripsModel) {
    this._tripsModel = tripsModel;
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

  init() {
    render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.DAY:
        return this._tripsModel.getPoints().slice().sort(sortDay);
      case SortType.PRICE:
        return this._tripsModel.getPoints().slice().sort(sortPrice);
    }

    return this._tripsModel.getPoints();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    // Здесь будем вызывать обновление модели
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
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

  _renderPoints(points) {
    points.forEach((tripPoint) => this._renderPoint(tripPoint));
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
    const points = this._getPoints().slice();
    this._renderPoints(points);
  }

  _renderTrip() {
    if (!this._getPoints().length) {
      this._renderNoPoints();
    }

    this._renderSort();
    this._renderPointsList();

    // this._renderPointsList(0, Math.min(this._tripPoints.length, EVENT_POINTS));
  }
}
