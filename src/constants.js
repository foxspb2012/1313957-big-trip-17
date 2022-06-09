const COUNT_POINTS = 20;

const OFFERS = [
  {
    'id': 1,
    'title': 'Order Uber',
    'price': 20,
  },
  {
    'id': 2,
    'title': 'Add luggage',
    'price': 50,
  },
  {
    'id': 3,
    'title': 'Switch to comfort',
    'price': 80,
  },
  {
    'id': 4,
    'title': 'Rent a car',
    'price': 200,
  },
  {
    'id': 5,
    'title': 'Add breakfast',
    'price': 50,
  },
  {
    'id': 6,
    'title': 'Book tickets',
    'price': 40,
  },
  {
    'id': 7,
    'title': 'Lunch in city',
    'price': 70,
  },
];

const OFFERS_BY_TYPE = [
  {
    'type': 'taxi',
    'offers': [1,4],
  },
  {
    'type': 'bus',
    'offers': [3,4,6],
  },
  {
    'type': 'train',
    'offers': [2,3,6],
  },
  {
    'type': 'drive',
    'offers': [1,4],
  },
  {
    'type': 'flight',
    'offers': [2,3,4],
  },
  {
    'type': 'check-in',
    'offers': [5,7],
  },
  {
    'type': 'sightseeing',
    'offers': [6,7],
  },
];

const CITIES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'Rome',
  'Saint-Petersburg',
];

const EVENT_TYPES = [
  'Bus',
  'Check-in',
  'Drive',
  'Flight',
  'Restaurant',
  'Ship',
  'Sightseeing',
  'Taxi',
  'Train',
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit',
};

const FILTER_TYPES = [
  'everything',
  'future',
  'past',
];

export {
  COUNT_POINTS,
  OFFERS,
  OFFERS_BY_TYPE,
  CITIES,
  EVENT_TYPES,
  DESCRIPTION,
  Mode,
  FILTER_TYPES,
};
