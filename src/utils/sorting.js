import dayjs from 'dayjs';

const sortPointsDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(pointB.dateFrom);

const sortPointsTime = (pointA, pointB) => {
  const {dateTo: startA, dateFrom: endA} = pointA;
  const {dateTo: startB, dateFrom: endB} = pointB;

  return dayjs(endA).diff(dayjs(startA)) - dayjs(endB).diff(dayjs(startB));
};

const sortPointsPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  sortPointsDay,
  sortPointsTime,
  sortPointsPrice,
};
