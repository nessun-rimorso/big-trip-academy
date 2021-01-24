import {SORTS} from "../helpers/constants";
import Abstract from "./abstract";

const getTemplateSorts = (sorts) => {
  let result = ``;
  let isChecked = false;

  sorts.forEach((sort) => {
    result += `
        <div class="trip-sort__item  trip-sort__item--${sort}">
          <input id="sort-${sort}"
                 class="trip-sort__input  visually-hidden"
                 type="radio" name="trip-sort"
                 value="${sort}"
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

export default class Sort extends Abstract {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    if (evt.target.value === 'day' || evt.target.value === 'price') {
      this._callback.sortTypeChange(evt.target.value);
    }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
