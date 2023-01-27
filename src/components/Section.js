export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  addItem(item, currentUserId) {
    const card = this._renderer(item, currentUserId)
    this._container.prepend(card)
  }

  renderInitialCards(cards, currentUserId) {
    cards.forEach((card) => {
      this.addItem(card, currentUserId)
    })
  }
}
