import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import EventsListView from '../view/events-list-view.js';
import EventPointView from '../view/event-point-view.js';
import EventCreateEditView from '../view/event-create-edit-view.js';
import {render} from '../render.js';

const tripMainElement = document.querySelector('.trip-main');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');

export default class EventsPresenter {

  #eventsListComponent = new EventsListView();
  #eventContainer = null;
  #eventModel = null;
  #modeEdit = null;
  #eventsList = [];

  init = (eventContainer, eventModel) => {
    this.#modeEdit = 'edit';
    this.#eventContainer = eventContainer;
    this.#eventModel = eventModel;
    this.#eventsList = [...this.#eventModel.events];

    render(new SortView(), this.#eventContainer);
    render(new FilterView(), tripFilterElement);

    for (let i=0; i<this.#eventsList.length; i++) {
      this.#renderPoint(this.#eventsList[i]);
    }

    render(this.#eventsListComponent, this.#eventContainer);
  };

  #renderPoint = (eventPoint) => {
    const eventPointComponent = new EventPointView(eventPoint);
    const eventEditComponent = new EventCreateEditView(eventPoint, this.#modeEdit);

    const replacePointToForm = () => {
      this.#eventsListComponent.element.replaceChild(eventEditComponent.element, eventPointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#eventsListComponent.element.replaceChild(eventPointComponent.element, eventEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventPointComponent, this.#eventsListComponent.element);
  };
}
