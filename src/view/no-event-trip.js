import {createElement} from "../helpers/utils";

const createNoTripTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoEventTripView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoTripTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
