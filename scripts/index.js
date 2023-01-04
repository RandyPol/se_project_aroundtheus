import FormValidator from './FormValidator.js'
import Card from './Card.js'

const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg',
  },
  {
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg',
  },
]

// Overlay close feature/function
function closeModalOnRemoteClick(evt) {
  // target is the element on which the event happened
  // currentTarget is the popup
  // if they are the same then we should close the popup
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

// Overlay close by pressing ESC
function closeModalEscapeKeydown(event) {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened')
    closePopup(openedModal)
  }
}

// The profile edit modal | Button
const modalEdit = document.querySelector('#modalEdit')
const modalEditForm = modalEdit.querySelector('.form')
const profileOpenButton = document.querySelector('.profile__name-edit')

// The card add modal | Button
const modalAdd = document.querySelector('#modalAdd')
const modalAddForm = modalAdd.querySelector('.form')
const modalAddOpenButton = document.querySelector('.profile__add-button')

//
// Using Clasess for validation
//
const validationSettings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

const editFormValidator = new FormValidator(validationSettings, modalEditForm)
editFormValidator.enableValidation()
const addFormValidator = new FormValidator(validationSettings, modalAddForm)
addFormValidator.enableValidation()
//
// //
//

// Picture expanded modal | Modal Card Image | Paragraph text
export const pictureModal = document.querySelector('#modalPicture')
export const modalImage = document.querySelector('.modal__picture-full')
export const modalParagraph = document.querySelector('.modal__piture-paragraph')

// Cards container
export const cardsContainer = document.querySelector('.cards')
// Card Template Selector
const cardTemplate = '#card'

// find the form inout_fields in the DOM
const nameInput = document.querySelector('#name')
const roleInput = document.querySelector('#aboutMe')
const profileName = document.querySelector('.profile__name')
const profileRole = document.querySelector('.profile__role')

// Function to prefill the frm data
const fillProfileForm = () => {
  nameInput.value = profileName.textContent
  roleInput.value = profileRole.textContent
}

// General Open Modal Function
export function openPopup(blockModal) {
  // Add Escape keydown
  document.addEventListener('keydown', closeModalEscapeKeydown)
  // add the mousedown listener to the modal when opening it
  blockModal.addEventListener('mousedown', closeModalOnRemoteClick)
  blockModal.classList.add('modal_opened')
}
// General Close Modal Function
function closePopup(blockModal) {
  // Add Escape keydown
  document.removeEventListener('keydown', closeModalEscapeKeydown)
  // remove the mousedown listener from the modal when closing it
  blockModal.removeEventListener('mousedown', closeModalOnRemoteClick)
  blockModal.classList.remove('modal_opened')
}

// The profile edit modal | Button listener
profileOpenButton.addEventListener('click', () => {
  editFormValidator.resetValidation()
  fillProfileForm()
  openPopup(modalEdit)
})
// The card add modal | Button listerner
modalAddOpenButton.addEventListener('click', () => {
  addFormValidator.resetValidation()
  openPopup(modalAdd)
})

// Add click event listner for all close button
const closeAllModal = document.querySelectorAll('.modal__button-close')
closeAllModal.forEach((closeButton) =>
  closeButton.addEventListener('click', (event) => {
    closePopup(event.target.closest('.modal'))
  })
)

// Handling submit function for modal profile edit
const handleProfileFormSubmit = (event) => {
  event.preventDefault()

  profileName.textContent = event.target.name.value
  profileRole.textContent = event.target.aboutMe.value

  closePopup(modalEdit)
}

// Handling submit function for modal card add
const handleCardFormSubmit = (event) => {
  event.preventDefault()

  const name = event.target.title
  const link = event.target.imageLink
  const cardCreated = new Card({ name: name.value, link: link.value }, '#card')
  addCardElement(cardCreated.generateCard())
  addFormValidator.resetValidation()
  closePopup(modalAdd)
}

// Add event listener to edit submit form
modalEditForm.addEventListener('submit', handleProfileFormSubmit)
// Add event listener to add card form
modalAddForm.addEventListener('submit', handleCardFormSubmit)

// Prepare create card into the cards containers
function addCardElement(cardCreate) {
  cardsContainer.prepend(cardCreate)
}

initialCards.forEach((cardData) => {
  const cardCreated = new Card(cardData, '#card')
  addCardElement(cardCreated.generateCard())
})
