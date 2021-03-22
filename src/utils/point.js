import dayjs from "dayjs";

export const sortPrice = (pointA, pointB) => {
  return pointA.price > pointB.price ? 1 : -1;
};

export const sortDay = (pointA, pointB) => {
  return pointA.date.startTime.unix() > pointB.date.startTime.unix() ? 1 : -1;
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, `D`);
};

export const isPointFromThePast = (point) => point.startTime < new Date().getTime();

export const isPointFromTheFuture = (point) => point.startTime > new Date().getTime();
