export default class ColumnChart {
  element = null;
  chartHeight = 50;

  #data = [];
  #label = "";
  #link = "";
  #value = 0;
  #formatHeading = (data) => data;

  constructor({
    data = [],
    label = "",
    link = "",
    value = 0,
    formatHeading = (data) => data,
  } = {}) {
    this.#data = data;
    this.#label = label;
    this.#link = link;
    this.#value = value;
    this.#formatHeading = formatHeading;

    this._render();
  }

  _template() {
    const isLoading = this.#data.length === 0 ? "column-chart_loading" : "";
    const header = this.#formatHeading(this.#value);
    const columns = this.#data.length > 0 ? this._renderColumns() : "";

    return `
      <div class="column-chart ${isLoading}" style="--chart-height: ${
      this.chartHeight
    }">
        <div class="column-chart__title">
          ${this.#label}
          ${
            this.#link
              ? `<a href="${
                  this.#link
                }" class="column-chart__link">View all</a>`
              : ""
          }
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${header}</div>
          <div data-element="body" class="column-chart__chart">
            ${columns}
          </div>
        </div>
      </div>
    `;
  }

  _renderColumns() {
    const maxValue = Math.max(...this.#data);
    const scale = this.chartHeight / maxValue;

    return this.#data
      .map((item) => {
        const percent = ((item / maxValue) * 100).toFixed(0) + "%";
        const value = String(Math.floor(item * scale));
        return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
      })
      .join("");
  }

  _render() {
    const tmp = document.createElement("div");
    tmp.innerHTML = this._template();
    this.element = tmp.firstElementChild;
  }

  update(data) {
    this.#data = data;

    // Удаляем класс загрузки, если он был
    this.element.classList.remove("column-chart_loading");

    // Обновляем только тело графика
    const body = this.element.querySelector('[data-element="body"]');
    if (body) {
      body.innerHTML = this._renderColumns();
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
