import {createElement} from '../render.js';
import {formatDate} from '../utils.js';
import {CITIES, OFFERS, OFFERS_BY_TYPE, Mode} from '../constants.js';

const createEventEditTemplate = (eventPoint, mode) => {
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

    return(
      offersByType.length > 0 ?
        `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${OFFERS.filter((item) => offersByType[0].offers.includes(item.id)).map((elem) =>
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${elem.title}-${id}" type="checkbox"
              name="event-offer-${elem.title}-${id}" ${elem.title.length % 2 ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${elem.title}-${id}">
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
      <button class="event__reset-btn" type="reset">Cancel</button>`
    );
  };

  const destinationPoints = createDestinationPoints();

  const offersTemplate = offers.length > 0 ? createOffersTemplate() : '';

  const destinationDescription = destination.description.length > 0 ? createDestinationDescription() : '';

  const buttons = getButtons(mode);

  return (
    ` <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" checked>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
            <datalist id="destination-list-1">
             ${destinationPoints}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom,'DD/MM/YY HH:mm' )}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo,'DD/MM/YY HH:mm' )}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
              ${basePrice}
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
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

export default class EventCreateEditView {
  #element = null;
  #newPoint = null;
  #mode = null;

  constructor(newPoint, mode) {
    this.#newPoint = newPoint;
    this.#mode = mode;
  }

  get template() {
    return createEventEditTemplate(this.#newPoint, this.#mode);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
