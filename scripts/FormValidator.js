const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationSettings
) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.add(validationSettings.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(validationSettings.errorClass)
}

const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.remove(validationSettings.inputErrorClass)
  errorElement.classList.remove(validationSettings.errorClass)
  errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement, validationSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationSettings
    )
  } else {
    hideInputError(formElement, inputElement, validationSettings)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid
  })
}

export const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

const setEventListeners = (formElement, validationSettings) => {
  const inputList = [...formElement.querySelectorAll(validationSettings.inputSelector)]

  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  )
  toggleButtonState(inputList, buttonElement, validationSettings)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationSettings)
      toggleButtonState(inputList, buttonElement, validationSettings)
    })
  })
}

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  )
  formList.forEach((formElement) => setEventListeners(formElement, validationSettings))
}

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

enableValidation(validationSettings)

// Resetting Form Validation After Close
export const resetValidation = (formElement) => {
  formElement.reset()
  // Clear any error messages and styles
  const inputList = [
    ...formElement.querySelectorAll(validationSettings.inputSelector),
  ]
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings)
  })
}
