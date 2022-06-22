import {FilterType} from '../constants.js';
import {isEventFuture, isEventPast} from './event.js';

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.dateFrom)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.dateTo)),
};

export {filter};
