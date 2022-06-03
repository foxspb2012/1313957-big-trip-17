import {COUNT_POINTS} from '../constants.js';
import {generateEventPoints} from '../mock/event-points.js';

export default class EventModel {
  #event = Array.from({length: COUNT_POINTS}, generateEventPoints);

  get events () {
    return this.#event;
  }
}
