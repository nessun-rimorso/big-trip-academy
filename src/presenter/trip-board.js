import EventsList from "../view/events-list";
import NoEventTripView from "../view/no-event-trip";
import Sort from "../view/sort.js";
import PointPresenter from "./point.js";
import PointNewPresenter from "../presenter/point-new";
import {sortDay, sortPrice} from "../utils/point.js";
import {filter} from "../utils/filter.js";
import {UserAction, UpdateType, SortType, FilterType} from "../helpers/constants";

import {render, RenderPosition, remove} from "../utils/render.js";

const EVENT_POINTS = 10;

export default class TripBoardPresenter {
  constructor(tripContainer, tripsModel, filterModel) {
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;
    this._pointsListComponent = new EventsList();
    this._noTripComponent = new NoEventTripView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._tripsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._pointsListComponent, this._handleViewAction);
  }

  init() {
    render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  createTrip() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const trips = this._tripsModel.getPoints();
    const filteredTrips = filter[filterType](trips);

    if (filteredTrips.length) {
      switch (this._currentSortType) {
        case SortType.DAY:
          return filteredTrips.sort(sortDay);
        case SortType.PRICE:
          return filteredTrips.sort(sortPrice);
      }
    }

    return filteredTrips;
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._tripsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._tripsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._tripsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new Sort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noTripComponent, RenderPosition.AFTERBEGIN);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._noTripComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderPointsList() {
    const points = this._getPoints().slice();
    this._renderPoints(points);
  }

  _renderBoard() {
    if (!this._getPoints().length) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPointsList();
  }
}
