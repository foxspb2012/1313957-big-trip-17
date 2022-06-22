import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatDate} from '../utils/event.js';
import {Mode, EVENT_TYPES} from '../constants.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

import 'flatpickr/dist/flatpickr.min.css';

const EVENT_CREATE = {
  basePrice: '',
  dateFrom: `${dayjs()}`,
  dateTo: `${dayjs().add(7, 'd')}`,
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  id: null,
  offers: [],
  type: '',
};

const createEventEditTemplate = (eventPoint= EVENT_CREATE, destinations, allOffers, mode = Mode.EDIT) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    offers,
    type,
    isDisabled,
    isSaving,
    isDeleting,
  } = eventPoint;

  const cities = destinations.map((city) => city.name);
  const getEventOffers = (pointType) => allOffers.find((offer) => offer.type === pointType);
  const offersByType = type !== '' ? getEventOffers(type).offers : [];

  const createDestinationPoints = () => (
    `${cities.map((elem) =>
      `<option value=${elem}></option>`).join('')}`
  );

  const createOffersTemplate = () => (
    offersByType.length > 0 ?
      `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
        ${offersByType.map((elem) =>
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="${id}-${elem.id}" type="checkbox"
              name="event-offer-${elem.title}" ${offers.includes(elem.id) ? 'checked' : ''}>
          <label class="event__offer-label" for="${id}-${elem.id}">
            <span class="event__offer-title">${elem.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${elem.price}</span>
          </label>
        </div>`).join('')}
        </div>
        </section>` : '');

  const createDestinationDescription = () => (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${destination.pictures.length > 0 ?
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map((picture) => `<img class="event__photo" src=${picture.src} alt=${picture.alt}>`).join('')}
        </div>
      </div>`: ''}
    </section>`
  );

  const getButtons = () => {
    if (mode === Mode.EDIT) {
      return (
        `<button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>Save</button>
        <button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`);
    }
    return (
      `<button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn cancel" type="reset">Cancel</button>`
    );
  };

  const createEventTypes = () => (
    `${EVENT_TYPES.map((eventType) =>
      `<div class="event__type-item">
        <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio"
            name="event-type" value=${eventType.toLowerCase()} ${eventType.toLowerCase() === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
      </div>`).join('')}`
  );

  const destinationPoints = createDestinationPoints();

  const offersTemplate = createOffersTemplate();
  const getEventTypes = createEventTypes();

  const destinationDescription = destination.description.length > 0 ? createDestinationDescription() : '';

  const buttons = getButtons(mode);

  return (
    ` <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="42" height="42" src="${type !== '' ? `img/icons/${type.toLowerCase()}.png` : `img/icons/${EVENT_TYPES[0]}.png`}"
                alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                    ${getEventTypes}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                list="destination-list-1" required value=${destination.name} ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
             ${destinationPoints}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                value="${formatDate(dateFrom,'DD/MM/YYYY HH:mm' )}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                value="${formatDate(dateTo,'DD/MM/YYYY HH:mm' )}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number"
                name="event-price" value="${basePrice}" required ${isDisabled ? 'disabled' : ''}>
          </div>

          ${buttons}
        </header>
        <section class="event__details">
          ${offersTemplate}
          ${destinationDescription}
        </section>
      </form>
    </li>`
  );
};

export default class EventCreateEditView extends AbstractStatefulView {
  #mode = null;
  #dateStartDatepicker = null;
  #dateEndDatepicker = null;
  #destinations = null;
  #offers = null;

  constructor(eventPoint = EVENT_CREATE, destinations, offers, mode = Mode.EDIT) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#mode = mode;
    this._state = EventCreateEditView.convertEventToState(eventPoint, this.#mode);
    this.#setInnerHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#destinations, this.#offers, this.#mode);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#dateStartDatepicker) {
      this.#dateStartDatepicker.destroy();
      this.#dateStartDatepicker = null;
    }

    if (this.#dateEndDatepicker) {
      this.#dateEndDatepicker.destroy();
      this.#dateEndDatepicker = null;
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCancelClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setEditClickHandler(this._callback.editClick);
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  };

  reset = (point) => {
    this.updateElement(
      EventCreateEditView.convertEventToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EventCreateEditView.convertStateToEvent(this._state));
  };

  setDeleteClickHandler = (callback) => {
    if (this.element.querySelector('.event__reset-btn')) {
      this._callback.deleteClick = callback;
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    }
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EventCreateEditView.convertStateToEvent(this._state));
  };

  setEditClickHandler = (callback) => {
    if (this.element.querySelector('.event__rollup-btn')) {
      this._callback.editClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    }
  };

  setCancelClickHandler = (callback) => {
    if (this.element.querySelector('.event__reset-btn.cancel')) {
      this._callback.editClick = callback;
      this.element.querySelector('.event__reset-btn.cancel').addEventListener('click', this.#editClickHandler);
    }
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;

    if (value) {
      this.updateElement({
        type: value,
        offers: []
      });
    }
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const destination = this.#destinations.find((item) => item.name === evt.target.value);

    if (!destination){
      evt.target.value = '';
      return;
    }

    this.updateElement({
      destination,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value)
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const currentId = Number(evt.target.id.split('-')[1]);
    const stateOffers = this._state.offers;

    const updatedOffers = stateOffers.includes(currentId)
      ? stateOffers.filter((item) => item !== currentId)
      : stateOffers.concat(currentId);

    this.updateElement({
      offers: updatedOffers
    });
  };

  #dateStartChangeHandler = ([userDataFrom]) => {
    this.updateElement({
      dateFrom: userDataFrom,
    });
  };

  #dateEndChangeHandler = ([userDateTo]) =>{
    this.updateElement({
      dateTo: userDateTo,
    });
  };

  #setStartDatepicker = () => {
    this.#dateStartDatepicker = flatpickr (
      this.element.querySelector('input[name="event-start-time"]'),
      {
        enableTime: true,
        'time_24hr': true,
        maxDate: this._state.dateTo,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._state.dateFrom,
        onClose: this.#dateStartChangeHandler,
      }
    );
  };

  #setEndDatepicker = () => {
    this.#dateEndDatepicker = flatpickr (
      this.element.querySelector('input[name="event-end-time"]'),
      {
        enableTime: true,
        'time_24hr': true,
        minDate: this._state.dateFrom,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._state.dateTo,
        onClose: this.#dateEndChangeHandler,
      }
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    const availableOffers = this.element.querySelector('.event__available-offers');
    if (availableOffers) {
      availableOffers.addEventListener('change', this.#offersChangeHandler);
    }

    this.element.querySelector('input[name="event-start-time"]').addEventListener('focus', this.#setStartDatepicker);

    this.element.querySelector('input[name="event-end-time"]').addEventListener('focus', this.#setEndDatepicker);
  };

  static convertEventToState = (point) => ({
    ...point,

    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static convertStateToEvent = (state) => {
    const data = {...state};

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  };
}
