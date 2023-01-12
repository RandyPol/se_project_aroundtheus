import Popup from './Popup'

export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._form = this._popupElement.querySelector('.form')
  }

  _getInputValues() {
    // Get all field elements
    this._inputList = this._form.querySelectorAll('.form__input')

    // Create an empty object
    this._formValues = {}

    // Add the values of the fields to this object
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })

    // Return the values object
    return this._formValues
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
