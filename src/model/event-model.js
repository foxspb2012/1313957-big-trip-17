import {COUNT_POINTS} from '../constants.js';
import {generateEventEdit} from '../mock/event-edit.js';
import {generateEventCreate} from '../mock/event-create.js';

export default class EventModel {
  event = Array.from({length: COUNT_POINTS}, generateEventEdit);
  newEvent = Array.from({length: 1}, generateEventCreate);

  getEvents = () => this.event;
  getNewEvent = () => this.newEvent;
}
