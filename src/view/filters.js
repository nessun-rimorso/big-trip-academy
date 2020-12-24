import {FILTERS} from "../helpers/constants";
import {createElement} from "../helpers/utils";

const getTemplateFilters = (filters) => {
  let result = ``;
  let isChecked = false;

  filters.forEach((filter) => {
    result += `
      <div class="trip-filters__filter">
        <input id="filter-${filter}"
               class="trip-filters__filter-input  visually-hidden"
               type="radio"
               name="trip-filter"
               value="${filter}"
               ${isChecked ? `` : `checked`}
        >
        <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
      </div>
    `;
    isChecked = true;
  });

  return result;
};

const createFiltersTemplate = () => {
  return `<div>
            <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
              ${getTemplateFilters(FILTERS)}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
          </div>`;
};

export default class Filters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate();
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
