import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._form = this._popupElement.querySelector('.form')
  }

  _getInputValues() {
    // Get all field elements
    const inputList = this._form.querySelectorAll('.form__input')

    // Create an empty object
    const formValues = {}

    // Add the values of the fields to this object
    inputList.forEach((input) => {
      formValues[input.name] = input.value
    })

    // Return the values object
    return formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmit(this._getInputValues())
      this.close()
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}
