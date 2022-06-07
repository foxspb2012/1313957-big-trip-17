import {FilterType} from '../constants.js';
import {isDayExpired} from '../utils/event.js';

const filter = {
  [FilterType.EVERYTHING]: (eventList) => eventList,
  [FilterType.FUTURE]: (eventList) => eventList.filter((point) => !isDayExpired(point['date_from'])),
  [FilterType.PAST]: (eventList) => eventList.filter((point) => isDayExpired(point['date_to']))};

export {filter};
