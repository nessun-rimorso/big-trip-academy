import {getRandomInteger} from "../utils/common";

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

export const Offers = {
  LUAGGAGE: {
    name: `Add luggage`,
    price: 30,
    isActive: false,
  },
  COMFORT_CLASS: {
    name: `Switch to comfort class`,
    price: 56,
    isActive: false,
  },
  BY_TRAIN: {
    name: `Travel by train`,
    price: 2576,
    isActive: !!getRandomInteger(),
  },
  UBER: {
    name: `Order Uber`,
    price: 20,
    isActive: !!getRandomInteger(),
  },
  MEAL: {
    name: `Add meal`,
    price: 1,
    isActive: !!getRandomInteger(),
  },
  CHOOSE_SEATS: {
    name: `Choose seats`,
    price: 100,
    isActive: !!getRandomInteger(),
  },
  RENT_CAR: {
    name: `Rent a car`,
    price: 200,
    isActive: !!getRandomInteger(),
  },
  BOOK_TICKETS: {
    name: `Book tickets`,
    price: 40,
    isActive: !!getRandomInteger(),
  },
  LUNCH: {
    name: `Lunch in city`,
    price: 30,
    isActive: !!getRandomInteger(),
  },
};
