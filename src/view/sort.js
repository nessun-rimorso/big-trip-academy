import {SORTS} from "../helpers/constants";
import {createElement} from "../helpers/utils";

const getTemplateSorts = (sorts) => {
  let result = ``;
  let isChecked = false;

  sorts.forEach((sort) => {
    result += `
        <div class="trip-sort__item  trip-sort__item--${sort}">
          <input id="sort-${sort}"
                 class="trip-sort__input  visually-hidden"
                 type="radio" name="trip-sort"
                 value="sort-${sort}"
                 ${isChecked ? `` : `checked`}
          >
          <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
        </div>
    `;
    isChecked = true;
  });

  return result;
};

const createSortTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${getTemplateSorts(SORTS)}
          </form>`;
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
