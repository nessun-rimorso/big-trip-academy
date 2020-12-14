// todo: надо считать total где-то тут, и вообще правильно ли он считается
// todo: mode???
// todo: предусмотреть пустые данные на создание

import dayjs from "dayjs";

const templateType = (type, active) => {
  if (!type || !type.name) return;

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
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerLowerCase}-1" type="checkbox" name="event-offer-${offerLowerCase}"${offer[offerKey].isActive ? ` checked` : ``}>
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
const generateCities = (cities) => {
  if (!cities.length) return ``;
  let result = ``;

  cities.forEach((city) => {
    result += templateCity(city);
  });

  return result;
};
const generateOffers = (offers) => {
  if (!offers || !offers.length) return ``;
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
  if (!photos || !photos.length) return ``;
  let result = `<div class="event__photos-container"><div class="event__photos-tape">`;

  photos.forEach(photo => {
    result += `<img class="event__photo" src="${photo}" alt="Event photo">`;
  })

  result += `</div></div>`;
  return result;
};
const typeEventDefault = {name: `Taxi`, offers: [`ква-ква`],};

export const createFormEditTemplate = (
  {city, date: {from, to}, offers, price, typeEvent, destinationInfo, photos},
  typeEvents,
  cities,
  mode) => {
    console.log(mode)
    if (!typeEvent) typeEvent = typeEventDefault;
    const imgPathName = typeEvent.name.toLowerCase();

    return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${imgPathName}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${generateTypes(typeEvents, typeEvent)}
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
                      ${generateCities(cities)}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time"
                           id="event-start-time-1"
                           type="text" name="event-start-time"
                           value="${from ? from.format(`DD/MM/YY HH:mm`) : dayjs().format(`DD/MM/YY HH:mm`)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time"
                           id="event-end-time-1"
                           type="text" name="event-end-time"
                           value="${to ? to.format(`DD/MM/YY HH:mm`) : dayjs().format(`DD/MM/YY HH:mm`)}">
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
