import FormValidator from './FormValidator.js'
import Card from './Card.js'
import { closePopup, openPopup } from './utils.js'
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
export const profileName = document.querySelector('.profile__name')
export const profileRole = document.querySelector('.profile__role')

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
const allModalCloseButton = document.querySelectorAll('.modal__button-close')
allModalCloseButton.forEach((closeButton) =>
  closeButton.addEventListener('click', (event) => {
    closePopup(event.target.closest('.modal'))
  })
)

// Handling submit function for modal profile edit
export const handleProfileFormSubmit = (event) => {
  event.preventDefault()

  profileName.textContent = event.target.name.value
  profileRole.textContent = event.target.aboutMe.value

  closePopup(modalEdit)
}

// Handling submit function for modal card add
export const handleCardFormSubmit = (event) => {
  event.preventDefault()

  const name = event.target.title
  const link = event.target.imageLink
  addCardElement(createCard({ name: name.value, link: link.value }, '#card'))
  closePopup(modalAdd)
}

// Add event listener to edit submit form
modalEditForm.addEventListener('submit', handleProfileFormSubmit)
// Add event listener to add card form
modalAddForm.addEventListener('submit', handleCardFormSubmit)

// Create a createCard method
export function createCard(data, cardTemplate, handleImage = handleImageClick) {
  const card = new Card(data, cardTemplate, handleImage)
  return card.generateCard()
}

// Prepare create card into the cards containers
function addCardElement(createdCard) {
  cardsContainer.prepend(createdCard)
}

initialCards.forEach((cardData) => {
  addCardElement(createCard(cardData, cardTemplate, handleImageClick))
})
