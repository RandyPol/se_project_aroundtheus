const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.add('form__input_type_error')
  errorElement.textContent = errorMessage
  errorElement.classList.add('form__input-error_active')
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  )
  inputElement.classList.remove('form__input_type_error')
  errorElement.classList.remove('form__input-error_active')
  errorElement.textContent = ''
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_inactive')
  } else {
    buttonElement.classList.remove('form__button_inactive')
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'))
  const buttonElement = formElement.querySelector('.form__submit')
  toggleButtonState(inputList, buttonElement)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'))
  formList.forEach((formElement) => setEventListeners(formElement))
}

enableValidation()
