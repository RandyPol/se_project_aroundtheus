const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  objSettings
) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.add(objSettings.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(objSettings.errorClass)
}

const hideInputError = (formElement, inputElement, objSettings) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.remove(objSettings.inputErrorClass)
  errorElement.classList.remove(objSettings.errorClass)
  errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement, objSettings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      objSettings
    )
  } else {
    hideInputError(formElement, inputElement, objSettings)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid
  })
}

export const toggleButtonState = (inputList, buttonElement, objSettings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objSettings.inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(objSettings.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

const setEventListeners = (formElement, objSettings) => {
  const inputList = [...formElement.querySelectorAll(objSettings.inputSelector)]

  const buttonElement = formElement.querySelector(
    objSettings.submitButtonSelector
  )
  toggleButtonState(inputList, buttonElement, objSettings)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, objSettings)
      toggleButtonState(inputList, buttonElement, objSettings)
    })
  })
}

const enableValidation = (objSettings) => {
  const formList = Array.from(
    document.querySelectorAll(objSettings.formSelector)
  )
  formList.forEach((formElement) => setEventListeners(formElement, objSettings))
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
