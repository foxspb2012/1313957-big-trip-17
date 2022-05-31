import dayjs from 'dayjs';

const getRandomInteger = function (a = 0, b = 1) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

const formatDate = (date, format) => dayjs(date).format(format);

const getDuration = (dateStart, dateEnd) => {

  const difference = dayjs(dateEnd).diff(dayjs(dateStart), 'minute');
  const day = Math.floor(difference / 1440).toString();
  const hour = Math.floor(difference / 60).toString();
  const minute = (difference % 60).toString();

  return `${(day > 0 ? `${day < 10 ? `0${day}` : day}D `: '') + (hour > 0 ? `${hour < 10 ? `0${hour}`: hour }H `: '')  }${minute < 10 ? `0${minute}` : minute}M`;
};


export {
  getRandomInteger,
  shuffle,
  formatDate,
  getDuration,
};

