import {Offers} from "../helpers/constants";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getOffersByType = (type, offers) => {
  if (!type) {
    return;
  }

  const result = [];

  type.offers.forEach((item) => {
    const offer = {[item]: offers[item]};

    result.push(offer);
  });

  return result;
};

export const getOffers = (offers) => {
  if (!offers.length) {
    return;
  }

  const result = [];

  offers.forEach((item) => {
    const offer = {[item]: Offers[item]};
    result.push(offer);
  });

  return result;
};
