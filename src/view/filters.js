import Abstract from "./abstract";

const getTemplateItem = (filter, currentFilterType) => {
  const {type} = filter;

  return (
    `<div class="trip-filters__filter">
        <input id="filter-${type}"
               class="trip-filters__filter-input  visually-hidden"
               type="radio"
               name="trip-filter"
               value="${type}"
               ${currentFilterType === type ? `checked` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
     </div>`
  );
};

const createFiltersTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters
    .map((filter) => getTemplateItem(filter, currentFilterType))
    .join(``);

  return `<div>
            <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
              ${filterItemsTemplate}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
          </div>`;
};

export default class Filters extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
