import dayjs from 'dayjs';

const formatDate = (date, format) => dayjs(date).format(format);

const duration = (value, unit) => (value > 0 ? `${value < 10 ? `0${value}` : value}${unit} `: '');
const getDuration = (dateStart, dateEnd) => {

  const day = dayjs(dateEnd).diff(dayjs(dateStart), 'day');
  const hour = dayjs(dateEnd).diff(dayjs(dateStart), 'hour') - day * 24;
  const minute = dayjs(dateEnd).diff(dayjs(dateStart), 'minute') - day * 1440 - hour * 60;

  return `${duration(day,'D') + duration(hour, 'H') + duration(minute, 'M' )}`;
};

const isEventFuture = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');
const isEventPast = (dateTo) => dateTo && dayjs().isAfter(dateTo, 'D');

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export {
  formatDate,
  getDuration,
  isEventFuture,
  isEventPast,
  isDatesEqual,
};
