export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  addItem(item) {
    const card = this._renderer(item)
    this._container.prepend(card)
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this.addItem(item)
    })
  }

  renderInitialCards(cards) {
    cards.forEach((card) => {
      this.addItem(card)
    })
  }
}
