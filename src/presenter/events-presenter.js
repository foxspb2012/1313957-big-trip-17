import PointPresenter from './point-presenter.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import ListEmpty from '../view/list-empty-view.js';
import {render} from '../framework/render.js';
import {updatePoint} from '../utils/common.js';

export default class EventsPresenter {

  #sortComponent = new SortView();
  #listEmptyComponent = new ListEmpty();
  #eventsListComponent = new EventsListView();

  #eventContainer = null;
  #eventModel = null;
  #eventsList = [];
  #eventPresenter = new Map();

  constructor(eventContainer, eventModel) {
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#eventsList = [...this.#eventModel.events];
    this.#renderEvents();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#eventsList = updatePoint(this.#eventsList, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#eventContainer);
  };

  #renderComponentList = () => {
    render(this.#eventsListComponent, this.#eventContainer);
  };

  #renderNoEvents = () => {
    render(this.#listEmptyComponent, this.#eventContainer);
  };

  #renderEvent = (item) => {
    const eventPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(item);
    this.#eventPresenter.set(item.id, eventPresenter);
  };

  #renderEvents = () => {
    if (!this.#eventsList.length) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderComponentList();

    this.#eventsList.forEach(this.#renderEvent);
  };
}
