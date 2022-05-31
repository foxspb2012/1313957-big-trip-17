import {COUNT_POINTS} from '../constants.js';
import {generateEventEdit} from '../mock/event-edit.js';

export default class EventModel {
  event = Array.from({length: COUNT_POINTS}, generateEventEdit);

  getEvents = () => this.event;
}
