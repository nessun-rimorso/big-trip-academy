import dayjs from "dayjs";

const TypeEvents = {
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
    name: `Train`,
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
  CAR: {
    name: `Car`,
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
const CITIES = [
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
const Offers = {
  LUAGGAGE: {
    name: `Add luggage`,
    price: 30,
  },
  COMFORT_CLASS: {
    name: `Switch to comfort class`,
    price: 56,
  },
  BY_TRAIN: {
    name: `Travel by train`,
    price: 2576,
  },
  UBER: {
    name: `Order Uber`,
    price: 20,
  },
  MEAL: {
    name: `Add meal`,
    price: 1,
  },
  CHOOSE_SEATS: {
    name: `Choose seats`,
    price: 100,
  },
  RENT_CAR: {
    name: `Rent a car`,
    price: 200,
  },
  BOOK_TICKETS: {
    name: `Book tickets`,
    price: 40,
  },
  LUNCH: {
    name: `Lunch in city`,
    price: 30,
  },
};
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const generateRandomData = (list) => {
  if (Array.isArray(list)) {
    const randomIndex = getRandomInteger(0, list.length - 1);
    return list[randomIndex];
  } else {
    const keys = Object.keys(list);
    const randomIndex = getRandomInteger(0, keys.length - 1);
    const keyType = keys[randomIndex];
    return list[keyType];
  }
};
const getOffersByType = (type, offers) => {
  const result = [];

  type.offers.forEach((item) => {
    const isCheck = getRandomInteger();

    if (isCheck) {
      const offer = {
        [item]: offers[item],
      };
      result.push(offer);
    }
  });

  return result;
};
const getDescription = (list, from = 1, to = 5) => {
  const iterration = getRandomInteger(from, to);
  let result = ``;

  for (let i = 0; i < iterration; i++) {
    result += generateRandomData(list);

    if (i !== iterration) {
      result += ` `;
    }
  }

  return result;
};
const getPhotos = (from = 1, to = 8) => {
  let result = [];
  const iterration = getRandomInteger(from, to);

  for (let i = 0; i < iterration; i++) {
    result.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return result;
};
const getDate = () => {
  const currentYear = dayjs().$y;
  const from = +(new Date(currentYear - 1, 0));
  const to = +(new Date(currentYear + 2, 0));
  const MAX_DURATION = new Date(3600 * 42 * 1000);
  const startDate = getRandomInteger(from, to);
  const duration = getRandomInteger(+(new Date(0)), MAX_DURATION);
  const endDate = startDate + duration;

  return {
    from: dayjs(startDate),
    to: dayjs(endDate),
    duration: dayjs(duration),
  };
};

const type = generateRandomData(TypeEvents);
const offerslist = getOffersByType(type, Offers);

const generateEventPoint = () => {
  return {
    typeEvent: type,
    city: generateRandomData(CITIES),
    offers: offerslist,
    destinationInfo: getDescription(DESCRIPTIONS),
    photos: getPhotos(),
    price: getRandomInteger(1, 1500),
    date: getDate(),
    isFavourite: Boolean(getRandomInteger()),
  };
};

export const generateTripPoints = (points = 15) => {
  const result = [];
  for (let i = 0; i < points; i++) {
    result.push(generateEventPoint());
  }
  return result;
};
