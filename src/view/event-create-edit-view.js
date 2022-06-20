import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatDate} from '../utils/event.js';
import {CITIES, OFFERS, OFFERS_BY_TYPE, Mode, EVENT_TYPES} from '../constants.js';
import {DESTINATIONS} from '../mock/destinations.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const EVENT_CREATE = {
  'base_price': '',
  'date_from': formatDate(new Date(), 'YYYY-MM-DD HH:mm'),
  'date_to': formatDate(new Date(), 'YYYY-MM-DD HH:mm'),
  destination: {
    description: '',
    name: '',
    pictures: [],
  },
  id: null,
  offers: [],
  type: '',
};

const createEventEditTemplate = (eventPoint= EVENT_CREATE, mode = Mode.EDIT) => {
  const {
    base_price: basePrice,
    date_from: dateFrom,
    date_to: dateTo,
    destination,
    id,
    offers,
    type,
  } = eventPoint;

  const createDestinationPoints = () => (
    `${CITIES.map((elem) =>
      `<option value=${elem}></option>`).join('')}`
  );

  const createOffersTemplate = () => {
    const offersByType = OFFERS_BY_TYPE.filter((item) => item.type === type);

    return (
      offersByType.length > 0 ?
        `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
        ${OFFERS.filter((item) => offersByType[0].offers.includes(item.id)).map((elem) =>
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
  };

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
        `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`);
    }
    return (
      `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
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
              <img class="event__type-icon" width="42" height="42" src="${type !== '' ? `img/icons/${type}.png` : `img/icons/${EVENT_TYPES[0]}.png`}"
                alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

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
                list="destination-list-1" required value=${destination.name}>
            <datalist id="destination-list-1">
             ${destinationPoints}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom,'DD/MM/YYYY HH:mm' )}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo,'DD/MM/YYYY HH:mm' )}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" required>
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

  constructor(eventPoint = EVENT_CREATE, mode = Mode.EDIT) {
    super();
    this.#mode = mode;
    this._state = EventCreateEditView.convertEventToState(eventPoint, this.#mode);
    this.#setInnerHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#mode);
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

  #changeDestination = (destinationName) => {
    const destination = DESTINATIONS.filter((item) => item.name === destinationName);

    if (!destination.length) {
      return {
        description: '',
        name: destinationName,
        pictures: []
      };
    }

    return destination[0];
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

    if(!this.#changeDestination(evt.target.value)){
      evt.target.value = '';
      return;
    }

    this.updateElement({
      destination: this.#changeDestination(evt.target.value)
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      'base_price': Number(evt.target.value)
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
      'date_from': userDataFrom,
    });
  };

  #dateEndChangeHandler = ([userDateTo]) =>{
    this.updateElement({
      'date_to': userDateTo,
    });
  };

  #setStartDatepicker = () => {
    this.#dateStartDatepicker = flatpickr (
      this.element.querySelector('input[name="event-start-time"]'),
      {
        enableTime: true,
        'time_24hr': true,
        maxDate: this._state.date_to,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._state.date_from,
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
        minDate: this._state.date_from,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._state.date_to,
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

  static convertEventToState = (point) => ({...point});

  static convertStateToEvent = (state) => ({...state});
}
