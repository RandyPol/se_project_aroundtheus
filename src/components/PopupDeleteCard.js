import Popup from './Popup.js'

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, handleCardDelete) {
    super(popupSelector)
    this._handleCardDelete = handleCardDelete
  }

  open(cardId) {
    super.open()
    this._popupElement
      .querySelector('.modal__button-yes')
      .addEventListener('click', () => {
        this._handleCardDelete(cardId)
      })
  }
}
