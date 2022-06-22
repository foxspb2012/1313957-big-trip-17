import AbstractView from '../framework/view/abstract-view.js';
import {formatDate, getDuration} from '../utils/event.js';

const createEventPointTemplate = (eventPoint, allOffers) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type,
  } = eventPoint;

  const startTime = formatDate(dateFrom, 'YYYY-MM-DDTHH:mm');
  const endTime = formatDate(dateTo, 'YYYY-MM-DDTHH:mm');
  const duration = getDuration(startTime, endTime);

  const getEventOffers = (pointType) => allOffers.find((offer) => offer.type === pointType);
  const offersByType = getEventOffers(type).offers;

  const createOffersTemplate = () => (
    `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${offersByType.filter((item) => offers.includes(item.id)).map((elem) =>
      `<li class="event__offer">
            <span class="event__offer-title">${elem.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${elem.price}</span>
        </li>`).join('')}
        </ul>`
  );

  const favoriteClassName = isFavorite ? 'event__favorite-btn  event__favorite-btn--active' : 'event__favorite-btn';

  const offersTemplate = offers.length > 0 ? createOffersTemplate() : '';

  return(
    `<li class="trip-events__item">
    <div class="event">
     <time class="event__date datetime="${formatDate(dateFrom, 'YYYY-MM-DD')}">${formatDate(dateFrom, 'DD MMM')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
         <time class="event__start-time" datetime="${startTime}">${formatDate(dateFrom, 'HH:mm')}</time>
          &mdash;
         <time class="event__end-time" datetime="${endTime}">${formatDate(dateTo, 'HH:mm')}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      ${offersTemplate}
     <button class="${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
     </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class EventPointView extends AbstractView {
  #newPoint = null;
  #offers = null;

  constructor(newPoint, offers) {
    super();
    this.#newPoint = newPoint;
    this.#offers = offers;
  }

  get template() {
    return createEventPointTemplate(this.#newPoint, this.#offers);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = () => {
    this._callback.editClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
