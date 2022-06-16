import dayjs from 'dayjs';

const formatDate = (date, format) => dayjs(date).format(format);

const getDuration = (dateStart, dateEnd) => {

  const day = dayjs(dateEnd).diff(dayjs(dateStart), 'day');
  const hour = dayjs(dateEnd).diff(dayjs(dateStart), 'hour') - day * 24;
  const minute = dayjs(dateEnd).diff(dayjs(dateStart), 'minute') - day * 1440 - hour * 60;

  return `${(day > 0 ? `${day < 10 ? `0${day}` : day}D `: '') +
            (hour > 0 ? `${hour < 10 ? `0${hour}`: hour }H `: '') +
            (minute > 0 ? `${minute < 10 ? `0${minute}`: minute }M `: '')}`;
};

const isDayExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

export {
  formatDate,
  getDuration,
  isDayExpired
};
