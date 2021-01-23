import Abstract from "./abstract";

export const createEventsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class EventsList extends Abstract {
  getTemplate() {
    return createEventsListTemplate();
  }
}
