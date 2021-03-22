import dayjs from "dayjs";
import SmartView from "./smart.js";
import {TypeEvents, CITIES} from "../helpers/constants";
import {getOffers} from "../utils/common";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_TASK = {
  typeEvent: ``,
  city: ``,
  destinationInfo: ``,
  photos: ``,
  price: ``,
  date: {startTime: ``, endTime: ``},
  isFavourite: false,
  total: 0,
};

const templateType = (type, active) => {
  if (!type || !type.name) {
    return;
  }

  const {name} = type;
  const nameLowerCase = name.toLowerCase();

  return `
  <div class="event__type-item">
    <input id="event-type-${nameLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${nameLowerCase}"${isTypeActive(name, active)}>
    <label class="event__type-label  event__type-label--${nameLowerCase}" for="event-type-${nameLowerCase}-1">${name}</label>
  </div>
  `;
};
const templateCity = (city) => `<option value="${city}"></option>`;
const templateOffer = (offer) => {
  const offerKey = Object.keys(offer)[0];
  const offerLowerCase = offerKey.toLowerCase();
  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden"
                   id="event-offer-${offerLowerCase}-1"
                   type="checkbox"
                   name="event-offer-${offerLowerCase}"${offer[offerKey].isActive ? ` checked` : ``}>
            <label class="event__offer-label" for="event-offer-${offerLowerCase}-1">
              <span class="event__offer-title">${offer[offerKey].name}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer[offerKey].price}</span>
            </label>
          </div>`;
};

const isTypeActive = (name, active) => {
  return name === active ? ` checked` : ``;
};

const generateTypes = (types, typeActive) => {
  const typeKeys = Object.keys(types);
  let result = ``;

  typeKeys.forEach((key) => {
    result += templateType(types[key], typeActive.name);
  });

  return result;
};
const generateCities = () => {
  let result = ``;

  CITIES.forEach((city) => {
    result += templateCity(city);
  });

  return result;
};
const generateOffers = (offers) => {
  if (!offers || !offers.length) {
    return ``;
  }
  let result = ``;

  offers.forEach((offer) => {
    result += templateOffer(offer);
  });

  return result;
};
const templateBtnsEdit = `
  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
`;
const templateBtnsCreate = `
  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Cancel</button>
