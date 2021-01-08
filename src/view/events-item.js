import {createElement} from "../helpers/utils";

const getSelectedOffers = (offers) => {
  if (!offers || !offers.length) {
    return;
  }

  const result = [];
  offers.forEach((offer) => {
    const offerData = Object.values(offer)[0];

    if (offerData.isActive) {
      result.push(offerData);
    }

  });

  return result;
};
const getOffersTemplate = (nameOffer, priceOffer) => {
  return `
    <li class="event__offer">Random
      <span class="event__offer-title">${nameOffer}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${priceOffer}</span>
    </li>`;
};
const generateOffersTemplate = (list, template) => {
  if (!list) {
    return ``;
  }

  let result = ``;

  list.forEach((item) => {
    const {name, price} = item;
    result += template(name, price);
  });

  return result;
};

const createEventsItemTemplate = ({city, date: {duration, from, to}, isFavourite, offers, price, typeEvent}) => {
  const imgPathName = typeEvent.name.toLowerCase();
  const selectedOffers = getSelectedOffers(offers);

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${from.format(`YYYY-MM-DD`)}">${from.format(`MMM
                 DD`).toUpperCase()}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${imgPathName}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${typeEvent.name} ${city}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${from.format(`YYYY-MM-DD[T]HH:mm`)}">${from.format(`HH-mm`)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${to.format(`YYYY-MM-DD[T]HH:mm`)}">${to.format(`HH-mm`)}</time>
                  </p>
                  <p class="event__duration">${duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${generateOffersTemplate(selectedOffers, getOffersTemplate)}
                </ul>
                <button class="event__favorite-btn${isFavourite ? ` event__favorite-btn--active` : ``}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class EventItem {
  constructor(trip) {
    this._trip = trip;
    this._element = null;
  }

  getTemplate() {
    return createEventsItemTemplate(this._trip);
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
