import Popup from './Popup.js'

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, handleCardDelete) {
    super(popupSelector)
    this._handleCardDelete = handleCardDelete
  }

  open(card) {
    super.open()
    this._confirmDelete = () => {
      this._handleCardDelete(card)
    }

    this._popupElement
      .querySelector('.modal__button-yes')
      .addEventListener('click', this._confirmDelete)
  }

  close() {
    super.close()
    this._popupElement
      .querySelector('.modal__button-yes')
      .removeEventListener('click', this._confirmDelete)
  }
}
