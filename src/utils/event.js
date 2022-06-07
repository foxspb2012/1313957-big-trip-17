import dayjs from 'dayjs';

const formatDate = (date, format) => dayjs(date).format(format);

const getDuration = (dateStart, dateEnd) => {

  const difference = dayjs(dateEnd).diff(dayjs(dateStart), 'minute');
  const day = Math.floor(difference / 1440).toString();
  const hour = Math.floor(difference / 60).toString();
  const minute = (difference % 60).toString();

  return `${(day > 0 ? `${day < 10 ? `0${day}` : day}D `: '') + (hour > 0 ? `${hour < 10 ? `0${hour}`: hour }H `: '')  }${minute < 10 ? `0${minute}` : minute}M`;
};

const isDayExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

export {
  formatDate,
  getDuration,
  isDayExpired
};
