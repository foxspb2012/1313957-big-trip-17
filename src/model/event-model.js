import {COUNT_POINTS} from '../constants.js';
import {generateEventPoints} from '../mock/event-points.js';
import Observable from '../framework/observable.js';

export default class EventModel extends Observable {
  #events = Array.from({length: COUNT_POINTS}, generateEventPoints)
    .sort((a, b) => Date.parse(a.date_from) - Date.parse(b.date_from));

  get events () {
    return this.#events;
  }

  updateEvent = (updateType, update) => {
    const idx = this.#events.findIndex((event) => event.id === update.id);

    if (idx === -1) {
      throw new Error('Can\'t update unexciting event');
    }

    this.#events = [
      ...this.#events.slice(0, idx),
      update,
      ...this.#events.slice(idx+1),
    ];
    this._notify(updateType, update);
  };

  addEvent = (updateType, update) => {
    this.#events = [update,
      ...this.#events,
    ];
    this._notify(updateType, update);
  };

  deleteEvent = (updateType, update) => {
    const idx = this.#events.findIndex((event) => event.id === update.id);

    if (idx === -1) {
      throw new Error('Can\'t update unexciting event');
    }

    this.#events = [
      ...this.#events.slice(0, idx),
      ...this.#events.slice(idx+1),
    ];

    this._notify(updateType, update);
  };
}
