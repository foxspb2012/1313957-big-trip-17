import dayjs from 'dayjs';

const sortPointsTime = (pointA, pointB) => {
  const {date_to: startA, date_from: endA} = pointA;
  const {date_to: startB, date_from: endB} = pointB;

  return dayjs(endA).diff(dayjs(startA)) - dayjs(endB).diff(dayjs(startB));
};

const sortPointsPrice = (pointA, pointB) => pointB.base_price - pointA.base_price;

export {
  sortPointsTime,
  sortPointsPrice
};
