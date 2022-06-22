import Observable from '../framework/observable.js';
import {UpdateType} from '../constants.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor (eventsApiService) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const points = await this.#eventsApiService.points;
      this.#offers = await this.#eventsApiService.offers;
      this.#destinations = await this.#eventsApiService.destinations;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };

  updateEvent = async (updateType, update) => {
    const index = this.#points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexciting event. Update: ${update}`);
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedEvent,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, updatedEvent);

    } catch(err) {
      throw new Error('Can\'t update task');
    }
  };

  addEvent = async (updateType, update) => {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch {
      throw new Error('Can\'t add event');
    }
  };

  deleteEvent = async (updateType, update) => {
    const deletedIndex = this.#points.findIndex((item) => item.id === update.id);

    if (deletedIndex === -1) {
      throw new Error('Can\'t delete unexciting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);
      this.#points = this.#points.filter((_item, index) => index !== deletedIndex);
      this._notify(updateType);
    } catch {
      throw new Error('Can\'t delete event');
    }
  };

  #adaptToClient = (event) => {
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom: new Date(event['date_from']),
      dateTo: new Date(event['date_to']),
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  };
}
