import Abstract from "./abstract";

const createNoTripTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoEventTripView extends Abstract {
  getTemplate() {
    return createNoTripTemplate();
  }
}
