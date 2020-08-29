export const createTripDay = (it, index) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index + 1}</span>
        <time class="day__date" datetime="${it}">${it}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};
