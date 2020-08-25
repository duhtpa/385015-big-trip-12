export const createEventTemplate = (eventData) => {
  const {pointType, city, date, offers, destination, pointTime} = eventData;

  const getOffersList = () => {
    let offersList = ``;

    offers.forEach((it) => {
      offersList +=
      `<li class="event__offer">
        <span class="event__offer-title">${it.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
      </li>`;
    });

    return offersList;
  };

  const offersMarkup = getOffersList();

  const getEventTime = (pointTime) => {
    const hours = Math.floor(pointTime / 60);
    const days = Math.floor(hours / 24);
    const minutes = pointTime - (hours * 60);

    const date = `${days > 0 ? `${days}D` : ``} ${hours > 0 ? `${hours}H` : ``} ${minutes}M`;

    return date;
  };

  const timeEvent = getEventTime(pointTime);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${pointType} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${date.begin}">${date.begin.toLocaleString(`en-GB`, {year: `2-digit`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`})}</time>
            &mdash;
            <time class="event__end-time" datetime="${date.end}">${date.end.toLocaleString(`en-GB`, {year: `2-digit`, month: `numeric`, day: `numeric`, hour: `numeric`, minute: `numeric`})}</time>
          </p>
          <p class="event__duration">${timeEvent}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">20</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
