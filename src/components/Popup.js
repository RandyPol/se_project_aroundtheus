class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector)
  }

  open() {
    this._popupElement.classList.add('modal_opened')
    document.addEventListener('keydown', this._handleEscClose.bind(this))
  }

  close() {
    this._popupElement.classList.remove('modal_opened')
    document.removeEventListener('keydown', this._handleEscClose.bind(this))
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector('.modal__button-close')
      .addEventListener('click', this.close.bind(this))

    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close()
      }
    })
  }
}

export default Popup