`;
const photosTemplate = (photos) => {
  if (!photos || !photos.length) {
    return ``;
  }
  let result = `<div class="event__photos-container"><div class="event__photos-tape">`;

  photos.forEach((photo) => {
    result += `<img class="event__photo" src="${photo}" alt="Event photo">`;
  });

  result += `</div></div>`;
  return result;
};
const typeEventDefault = {
  name: `Bus`,
  offers: [`LUAGGAGE`, `COMFORT_CLASS`, `MEAL`, `CHOOSE_SEATS`, `BOOK_TICKETS`],
};

const createFormEditTemplate = ({city, date: {startTime, endTime}, offers, price, typeEvent, destinationInfo, photos}, mode) => {
  if (!typeEvent) {
    typeEvent = typeEventDefault;
    offers = typeEventDefault.offers;
  }

  const imgPathName = typeEvent.name.toLowerCase();

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon"
                           width="17"
                           height="17"
                           src="img/icons/${imgPathName}.png"
                           alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden"
                           id="event-type-toggle-1"
                           type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${generateTypes(TypeEvents, typeEvent)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${typeEvent.name}
                    </label>
                    <input class="event__input
                           event__input--destination"
                           id="event-destination-1"
                           type="text" name="event-destination"
                           value="${city ? city : ``}"
                           list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${generateCities()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time"
                           id="event-start-time-1"
                           type="text" name="event-start-time"
                           value="${startTime ? startTime.format(`DD/MM/YY HH:mm`) : dayjs().format(`DD/MM/YY HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time"
                           id="event-end-time-1"
                           type="text" name="event-end-time"
                           value="${endTime ? endTime.format(`DD/MM/YY HH:mm`) : dayjs().format(`DD/MM/YY HH:mm`)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price"
                           id="event-price-1"
                           type="text"
                           name="event-price"
                           value="${price}">
                  </div>
                  ${mode === `edit` ? templateBtnsEdit : templateBtnsCreate}
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${generateOffers(offers)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinationInfo ? destinationInfo : ``}</p>
                    ${mode === `create` ? photosTemplate(photos) : ``}
                  </section>
                </section>
              </form>
            </li>`;
};

export default class EventEdit extends SmartView {
  constructor(trip = BLANK_TASK, mode) {
    super();
    this._data = EventEdit.parseTripToData(trip);
    this._mode = mode;
    this._datepickers = {};

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._closeFormClickHandler = this._closeFormClickHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._cityToggleHandler = this._cityToggleHandler.bind(this);
    this._startTimeChangeHandler = this._startTimeChangeHandler.bind(this);
    this._endTimeChangeHandler = this._endTimeChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  removeElement() {
    super.removeElement();

    if (Object.keys(this._datepickers).length) {
      this._destroyDatepicker(`start-time`);
      this._destroyDatepicker(`end-time`);
    }
  }

  reset(trip) {
    this.updateData(
        EventEdit.parseTripToData(trip)
    );
  }

  getTemplate() {
    return createFormEditTemplate(this._data, this._mode);
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();
    const type = evt.target.value.toUpperCase().split(`-`).join(`_`);

    if (!TypeEvents[type]) {
      return;
    }

    this.updateData({
      typeEvent: TypeEvents[type],
      offers: TypeEvents[type].offers ? getOffers(TypeEvents[type].offers) : [],
    });
  }

  _cityToggleHandler(evt) {
    evt.preventDefault();

    this.updateData({
      city: evt.target.value,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _closeFormClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeFormClick();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseFormClickHandler(this._callback.closeFormClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepickers() {
    this._setDatepickerStartTime(`start-time`);
    this._setDatepickerEndTime(`end-time`);
  }

  _setDatepickerStartTime(periodTime) {
    this._destroyDatepicker(periodTime);

    this._datepickers[periodTime] = flatpickr(
        this.getElement().querySelector(`.event__input--time[name='event-${periodTime}']`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          defaultDate: this._data.date.startTime,
          onChange: this._startTimeChangeHandler,
        }
    );
  }

  _setDatepickerEndTime(periodTime) {
    this._destroyDatepicker(periodTime);

    this._datepickers[periodTime] = flatpickr(
        this.getElement().querySelector(`.event__input--time[name='event-${periodTime}']`),
        {
          dateFormat: `d/m/y H:i`,
          enableTime: true,
          minDate: this._data.date[`startTime`],
          defaultDate: this._data.date.endTime,
          onChange: this._endTimeChangeHandler,
        }
    );
  }

  _destroyDatepicker(periodTime) {
    if (this._datepickers && this._datepickers[periodTime]) {
      this._datepickers[periodTime].destroy();
      this._datepickers[periodTime] = null;
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll(`.event__type-input`)
      .forEach((radio) => {
        radio.addEventListener(`change`, this._eventTypeToggleHandler);
      });

    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._cityToggleHandler);
  }

  _startTimeChangeHandler([userDate]) {
    const update = Object.assign({}, this._data.date, {startTime: dayjs(userDate)});
    this.updateData({date: update});
  }

  _endTimeChangeHandler([userDate]) {
    const update = Object.assign({}, this._data.date, {endTime: dayjs(userDate)});
    this.updateData({date: update});
  }

  setCloseFormClickHandler(callback) {
    this._callback.closeFormClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._closeFormClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._data);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`button[type=reset]`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parseTripToData(trip) {
    return Object.assign(
        {},
        trip,
        {
          isDueDate: trip.dueDate !== null,
        }
    );
  }
}
