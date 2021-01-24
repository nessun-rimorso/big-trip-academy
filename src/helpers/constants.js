export const SORTS = [
  `day`,
  `event`,
  `time`,
  `price`,
  `offers`,
];

export const FILTERS = [
  `everything`,
  `future`,
  `past`,
];

export const TypeEvents = {
  TAXI: {
    name: `Taxi`,
    offers: [],
  },
  BUS: {
    name: `Bus`,
    offers: [`LUAGGAGE`, `COMFORT_CLASS`, `MEAL`, `CHOOSE_SEATS`, `BOOK_TICKETS`],
  },
  TRAIN: {
    name: `Train`,
    offers: [`COMFORT_CLASS`, `UBER`, `MEAL`, `CHOOSE_SEATS`, `BOOK_TICKETS`],
  },
  SHIP: {
    name: `Ship`,
    offers: [`COMFORT_CLASS`, `UBER`, `MEAL`, `CHOOSE_SEATS`, `RENT_CAR`],
  },
  TRANSPORT: {
    name: `Transport`,
    offers: [`MEAL`, `CHOOSE_SEATS`],
  },
  DRIVE: {
    name: `Drive`,
    offers: [`LUAGGAGE`, `MEAL`],
  },
  FLIGHT: {
    name: `Flight`,
    offers: [`LUAGGAGE`, `COMFORT_CLASS`, `BY_TRAIN`, `UBER`, `MEAL`, `RENT_CAR`],
  },
  CHECK_IN: {
    name: `Check-in`,
    offers: [`BY_TRAIN`, `MEAL`, `LUNCH`],
  },
};

export const CITIES = [
  `Rome`,
  `Florence`,
  `Naples`,
  `Milan`,
  `Parma`,
  `Bologna`,
  `Palermo`,
  `Pompeii`,
  `Turin`,
  `Venice`,
];

export const SortType = {
  DAY: `day`,
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
  OFFERS: `offers`,
};
