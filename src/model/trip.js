import Observer from "../utils/observer.js";

export default class Trips extends Observer {
  constructor() {
    super();
    this._trips = [];
  }

  setPoints(trips) {
    this._trips = trips.slice();
  }

  getPoints() {
    return this._trips;
  }
}
