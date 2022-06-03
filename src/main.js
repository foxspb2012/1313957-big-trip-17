import EventsPresenter from './presenter/events-presenter.js';
import EventModel from './model/event-model.js';

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const eventModel = new EventModel();
const eventPresenter = new EventsPresenter(tripEventsElement, eventModel);

eventPresenter.init();
