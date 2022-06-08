import {COUNT_POINTS} from '../constants.js';
import {generateEventPoints} from '../mock/event-points.js';

export default class EventModel {
  #event = Array.from({length: COUNT_POINTS}, generateEventPoints).sort((a, b) => Date.parse(a.date_from) - Date.parse(b.date_from));

  get events () {
    return this.#event;
  }
}
