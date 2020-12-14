import {SORTS} from "../utils/constants";

const getTemplateSorts = (sorts) => {
  let result = ``;
  let isChecked = false;

  sorts.forEach(sort => {
    result += `
        <div class="trip-sort__item  trip-sort__item--${sort}">
          <input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" checked>
          <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
        </div>
    `;
    isChecked = true;
  });
  console.log(result)
  return result;
}

export const createSortTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${getTemplateSorts(SORTS)}
          </form>`;
};
