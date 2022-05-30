import dayjs from 'dayjs';

export const generateEventCreate = () => {
  const date = dayjs().format('DD/MM/YY HH:mm');

  return {
    date,
  };
};

