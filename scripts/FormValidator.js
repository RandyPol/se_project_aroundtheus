class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector
    this._submitButtonSelector = settings.submitButtonSelector
    this._inactiveButtonClass = settings.inactiveButtonClass
    this._inputErrorClass = settings.inputErrorClass
    this._errorClass = settings.errorClass
    this._formElement = formElement
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`
    )
    inputElement.classList.remove(this._inputErrorClass)
    this._errorElement.classList.remove(this._errorClass)
    this._errorElement.textContent = ''
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`
    )
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((input) => {
      return !input.validity.valid
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this.inputList)) {
      this.buttonElement.classList.add(this._inactiveButtonClass)
      this.buttonElement.disabled = true
    } else {
      this.buttonElement.classList.remove(this._inactiveButtonClass)
      this.buttonElement.disabled = false
    }
  }

  _setEventListeners() {
    this.inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ]

    this.buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    )

    this._toggleButtonState()

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  resetValidation() {
    this._toggleButtonState()
    this._formElement.reset()
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  enableValidation() {
    this._setEventListeners()
  }
}

export default FormValidator
