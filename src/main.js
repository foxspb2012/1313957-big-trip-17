import EventModel from './model/event-model.js';
import EventsPresenter from './presenter/events-presenter.js';

const tripEventsContainer = document.querySelector('.trip-events');
const eventModel = new EventModel();
const eventPresenter = new EventsPresenter(tripEventsContainer, eventModel);

eventPresenter.init();
