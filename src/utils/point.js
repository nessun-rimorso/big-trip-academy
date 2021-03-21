import dayjs from "dayjs";

export const sortPrice = (pointA, pointB) => {
  return pointA.price > pointB.price ? 1 : -1;
};

export const sortDay = (pointA, pointB) => {
  return pointA.date.startTime.unix() > pointB.date.startTime.unix() ? 1 : -1;
};
