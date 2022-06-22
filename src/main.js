import InfoMainView from './view/info-main-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import FilterModel from './model/filter-model.js';
import EventsModel from './model/events-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsApiService from './api/events-api-service.js';
import {render, RenderPosition} from './framework/render.js';

const AUTHORIZATION = 'Basic B5aRebaBD955555';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const siteMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel(new EventsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const eventsPresenter = new EventsPresenter(tripEventsContainer, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, eventsModel);
const newEventButtonComponent = new NewEventButtonView();

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventsPresenter.createEvent(handleNewEventFormClose, eventsModel.destinations, eventsModel.offers);
  newEventButtonComponent.element.disabled = true;
};

render(new InfoMainView(), siteMainElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();
eventsPresenter.init();
eventsModel.init()
  .finally(() => {
    render(newEventButtonComponent, siteMainElement);
    newEventButtonComponent.setClickHandler(handleNewEventButtonClick);
  });
