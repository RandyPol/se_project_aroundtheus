import FormValidator from './FormValidator.js'
import Card from './Card.js'
import {
  closePopup,
  openPopup,
  handleProfileFormSubmit,
  handleCardFormSubmit,
} from './utils.js'
import { initialCards, validationSettings, cardTemplate } from './constants.js'

// The profile edit modal | Button
const modalEdit = document.querySelector('#modalEdit')
const modalEditForm = modalEdit.querySelector('.form')
const profileOpenButton = document.querySelector('.profile__name-edit')

// The card add modal | Button
const modalAdd = document.querySelector('#modalAdd')
const modalAddForm = modalAdd.querySelector('.form')
const modalAddOpenButton = document.querySelector('.profile__add-button')

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

// Image modal function to pass to the card class as an argument
function handleImageClick() {
  // code for handling image click event
  // Insert background image
  modalImage.src = this.src
  modalImage.alt = this.alt
  // Modal paragraph text
  modalParagraph.textContent = this.alt
  // Modal open
  openPopup(pictureModal)
}

// Cards container
export const cardsContainer = document.querySelector('.cards')

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

const handleEditProfileModal = () => {
  editFormValidator.resetValidation()
  fillProfileForm()
  openPopup(modalEdit)
}

// The profile edit modal | Button listener
profileOpenButton.addEventListener('click', handleEditProfileModal)
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

// Add event listener to edit submit form
modalEditForm.addEventListener('submit', handleProfileFormSubmit)
// Add event listener to add card form
modalAddForm.addEventListener('submit', handleCardFormSubmit)

// Prepare create card into the cards containers
function addCardElement(cardCreate) {
  cardsContainer.prepend(cardCreate)
}

initialCards.forEach((cardData) => {
  const cardCreated = new Card(cardData, cardTemplate, handleImageClick)
  addCardElement(cardCreated.generateCard())
})
