const typeEvent = {
  taxi: {
    name: `Taxi`,
    iconPath: ``,
  },
  bus: {
    name: `Bus`,
    iconPath: ``,
  },
  train: {
    name: `Train`,
    iconPath: ``,
  },
  ship: {
    name: `Ship`,
    iconPath: ``,
  },
  transport: {
    name: `Transport`,
    iconPath: ``,
  },
  drive: {
    name: `Drive`,
    iconPath: ``,
  },
  car: {
    name: `Taxi`,
    iconPath: ``,
  },
  flight: {
    name: `Flight`,
    iconPath: ``,
  },
  checkIn: {
    name: `Check-in`,
    iconPath: ``,
  },
};

const city = [
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

const offers = {
  luggage: {
    type: [`taxi`, `bus`, `flight`, `car`, `drive`],
    name: `Add luggage`,
    price: `+€ 30`,
  },
  comfortClass: {
    type: [`taxi`, `bus`, `flight`, `ship`, `train`],
    name: `Switch to comfort class`,
    price: `+€ 56`,
  },
  byTrain: {
    type: [`checkIn`, `flight`],
    name: `Travel by train`,
    price: `+€ 2576`,
  },
  uber: {
    type: [`flight`, `ship`, `train`],
    name: `Order Uber`,
    price: `+€ 20`,
  },
  meal: {
    type: [`taxi`, `bus`, `checkIn`, `flight`, `car`, `drive`, `transport`, `ship`, `train`],
    name: `Add meal`,
    price: `+€ 1`,
  },
  chooseSeats: {
    type: [`bus`, `flight`, `transport`, `ship`, `train`],
    name: `Choose seats`,
    price: `+€ 100`,
  },
  rentCar: {
    type: [`flight`, `ship`],
    name: `Rent a car`,
    price: `+€ 200`,
  },
  bookTickets: {
    type: [`bus`, `flight`, `ship`, `train`],
    name: `Book tickets`,
    price: `+€ 40`,
  },
  lunch: {
    type: [`ship`, `train`],
    name: `Lunch in city`,
    price: `+€ 30`,
  },
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomData = (list) => {
  const randomIndex = getRandomInteger(0, list.length - 1);

  return list[randomIndex];
};

const getOffersByType = (type, offersList) => {
  return type in offersList ? offersList[type] : [];
};

const type = generateRandomData(typeEvent);

export const generateTask = () => {
  return {
    typeEvent: type,
    city: generateRandomData(city),
    offers: getOffers(type, offers),
  };
};
