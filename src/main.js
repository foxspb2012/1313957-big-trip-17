import {render} from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view.js';
import InfoMainView from './view/info-main-view.js';
import InfoCostView from './view/info-cost-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';

const siteMainElement = document.querySelector('.trip-main');
const siteInfoElement = siteMainElement.querySelector('.trip-main__trip-info');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

const sitePageMainElement = document.querySelector('.page-body__page-main');
const sitePageBodyElement = sitePageMainElement.querySelector('.page-body__container');

const eventsModel = new EventModel();
const filterModel = new FilterModel();
const eventPresenter = new EventsPresenter(sitePageBodyElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, eventsModel);
const newEventButtonComponent = new NewEventButtonView();

const handleNewEventFormClose = () => {
  newEventButtonComponent.element.disabled = false;
};

const handleNewEventButtonClick = () => {
  eventPresenter.createEvent(handleNewEventFormClose);
  newEventButtonComponent.element.disabled = true;
};

render(newEventButtonComponent, siteMainElement);
newEventButtonComponent.setClickHandler(handleNewEventButtonClick);

render(new InfoMainView(), siteInfoElement);
render(new InfoCostView(), siteInfoElement);

filterPresenter.init();
eventPresenter.init();
